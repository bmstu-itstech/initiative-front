<script setup lang="ts">
import SearchInput from '@/shared/ui/SearchInput.vue';
import FilterButton from '@/shared/ui/FilterButton.vue';

import { ref } from 'vue';
import { FILTER_CONFIG } from '@/shared/config/filter';

import type { FilterDataInterface } from '@/shared/types/interfaces';


const props = withDefaults(
	defineProps<{
		modelValue: FilterDataInterface
	}>(), {
		modelValue: ()=>({
			buttonID: -1,
			value: ''
		})
	}
);

const emit = defineEmits<{
	'update:modelValue': [FilterDataInterface]
}>();

function selectFilter(buttonID: number) {
	emit('update:modelValue', {
		...props.modelValue,
		buttonID,
	})
}

function updateSearch(value: string) {
	emit('update:modelValue', {
		...props.modelValue,
		value,
	})
}

</script>

<template>
	<div class="filter">
		<div class="filter__buttons">
			<FilterButton 
				v-for="value in FILTER_CONFIG"
				:key="value.id"
				:icon="value.icon"
				:text="value.text"
				:state="props.modelValue.buttonID==value.id ? 'active' : 'passive'"
				@clicked="selectFilter(value.id)"
			/>
		</div>
		<SearchInput 
			class="filter__input"
			:model-value="props.modelValue.value"
			state="default"
			@update:model-value="updateSearch"
		/>
	</div>
</template>

<style scoped lang="scss">
	.filter{
		width: fit-content;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 15px;

		&__buttons{
			width: 100%;
			height: fit-content;

			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
