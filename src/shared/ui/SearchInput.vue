<script setup lang="ts">
import type { InputType } from '../types/types';
import type { Component } from 'vue';

import IconSearch from '@/shared/assets/icons/input/Search.svg?component';

import { ref, computed } from 'vue';


const props = withDefaults(
	defineProps<{
		modelValue: string,
		placeholder?: string,
		state?: InputType,
		icon?: Component
	}>(), {
		state: 'default',
		placeholder: 'Поиск',
		icon: IconSearch
	}
);

const isDisabled = computed(()=>props.state=='disabled' || props.state=='loading');

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', target.value)
}

</script>

<template>
	<div class="search-input" :class="'search-input--' +  props.state">
		<div class="search-input__container">
			<component 
				:is="props.icon"
				class="search-input__container__icon"
			/>
			<input
				class="search-input__container__field"
				:value="props.modelValue"
				:placeholder="props.state != 'loading' ? props.placeholder : ''"
				type="text"
				:disabled="isDisabled"
				@input="handleInput"
			>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '../../app/styles/palette.scss' as *;

	.search-input{
		width: 100%;
		min-width: 320px;
		height: 32px;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		&__container{
			position: relative;
			width: 100%;
			height: fit-content;

			

			&__field{
				width: 100%;
				min-width: 300px;
				height: 32px;

				padding: 6px 12px;

				outline: none;
				appearance: none;

				padding: 0 46px;

				border: 1px solid transparent;
				border-color: var(--color-border);
				border-radius: 4px;

				color: $color-label;
				font-size: 16px;
				font-family: var(--font-family-main);
				background-color: var(--color-background);

				&:focus{
					color: var(--color-text-primary);
					border-color: var(--color-text-primary);

					&::placeholder{
						color: var(--color-text-primary);
					}
				}
			}

			&__icon{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 12px;

				width: 24px;
				height: 24px;

				background: transparent;
				color: $color-label;
			}

			&:focus-within{
				.search-input__container__icon{
					--icon-primary-color: var(--color-text-primary);
				}
			}
		}
	}

	.search-input--disabled{
		.search-input__container{
			&__field{
				background-color: var(--input-bgcolor-disabled, var(--color-background-secondary));
				color: var(--input-color-disabled, $color-label);
			}
		}
	}

	.search-input--loading{
		.search-input__container{
			&__field{
				background-color: var(--color-loading);
				border: none;
			}
			&__icon{
				opacity: 0;
			}
		}
	}

</style>
