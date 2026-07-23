<script setup lang="ts">
import type { Component } from 'vue';
import { computed, ref, watch } from 'vue';

import IconPeople from '@/shared/assets/icons/filter/Groups.svg?component'

import type { FilterButtonType } from '../types/types';


const props = withDefaults(
	defineProps<{
		icon?: Component,
		text?: string,
		state?: FilterButtonType
	}>(),
	{
		icon: IconPeople,
		text: "Отдел",
		state: "passive"
	}
);

const emit = defineEmits({
	clicked: []
});

const flag = computed(()=>props.state == 'active');

function handler():void{
	emit('clicked');
}

</script>

<template>
	<div class="filter-button" :class="{
		'filter-button--active': flag 
	}">
		<div class="filter-button__content" @click="handler">
			<component 
				:is="props.icon"
				v-if="props.icon"
				class="filter-button__content__icon"
			/>
			<span class="filter-button__content__text">
				{{ props.text }}
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.filter-button{
		width: fit-content;
		height: fit-content;

		display: flex;
		justify-content: center;
		align-items: center;

		border-bottom: 2px solid transparent;
		border-color: var(--color-border-secondary);

		cursor: pointer;

		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		&__content{
			width: fit-content;
			height: fit-content;

			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 8px;

			padding: clamp(0px, 1vw, 8px) clamp(0px, 1vw, 12px);

			&__text{
				color: var(--color-text-primary);
				font-size: 14px;
				text-wrap: nowrap;

				transition: color 0.2s ease;
			}

			&__icon{
				width: 24px;
				height: 24px;
				--icon-primary-color: var(--color-text-primary);

				:deep(path){
					transition: stroke 0.1s ease;
				}
			}

			&:hover{
				.filter-button__content__text{
					color: var(--color-primary);
				}
				.filter-button__content__icon{
					--icon-primary-color: var(--color-primary);
				}
			}
		}
	}
	.filter-button--active{

		border-color: var(--color-primary);

		.filter-button__content__text{
			color: var(--color-primary);
		}

		.filter-button__content__icon{
			--icon-primary-color: var(--color-primary);
		}
	}
</style>
