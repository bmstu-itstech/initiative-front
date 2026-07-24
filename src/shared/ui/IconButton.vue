<script setup lang="ts">
import type { Component } from 'vue';
import type { ButtonType } from '../types/types';
import DefaultIcon from '@/shared/assets/icons/Map-plus.svg?component';

const props = withDefaults(
	defineProps<{
		state?: Extract<ButtonType, 'primary'|'disabled'>,
		icon?: Component
	}>(), {
		state: 'primary',
		icon: DefaultIcon
	}
);
const emit = defineEmits<{
	'clicked': []
}>();

</script>

<template>
	<div 
		:class="{'icon-button--disabled': props.state=='disabled'}"
		class="icon-button"
		@click="emit('clicked')"
	>
		<component 
			:is="props.icon"
			class="icon-button__icon"
		/>
	</div>
</template>

<style scoped lang="scss">
	@use '../../app/styles/palette.scss' as *;

	.icon-button{
		width: var(--icon-button-size, 36px);
		height: var(--icon-button-size, 36px);
		border-radius: calc(var(--icon-button-size, 36px)/2);

		background-color: $color-primary;

		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		transition:
			background-color 0.2s ease,
			box-shadow 0.2s ease;

		box-shadow: 0 6px 12px 0 rgba($color-primary, 0.26);

		&__icon{--icon-primary-color: white}

		&:hover{
			background-color: $blue-900;
			box-shadow: 0 6px 12px 0 rgba($blue-900, 0.26);
		}
		&:active{
			background-color: $blue-600;
			box-shadow: 0 6px 30px 0 $blue-600;
		}
		&--disabled{
			background-color: $color-label;
			box-shadow: none;
		}
	}
</style>
