import { ref } from "vue";
import { useUserEditorState } from "./useUserEditorState";
import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import { createUserAPI, getUserAPI, updateUserAPI } from "@/entities/User/api";
import { getLeadersAPI } from "@/entities/Leader/api";
import { getBriefStructureTreeAPI } from "@/entities/StructureTree/api";
import { userAPI2userProfile } from "@/entities/User/dto";
import { LeaderAPI2Membership } from "@/entities/Leader/dto";
import { draft2createUserRequest, draft2updateUserRequest, UserProfile2Draft } from "./mapper";
import { ERROR_ALERT, UNKNOWN_ERROR } from "@/features/alert/config";
import type { AlertOptions } from "@/features/alert/type";
import { getLeadershipChanges } from "./journal/leadershipDTO";
import { syncLeadership } from "./journal/leadershipAPI";

export function useUserEditor(){
	const state = useUserEditorState();
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions|null>(null);
	const hints = ref<StructureTreeNodeInterface[]>([]);

	async function load(userId:number): Promise<boolean> {
		if(isLoading.value)
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
				.filter((leader)=>leader.id === userId)
				.map(LeaderAPI2Membership);
			const loadedDraft = UserProfile2Draft(user, leaders);

			hints.value = hintsResponse;
			state.loadDraft(loadedDraft);
			
			return true;
		}catch(currentError){
			errorAlert.value = ERROR_ALERT.network ?? UNKNOWN_ERROR;
			return false;
		}finally{
			isLoading.value = false;
		}
	}

	async function save(): Promise<boolean> {
		if(isLoading.value || state.draft.value.userId==null || state.original.value==null)
			return false;

		isLoading.value = true;
		errorAlert.value = null;

		try{
			const userId = state.original.value.userId;
			if(userId == null)
				return false;
			const leadershipChanges = getLeadershipChanges(
				state.original.value.leaderships,
				state.draft.value.leaderships
			);
			const userRequest = draft2updateUserRequest(state.draft.value);

			await updateUserAPI(userId, userRequest);
			await syncLeadership(userId, leadershipChanges);

			return true;
		}catch(currentError){
			errorAlert.value = UNKNOWN_ERROR;
			return false;
		}finally{
			isLoading.value = false;
		}
	}

	async function create(): Promise<boolean> {
		if(isLoading.value || state.mode.value!='create')
			return false;
		isLoading.value = true;
		errorAlert.value = null;

		try{
			const userRequest = draft2createUserRequest(state.draft.value);

			const response = await createUserAPI(userRequest);
			if(response.id == null || response.id == undefined)
				throw new Error('Backend не вернул id пользователя');
			await syncLeadership(response.id, {
				create: state.draft.value.leaderships,
				update: [],
				delete: []
			});
			return true;
		}catch(currentError){
			errorAlert.value = UNKNOWN_ERROR;
			return false;
		}finally{
			isLoading.value=false;
		}
	}

	return {
		...state,
		
		isLoading,
		errorAlert,
		hints,

		load,
		save,
		create
	}
}
