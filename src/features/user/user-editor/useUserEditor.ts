import { ref } from "vue";
import { useUserEditorState } from "./useUserEditorState";
import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import { createUserAPI, deleteUserAPI, getUserAPI, updateUserAPI } from "@/entities/User/api";
import { getLeadersAPI } from "@/entities/Leader/api";
import { getBriefStructureTreeAPI } from "@/entities/StructureTree/api";
import { userAPI2userProfile } from "@/entities/User/dto";
import { LeaderAPI2Membership } from "@/entities/Leader/dto";
import { draft2createUserRequest, draft2updateUserRequest, UserProfile2Draft } from "./mapper";
import { ERROR_ALERT, UNKNOWN_ERROR } from "@/features/alert/config";
import type { AlertOptions } from "@/features/alert/type";
import { getLeadershipChanges } from "./journal/leadershipDTO";
import { syncLeadership } from "./journal/leadershipAPI";
import type { UserFieldErrorMapType, UserFieldErrorType } from "./validation/type";
import type { UserFieldType } from "./fields/config";
import { validateField, validateFields } from "./validation/validator";
import { validateMembership, validateMembershipList, type MembershipErrors } from "./validation/membership";
import type { LeadershipDraft, MembershipDraft } from "./type";
import { validateLeadership, validateLeadershipList, type LeadershipErrors } from "./validation/leadership";
import { ApiLeadershipError, DELETE_USER_ERROR_ALERT, POST_USER_ERROR_ALERT, PUT_USER_ERROR_ALERT } from "./alertsAPI";
import { ApiError } from "@/shared/api/type";
import { GET_USER_ALERT } from "../type";

export function useUserEditor() {
	const state = useUserEditorState();
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions | null>(null);
	const hints = ref<StructureTreeNodeInterface[]>([]);

	const fieldErrors = ref<UserFieldErrorMapType>({});
	const membershipErrors = ref<MembershipErrors>({});
	const leadershipErrors = ref<LeadershipErrors>({});

	function resetValidation(): void {
		fieldErrors.value = {};
		membershipErrors.value = {};
		leadershipErrors.value = {};
	}
	async function prepareCreate(): Promise<boolean> {
		if (isLoading.value)
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try {
			hints.value = await getBriefStructureTreeAPI();
			state.startCreatingDraft();
			resetValidation();

			return true;
		} catch (currentError) {
			errorAlert.value = ERROR_ALERT.network ?? UNKNOWN_ERROR;
			return false;
		} finally {
			isLoading.value = false;
		}
	}
	function validate(): boolean {
		const fieldsValid = validateUserFields();
		const membershipsValid = validateUserMemberships();
		const leadershipValid = validateUserLeaderships();
		if (!fieldsValid || !membershipsValid || !leadershipValid) {
			const field_error: AlertOptions | null = Object.entries(fieldErrors.value)[0]?.[1] ?? null;
			const membership_error: AlertOptions[] | null = Object.values(
				Object.entries(
					membershipErrors.value
				)[0]?.[1] ?? []
			)
			const leadership_error: AlertOptions[] | null = Object.values(
				Object.entries(
					leadershipErrors.value
				)[0]?.[1] ?? []
			)
			const error = field_error
				?? membership_error[0]
				?? membership_error[1]
				?? leadership_error[0]
				?? leadership_error[1];
			if (error)
				errorAlert.value = error;
			return false;
		}
		return true;
	}

	function updateField(
		field: UserFieldType,
		value: string
	): void {
		state.draft.value.fields[field] = value;

		if (!fieldErrors.value[field])
			return;
		const error = validateField(field, state.draft.value.fields);
		if (error)
			fieldErrors.value[field] = error;
		else
			delete fieldErrors.value[field];
	}
	function validateUserFields(): boolean {
		fieldErrors.value = validateFields(state.draft.value.fields);
		return Object.keys(fieldErrors.value).length === 0;
	}

	function updateMembership(value: MembershipDraft[]): void {
		state.draft.value.memberships = value;
		const errors: MembershipErrors = {};

		for (const item of value) {
			if (!membershipErrors.value[item.key])
				continue;
			const buffer = validateMembership(item);
			if (Object.keys(buffer).length > 0)
				errors[item.key] = buffer;
		}
		membershipErrors.value = errors;
	}
	function validateUserMemberships(): boolean {
		membershipErrors.value = validateMembershipList(state.draft.value.memberships);
		return Object.keys(membershipErrors.value).length === 0;
	}

	function updateLeadership(value: LeadershipDraft[]): void {
		state.draft.value.leaderships = value;
		const errors: LeadershipErrors = {};

		for (const item of value) {
			if (!leadershipErrors.value[item.key])
				continue;
			const buffer = validateLeadership(item);
			if (Object.keys(buffer).length > 0)
				errors[item.key] = buffer;
		}
		leadershipErrors.value = errors;
	}
	function validateUserLeaderships(): boolean {
		leadershipErrors.value = validateLeadershipList(state.draft.value.leaderships);
		return Object.keys(leadershipErrors.value).length === 0;
	}

	async function load(userId: number): Promise<boolean> {
		if (isLoading.value)
			return false;
		isLoading.value = true;
		errorAlert.value = null;

		try {
			const [
				userResponse,
				leadersResponse,
				hintsResponse
			] = await Promise.all([
				getUserAPI(userId),
				getLeadersAPI(),
				getBriefStructureTreeAPI()
			]);
			const user = userAPI2userProfile(userResponse);
			const leaders = leadersResponse
				.filter((leader) => leader.member.id === userId)
				.map(LeaderAPI2Membership);
			const loadedDraft = UserProfile2Draft(user, leaders);

			hints.value = hintsResponse;
			state.loadDraft(loadedDraft);
			resetValidation();

			return true;
		} catch (currentError) {
			errorAlert.value = ERROR_ALERT.network ?? UNKNOWN_ERROR;
			if (currentError instanceof ApiLeadershipError)
				errorAlert.value = currentError.alert;
			else if (currentError instanceof ApiError)
				errorAlert.value = GET_USER_ALERT[currentError.status] ?? UNKNOWN_ERROR;
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	async function save(): Promise<boolean> {
		if (isLoading.value || state.draft.value.userId == null || state.original.value == null)
			return false;

		if (!validate())
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try {
			const userId = state.original.value.userId;
			if (userId == null)
				return false;
			const leadershipChanges = getLeadershipChanges(
				state.original.value.leaderships,
				state.draft.value.leaderships
			);
			const userRequest = draft2updateUserRequest(state.draft.value);

			await updateUserAPI(userId, userRequest);
			await syncLeadership(userId, leadershipChanges);

			resetValidation();
			return true;
		} catch (currentError) {
			errorAlert.value = UNKNOWN_ERROR;
			if (currentError instanceof ApiLeadershipError)
				errorAlert.value = currentError.alert;
			else if (currentError instanceof ApiError)
				errorAlert.value = PUT_USER_ERROR_ALERT[currentError.status] ?? UNKNOWN_ERROR;
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	async function create(): Promise<boolean> {
		if (isLoading.value || state.mode.value != 'create')
			return false;

		if (!validate())
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try {
			const userRequest = draft2createUserRequest(state.draft.value);

			const response = await createUserAPI(userRequest);
			if (response.id == null || response.id == undefined)
				throw new Error('Backend не вернул id пользователя');
			await syncLeadership(response.id, {
				create: state.draft.value.leaderships,
				update: [],
				delete: []
			});

			resetValidation();
			return true;
		} catch (currentError) {
			errorAlert.value = UNKNOWN_ERROR;
			if (currentError instanceof ApiLeadershipError)
				errorAlert.value = currentError.alert;
			else if (currentError instanceof ApiError)
				errorAlert.value = POST_USER_ERROR_ALERT[currentError.status] ?? UNKNOWN_ERROR;
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	async function remove(): Promise<boolean> {
		if (isLoading.value)
			return false;

		const userId = state.draft.value.userId;
		if (userId === null)
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try {
			if (state.original.value == null)
				return false;
			const ids: number[] = state.original.value.leaderships
				.map((leader) => leader.appointmentId)
				.filter((id) => id != null);
			await syncLeadership(userId, {
				create: [],
				update: [],
				delete: ids
			});

			await deleteUserAPI(userId);
			resetValidation();
			return true;
		} catch (currentError) {
			errorAlert.value = UNKNOWN_ERROR;
			if (currentError instanceof ApiLeadershipError)
				errorAlert.value = currentError.alert;
			else if (currentError instanceof ApiError)
				errorAlert.value = DELETE_USER_ERROR_ALERT[currentError.status] ?? UNKNOWN_ERROR;
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	return {
		...state,

		isLoading,
		errorAlert,
		hints,

		fieldErrors,
		updateField,

		membershipErrors,
		updateMembership,

		leadershipErrors,
		updateLeadership,

		resetValidation,
		prepareCreate,

		load,
		save,
		create,
		remove
	}
}
