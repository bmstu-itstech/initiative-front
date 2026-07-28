<script setup lang="ts">
import EventsTableFeature from '@/features/eventsTable/EventsTableFeature.vue';
import type { InputType } from '@/shared/types/types';
import Button from '@/shared/ui/Button.vue';
import SearchInput from '@/shared/ui/SearchInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const filterValue = ref<string>('');
const filterState = ref<InputType>('default');

const router = useRouter();

</script>

<template>
	<div class="events-page__header">
		<span class="events-page__header__text">
			Список мероприятий
		</span>
		<SearchInput 
			class="events-page__header__filter"
			v-model="filterValue"
			:state="filterState"
		/>
	</div>
	<div class="events-page__content">
		<div class="events-page__content__action">
			<Button 
				class="events-page__content__action__add-button"
				text="Добавить мероприятие"
				:icon="false"
				:state="'primary'"
				@clicked="()=>{
					// router.push({
					// 	name: 'user',
					// 	params: { 
					// 		id: 0,
					// 	}, 
					// 	query: {
					// 		isEditing: 'true',
					// 		from: 'people'
					// 	}
					// });
				}"
			/>
		</div>
		<EventsTableFeature 
			:filter="filterValue"
		/>
	</div>
</template>

<style scoped lang="scss">
	.events-page{
		&__header{
			width: 100%;
			height: fit-content;
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(320px, 400px);
			gap: 10px;
			&__text{
				font-family: var(--font-family-bold);
				font-size: 32px;
				color: var(--color-text-primary);
			}
			&__filter{
				width: 100%;
				min-width: 0;
			}
		}
		&__content{
			width: 100%;
			min-width: 700px;
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
	@media (max-width: 820px){
		.events-page__header{
			grid-template-columns: minmax(320px, 400px);
		}
	}
</style>
