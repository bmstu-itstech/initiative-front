import type { PeopleTableData } from "@/entities/UsersTable/type";
import { ref } from 'vue';
import { ERROR_ALERT, UNKNOWN_ERROR } from "../alert/config";
import { getPeople } from "@/entities/UsersTable/api";
import { People2PeopleTable } from "@/entities/UsersTable/dto";
import type { AlertOptions } from "../alert/type";

export function usePeopleTable(){
	const isLoading = ref<boolean>(false);
	const data = ref<PeopleTableData>([]);
	const errorAlert = ref<AlertOptions|null>(null);

	async function loadPeopleTable(): Promise<void> {
		if(isLoading.value)
			return;

		isLoading.value = true;
		errorAlert.value = null;

		try{
			data.value = People2PeopleTable(await getPeople());
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['network'] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		data,
		errorAlert,
		loadPeopleTable
	}
}
