<script setup lang="ts">
import StructureTree from '@/widgets/StructureTree.vue';
import Filter from '@/widgets/Filter.vue';

import { ref } from 'vue';
import type { FilterDataInterface } from '@/shared/types/interfaces';
import StructureTreeFeature from '@/features/structureTree/StructureTreeFeature.vue';


const filterValue = ref<FilterDataInterface>({
	buttonID: 3,
	value: ''
});

</script>

<template>
	<div class="structure-page__header">
		<span class="structure-page__header__text">
			Структура Студенческого совета
		</span>
		<Filter 
			class="structure-page__header__filter"
			v-model="filterValue"
		/>
	</div>
	<div class="structure-page__content">
		<StructureTreeFeature 
			:filter="filterValue"
		/>
	</div>
</template>

<style scoped lang="scss">
	.structure-page{
		&__header{
			width: 100%;
			height: fit-content;
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			gap: 10px;
			&__text{
				flex: 1 1 500px;
				font-family: var(--font-family-bold);
				font-size: 32px;
				color: var(--color-text-primary);
			}
			&__field{
				flex: 0 0 auto;
			}
		}
		&__content{
			min-width: 450px;
			width: 100%;
			height: fit-content;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 3px;
			flex-direction: column;
		}
	}
</style>
