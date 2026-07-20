<script setup lang="ts">
import Button from '@/shared/ui/Button.vue';
import SearchInput from '@/shared/ui/SearchInput.vue';

import { ref } from 'vue';

import type { InputType, SortDirectionType } from '@/shared/types/types';
import PeopleTableFeature from '@/features/peopleTable/PeopleTableFeature.vue';
import { useRouter } from 'vue-router';


const filterValue = ref<string>('');
const filterState = ref<InputType>('default');

const router = useRouter();

</script>

<template>
	<div class="people-page__header">
		<span class="people-page__header__text">
			Список активистов
		</span>
		<SearchInput 
			class="people-page__header__filter"
			v-model="filterValue"
			:state="filterState"
		/>
	</div>
	<div class="people-page__content">
		<div class="people-page__content__action">
			<Button 
				class="people-page__content__action__button"
				text="Скачать CSV"
				:icon="false"
				:state="'primary'"
			/>
			<Button 
				class="people-page__content__action__add-button"
				text="Добавить активиста"
				:icon="false"
				:state="'primary'"
				@clicked="()=>{
					router.push({
						name: 'user',
						params: { 
							id: 0,
						}, 
						query: {
							isEditing: 'true',
							from: 'people'
						}
					});
				}"
			/>
		</div>
		<PeopleTableFeature 
			:filter="filterValue"
		/>
	</div>
</template>

<style scoped lang="scss">
	.people-page{
		&__header{
			width: 100%;
			height: fit-content;
			display: grid;
			grid-template-columns: minmax(0, 1fr) max-content;
			gap: 10px;
			&__text{
				font-family: var(--font-family-bold);
				font-size: 32px;
				color: var(--color-text-primary);
			}
			&__filter{
				width: 400px;
			}
		}
		&__content{
			width: 100%;
			height: fit-content;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 15px;
			flex-direction: column;
			&__action{
				width: 100%;
				height: fit-content;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 10px;
			}
		}
	}
</style>
