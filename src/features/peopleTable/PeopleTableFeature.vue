<script setup lang="ts">
import Skeleton from '@/shared/ui/Skeleton.vue';
import Table from '@/widgets/Table.vue';
import { usePeopleTable } from './usePeopleTable';
import { ref, computed, onMounted } from 'vue';
import { filterColumn, filterTable } from '../filterTable/filterTable';
import { PeopleTableMapper, type PeopleTableData, type PeopleTableRow } from '@/entities/UsersTable/type';
import type { SortDirectionType } from '@/shared/types/types';
import { showAlert } from '../alert/alert';
import NotFound from '@/shared/ui/NotFound.vue';
import { useRouter } from 'vue-router';


const router =useRouter();

const props = defineProps<{
	filter: string
}>();

const {
	isLoading,
	errorAlert,
	data,
	loadPeopleTable

} = usePeopleTable();

const sortColumn = ref<keyof PeopleTableRow | null>(null);
const direction = ref<SortDirectionType>('desc');

const filteredData = computed<PeopleTableData>(()=>{
	const buffer = filterTable(props.filter, data.value, PeopleTableMapper) as PeopleTableData;
	if(sortColumn.value == null)
		return buffer;
	return filterColumn(sortColumn.value, buffer, direction.value, PeopleTableMapper) as PeopleTableData; 
});

function handleSort(columnName: keyof PeopleTableRow){
	if(columnName == sortColumn.value){
		direction.value = direction.value == 'asc' ? 'desc' : 'asc';
		return;
	}
	sortColumn.value = columnName;
	direction.value = 'asc';
}

onMounted(async ()=>{
	await loadPeopleTable();
	if(errorAlert.value != null)
		showAlert(errorAlert.value, true);
});

function handleLink(id: number): void{
	router.push({
			name: 'user',
			params: { 
				id,
			},
			query: {
				isEditing: "false",
				from: 'people'
			}
		});
}

</script>

<template>
	<Skeleton 
		v-if="isLoading"
	/>
	<Table 
		v-else-if="filteredData.length != 0"
		:rawData="filteredData"
		@sort="(columnName)=>handleSort(columnName as keyof PeopleTableRow)"
		@clicked="handleLink"
	/>
	<NotFound 
		v-else
		:flag="true"
	/>
</template>
