import { ref } from 'vue';
import type { AlertOptions } from '../alert/type';
import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';
import { getStructureTreeAPI } from '@/entities/StructureTree/api';
import { ERROR_ALERT, UNKNOWN_ERROR } from '../alert/config';

export function useStructureTree(){
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions|null>(null);
	const data = ref<StructureTreeNodeInterface[]>([]);

	async function loadStructureTree(): Promise<void> {
		if(isLoading.value)
			return;

		isLoading.value = true;
		errorAlert.value = null;

		try{
			data.value = await getStructureTreeAPI();
		}catch(currentError){
			errorAlert.value = ERROR_ALERT['network'] ?? UNKNOWN_ERROR;
		}finally{
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		errorAlert,
		data,
		loadStructureTree
	}
}
