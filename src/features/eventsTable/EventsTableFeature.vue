<script setup lang="ts">
import { EventTableMapper, type EventTableRowType, type EventTableType } from '@/entities/Event/type';
import type { SortDirectionType } from '@/shared/types/types';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsTable } from './useEventsTable';
import { showAlert } from '../alert/alert';
import Table from '@/widgets/Table.vue';
import { filterColumn, filterTable } from '../filterTable/filterTable';
import { EVENT_TABLE_BUTTONS, EVENT_TABLE_POSITIONS, EVENT_TABLE_PROPORTIONS } from './config';
import NotFound from '@/shared/ui/NotFound.vue';
import Skeleton from '@/shared/ui/Skeleton.vue';
import { parseDoubleDate } from '@/shared/lib/table';


const router = useRouter();

const props = defineProps<{
	filter: string
}>();

const {
	isLoading,
	errorAlert,
	data,
	load
} = useEventsTable();

const sortColumn = ref<keyof EventTableRowType | null>(null);
const direction = ref<SortDirectionType>('desc');

const filteredData = computed<EventTableType>(()=>{
	const buffer = filterTable(props.filter, data.value, EventTableMapper) as EventTableType;
	if(sortColumn.value == null)
		return buffer;
	return filterColumn(
		sortColumn.value, 
		buffer, 
		direction.value, 
		EventTableMapper,
		parseDoubleDate
	) as EventTableType; 
});

function handleSort(columnName: keyof EventTableRowType){
	if(columnName == sortColumn.value){
		direction.value = direction.value == 'asc' ? 'desc' : 'asc';
		return;
	}
	sortColumn.value = columnName;
	direction.value = 'asc';
}

onMounted(async ()=>{
	await load();
	if(errorAlert.value != null)
		showAlert(errorAlert.value, true);
});

function handleLink(id: number): void{
	// router.push({
	// 		name: 'user',
	// 		params: { 
	// 			id,
	// 		},
	// 		query: {
	// 			isEditing: "false",
	// 			from: 'people'
	// 		}
	// 	});
}

</script>
<template>
	<Skeleton 
		v-if="isLoading"
	/>
	<Table 
		v-else-if="filteredData.length != 0"
		:rawData="filteredData"

		:proporions="EVENT_TABLE_PROPORTIONS"
		:positions="EVENT_TABLE_POSITIONS"
		:isButtons="EVENT_TABLE_BUTTONS"

		@sort="(columnName)=>handleSort(columnName as keyof EventTableRowType)"
		@clicked="handleLink"
	/>
	<NotFound 
		v-else
		:flag="true"
	/>
</template>
