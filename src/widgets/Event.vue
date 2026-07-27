<script setup lang="ts">
import type { EventBlockType } from '@/entities/Event/type';

import PointIcon from '@/shared/assets/icons/Point.svg?component';
import MapIcon from '@/shared/assets/icons/Map.svg?component';
import UserIcon from '@/shared/assets/icons/filter/User.svg?component';
import HilineIcon from '@/shared/assets/icons/hline.svg?component';

import Badge from '@/shared/ui/Badge.vue';
import MessageBlock from '@/shared/ui/MessageBlock.vue';


const props = defineProps<{
	data: EventBlockType
}>();

</script>
<template>
	<div class="event">
		<div class="event__dates">
			<div class="event__dates__container">
				<span class="event__dates__container__up">{{ props.data.dataIn }}</span>
				<span 
					v-if="props.data.dataIn != props.data.dataOut"
					class="event__dates__container__down"
				>{{ props.data.dataOut }}</span>
			</div>
			<component 
				:is="PointIcon"
				class="event__dates__icon"
			/>
		</div>
		<div class="event__right">
			<component 
				:is="HilineIcon"
				class="event__right__hiline"
			/>
			<div class="event__right__content">
				<MessageBlock 
					:header="props.data.name"
					:message="props.data.description"
				/>
				<div class="event__right__content__badges">
					<div class="event__right__content__badges__places">
						<Badge 
							v-for="place in props.data.places"
							:modelValue="place"
							:icon="MapIcon"
							type="passive"
						/>
					</div>
					<div class="event__right__content__badges__roles">
						<Badge 
							v-for="role in props.data.roles"
							:modelValue="props.data.userName"
							:icon="UserIcon"
							:role="role"
							type="passive"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.event{
		width: 100%;
		height: fit-content;

		display: flex;
		flex-direction: row;

		&__dates{
			width: fit-content;
			height: fit-content;

			margin-top: 36px;

			display: flex;
			align-items: center;
			flex-direction: row;
			gap: 10px;

			&__container{
				width: fit-content;
				height: 42px;

				display: flex;
				flex-direction: column;
				justify-content: center;

				&__up, &__down{
					font-family: var(--font-family-bold);
					font-size: 20px;
				}
				&__up{ color: var(--color-primary); }
				&__down{ color: var(--color-label); }
			}
		}
		&__right{
			width: fit-content;
			height: fit-content;

			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 0;

			margin-left: -12px;

			border-left: 1px solid transparent;
			border-color: var(--color-primary);

			&__hiline{ 
				width: 50px; 
				flex-shrink: 0;
				margin-top: 55px; 
				margin-left: 20px; 
			}

			&__content{
				width: fit-content;
				height: fit-content;

				margin-top: 36px;
				margin-bottom: 48px;
				margin-left: -6px;
				z-index: -1;

				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				gap: 15px;

				&__badges{
					padding: 0 30px;
					display: flex;
					flex-direction: column;
					gap: 10px;
					justify-content: flex-start;
					align-items: flex-start;

					&__places, &__roles{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						flex-wrap: wrap;
					}
				}
			}
		}
	}
</style>
