<script setup lang="ts">
import { computed, type Component } from 'vue';
import type { BadgeType, InputType } from '../types/types';
import DefaultIcon from '@/shared/assets/icons/Map.svg?component';
import Input from './Input.vue';

const props = withDefaults(
	defineProps<{
		modelValue: string,
		role?: string,
		icon?: Component,
		type?: BadgeType,

		placeholder?: string,
		state?: InputType
	}>(), {
		type: 'passive',
		icon: DefaultIcon,

		state: 'default',
		placeholder: 'Введите адрес'
	}
);
const emit = defineEmits<{
	'update:modelValue': [value: string]
}>();

const inputState = computed<InputType>(()=>{
	if(props.type == 'loading')
		return 'loading';
	return props.state;
})

</script>

<template>
	<div 
		class="badge"
		:class="{'badge--loading': props.type=='loading'}"
	>
		<component
			:is="props.icon"
			class="badge__icon"
		/>
		<Input 
			v-if="props.type == 'active'"
			class="badge__input"
			:model-value="props.modelValue"
			@update:model-value="emit('update:modelValue', $event)"
			:placeholder="props.placeholder"
			:state="inputState"
			:erased=true
		/>
		<span
			v-else 
			v-show="props.type == 'passive'"
			class="badge__title"
		>
			{{ props.modelValue }} <span v-if="props.role">- {{ props.role }}</span>
		</span>
	</div>
</template>

<style scoped lang="scss">
	.badge{
		width: fit-content;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		gap: 5px;

		padding: 6px 10px;

		border: 1px solid transparent;
		border-color: var(--color-badge-border);
		border-radius: 6px;

		background-color: var(--color-surface);

		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		&__icon{--icon-primary-color: var(--color-text-primary);}
		&__title{
			font-family: var(--font-family);
			color: var(--color-text-primary);
			font-size: 16px;
			white-space: nowrap;
		}

		&__input{
			--input-min-width: 150px;
			--input-height: 24px;
			--input-width: fit-content;
			--input-padding: 5px;
			--input-radius: 6px;
		}

		&:hover{transform: scale(1.1);}
		&--loading{background-color: var(--color-loading);width: 200px;}
	}
</style>
