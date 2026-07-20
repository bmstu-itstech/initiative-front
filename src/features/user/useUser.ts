import { ref } from "vue";
import type { AlertOptions } from "../alert/type";
import type { UserProfileInterface } from "@/entities/UserProfile/type";
import { USER_PLACEHOLDERS } from "./config";
import { userAPI2userProfile, userProfile2createUserAPI, userProfile2updateUserAPI, userProfile2userAPI } from "@/entities/User/dto";
import { createUserAPI, deleteUserAPI, getUserAPI, updateUserAPI } from "@/entities/User/api";
import { ERROR_ALERT, UNKNOWN_ERROR } from "../alert/config";
import { ApiError } from "@/shared/api/type";
import { UPDATE_USER_ALERTS } from "@/entities/User/type";
import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import { getStructureTreeAPI } from "@/entities/StructureTree/api";

export function useUser(){
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions|null>(null);
	const data = ref<UserProfileInterface>(USER_PLACEHOLDERS);
	const tree = ref<StructureTreeNodeInterface[]>([]);

	async function loadUser(id: number) {
		isLoading.value = true;
		errorAlert.value = null;

		try{
			data.value = userAPI2userProfile(await getUserAPI(id));
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['404'] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	async function updateUser(form: UserProfileInterface) {
		isLoading.value = true;
		errorAlert.value = null;

		try{
			data.value = userAPI2userProfile(await updateUserAPI(form.id, userProfile2updateUserAPI(form)));
		}catch(currentError){
			if(currentError instanceof ApiError)
				errorAlert.value = UPDATE_USER_ALERTS[currentError.status] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	async function createUser(form: UserProfileInterface) {
		isLoading.value = true;
		errorAlert.value = null;

		try{
			data.value = userAPI2userProfile(await createUserAPI(userProfile2createUserAPI(form)));
		}catch(currentError){
			if(currentError instanceof ApiError)
				errorAlert.value = UPDATE_USER_ALERTS[currentError.status] ?? UNKNOWN_ERROR;
		}finally{
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

	return {
		isLoading,
		errorAlert,
		data,
		tree,
		loadUser,
		updateUser,
		deleteUser,
		createUser,
		loadStructureTree
	}
}
