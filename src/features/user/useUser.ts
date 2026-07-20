import { ref } from "vue";
import type { AlertOptions } from "../alert/type";
import type { MembershipType, UserProfileInterface } from "@/entities/UserProfile/type";
import { createLeaderJournal, LEADER_ACTIONS, USER_PLACEHOLDERS } from "./config";
import { userAPI2userProfile, userProfile2createUserAPI, userProfile2updateUserAPI } from "@/entities/User/dto";
import { createUserAPI, deleteUserAPI, getUserAPI, updateUserAPI } from "@/entities/User/api";
import { ERROR_ALERT, UNKNOWN_ERROR } from "../alert/config";
import { ApiError } from "@/shared/api/type";
import { UPDATE_USER_ALERTS } from "@/entities/User/type";
import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import { getStructureTreeAPI } from "@/entities/StructureTree/api";
import { LeaderAPI2Membership } from "@/entities/Leader/dto";
import { getLeadersAPI } from "@/entities/Leader/api";
import type { LeaderJournalType, MembershipStatusType } from "./type";
import { LEADER_API_MAPPER } from "./leaderActions";

export function useUser(){
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions|null>(null);
	const data = ref<UserProfileInterface>(structuredClone(USER_PLACEHOLDERS));
	const tree = ref<StructureTreeNodeInterface[]>([]);
	const LeaderJournal = ref<LeaderJournalType>(createLeaderJournal());

	async function loadUser(id: number) {
		isLoading.value = true;
		errorAlert.value = null;
		LeaderJournal.value = createLeaderJournal();

		try{
			data.value = userAPI2userProfile(await getUserAPI(id));
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['404'] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	async function updateUser(
		form: UserProfileInterface
	): Promise<void> {
		isLoading.value = true;
		errorAlert.value = null;

		try {
			const leadership = form.membership.filter(
				(member) => member.isHead
			);

			const userForm: UserProfileInterface = {
				...form,
				membership: form.membership.filter(
					(member) => !member.isHead
				)
			};

			await syncAppointments(
				leadership,
				form.id
			);

			data.value = userAPI2userProfile(
				await updateUserAPI(
					form.id,
					userProfile2updateUserAPI(userForm)
				)
			);

			LeaderJournal.value = createLeaderJournal();
		} catch (currentError) {
			if (currentError instanceof ApiError) {
				errorAlert.value =
					UPDATE_USER_ALERTS[currentError.status] ??
					UNKNOWN_ERROR;
			} else {
				errorAlert.value = UNKNOWN_ERROR;
			}
		} finally {
			isLoading.value = false;
		}
	}

	async function createUser(
		form: UserProfileInterface
	): Promise<void> {
		isLoading.value = true;
		errorAlert.value = null;

		try {
			const leadership = form.membership.filter(
				(member) => member.isHead
			);

			const userForm: UserProfileInterface = {
				...form,
				membership: form.membership.filter(
					(member) => !member.isHead
				)
			};

			const createdUserResponse = await createUserAPI(
				userProfile2createUserAPI(userForm)
			);

			const createdUser = userAPI2userProfile(
				createdUserResponse
			);

			if (createdUser.id <= 0) {
				throw new ApiError(
					`Сервер вернул некорректный ID пользователя: ${createdUser.id}`,
					500
				);
			}

			await syncAppointments(
				leadership,
				createdUser.id
			);

			data.value = createdUser;
			LeaderJournal.value = createLeaderJournal();
		} catch (currentError) {
			if (currentError instanceof ApiError) {
				errorAlert.value =
					UPDATE_USER_ALERTS[currentError.status] ??
					UNKNOWN_ERROR;
			} else {
				errorAlert.value = UNKNOWN_ERROR;
			}
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteUser(id: number) {
		isLoading.value = true;
		errorAlert.value = null;

		try{
			await deleteUserAPI(id);
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['404'] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	async function loadStructureTree(): Promise<boolean> {
		if(isLoading.value)
			return false;

		isLoading.value = true;
		errorAlert.value = null;
		tree.value = [];

		try{
			tree.value = await getStructureTreeAPI();
			return true;
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['network'] ?? UNKNOWN_ERROR;
			return false;
		}finally{
			isLoading.value = false;
		}
	}

	async function loadLeadership(): Promise<boolean> {
		if(isLoading.value)
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try{
			const leaders = await getLeadersAPI();
			const loadedAppointments: MembershipType[] = leaders
				.filter((leader)=>leader.member.id == data.value.id)
				.map((leader)=>LeaderAPI2Membership(leader));
			data.value.membership.push(...loadedAppointments);

			return true;
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['network'] ?? UNKNOWN_ERROR;
			return false;
		}finally{
			isLoading.value = false;
		}
	}

	async function syncAppointments(
		memberships: MembershipType[],
		userId: number
	): Promise<boolean> {
		const results = await Promise.all(
			LEADER_ACTIONS.flatMap((status) =>
				LeaderJournal.value[status].map((id) =>
					LEADER_API_MAPPER[status](id, memberships, userId)
				)
			)
		);

		return results.every((result) => result);
	}
	

	return {
		isLoading,
		errorAlert,
		data,
		tree,
		LeaderJournal,
		loadUser,
		updateUser,
		deleteUser,
		createUser,
		loadStructureTree,
		loadLeadership,
	}
}
