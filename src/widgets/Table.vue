<script setup lang="ts">
import { computed } from 'vue';

import { PEOPLE_TABLE_MOCK } from '@/entities/UsersTable/mock';

import { TABLE_BUTTONS_CONFIG, TABLE_POSITION_CONFIG, TABLE_PROPOPTIONS_CONFIG } from '@/shared/config/table';
import type { ObjectSizeResult } from '@/shared/lib/table';

import { getObjectSize } from '@/shared/lib/table';
import type { TableCellPositionType } from '@/shared/types/types';

import TableCell from '@/shared/ui/TableCell.vue';
import type { TableRowType, TableType } from '@/features/filterTable/type';


const props = withDefaults(
	defineProps<{
		rawData?: TableType,
		proporions?: string,
		positions?: TableCellPositionType[],
		isButtons?: boolean[]
	}>(), {
		rawData: ()=>PEOPLE_TABLE_MOCK,
		proporions: TABLE_PROPOPTIONS_CONFIG,
		positions: ()=>TABLE_POSITION_CONFIG,
		isButtons: ()=>TABLE_BUTTONS_CONFIG
	}
);

const emit = defineEmits<{
	'clicked': [id: number];
	'sort': [columnName: keyof TableRowType];
}>();

const data = computed<ObjectSizeResult>(()=>getObjectSize(props.rawData));
const style: string = "grid-template-columns: " + props.proporions + ";";

</script>

<template>
	<div class="table">
		<div class="table__header" :style="style">
			<TableCell 
				class="table__header__cell"
				v-for="cell in data.columnsName"
				:id="-1"
				:text="cell" 
				position="center"
				:isHeader="true"
				:isButton="true"
				@clicked="emit('sort', cell as keyof TableRowType)"
			/>
		</div>
		<div class="table__content">
			<div class="table__content__row" :style="style" v-for="[id, row] in Object.entries(data.normData)">
				<TableCell 
					v-for="i in Object.values(row).length"
					:id="Number(id)"
					:text="String(Object.values(row)[i-1])" 
					:position="positions[i-1]"
					:isHeader="false"
					:isButton="isButtons[i-1]"
					@clicked="emit('clicked', Number(Object.values(row)[0]))"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.table{
		border: 1px solid transparent;
		border-color: var(--color-border);
		border-radius: 6px;

		width: 100%;
		height: fit-content;

		&__header, &__content__row{
			display: grid;
		}

		&__header__cell{
			cursor: pointer;
		}
	}
</style>
