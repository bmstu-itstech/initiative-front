<script setup lang="ts">
import type { InputType } from '../types/types';

import { ref, computed } from 'vue';
import InputHint from './InputHint.vue';

import CrossIcon from '@/shared/assets/icons/Cross.svg?component';


const props = withDefaults(
	defineProps<{
		modelValue: string,
		header?: string,
		placeholder: string,
		state?: InputType,
		isPassword?: boolean,
		readonly?: boolean,

		variants?: string[][],
		hintHeader?: string[],
		hintPage?: number,
		hintGrid?: number[][],

		erased?: boolean
	}>(), {
		header: '',
		state: 'default',
		isPassword: false,
		variants: ()=>[],
		readonly: false,
		erased: false
	}
);

const isDisabled = computed(()=>props.state=='disabled' || props.state=='loading');

const emit = defineEmits<{
	'update:modelValue': [value: string],
	'clicked': [variant: string],
	'focused': [],
	'unfocused': [],
	'update:hintPage': [value: number]
}>()

const isPasswordVisible = ref(false)

const inputType = computed(() => {
	if (!props.isPassword) return 'text'
	return isPasswordVisible.value ? 'text' : 'password'
})

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', target.value)
}

function togglePasswordVisibility() {
	if (isDisabled.value) return
	isPasswordVisible.value = !isPasswordVisible.value
}

function eraseInput(){
	if (isDisabled.value) return;
	emit('update:modelValue', '')
}

</script>

<template>
	<div class="input" :class="'input--' +  props.state">
		<div v-if="props.header" class="input__header">
			<p> {{ props.header }} </p>
		</div>
		<div class="input__container">
			<input
				class="input__container__field"
				:value="props.modelValue"
				:placeholder="props.state=='loading' ? '' : props.placeholder"
				:type="inputType"
				:disabled="isDisabled"
				:readonly="props.readonly"
				@focusin="emit('focused')"
				@focusout="emit('unfocused')"
				@input="handleInput"
			>
			<button
				v-if="props.isPassword"
				class="input__container__button"
				type="button"
				:disabled="isDisabled"
				:aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
				@click="togglePasswordVisibility"
			>
				<svg
					class="input__container__icon"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
				<path
					d="M12.0181 3.35254C15.3979 3.35254 18.3568 4.98541 20.8726 7.66895C21.7368 8.59072 22.4876 9.57475 23.1236 10.5596C23.4224 11.0222 23.6485 11.4092 23.8004 11.6904L23.9127 11.9053C24.0534 12.1868 24.0534 12.5183 23.9127 12.7998C23.8033 13.0185 23.6191 13.3507 23.3619 13.7676L23.1236 14.1455C22.4876 15.1303 21.7368 16.1144 20.8726 17.0361C18.3568 19.7197 15.3979 21.3525 12.0181 21.3525C8.63839 21.3525 5.67948 19.7197 3.16366 17.0361C2.29952 16.1144 1.54874 15.1303 0.912681 14.1455C0.613867 13.6828 0.387751 13.2958 0.235923 13.0146L0.123618 12.7998C-0.0171176 12.5183 -0.0171176 12.1868 0.123618 11.9053C0.232945 11.6866 0.417235 11.3544 0.6744 10.9375L0.912681 10.5596C1.54874 9.57475 2.29952 8.59072 3.16366 7.66895C5.67948 4.9854 8.63839 3.35257 12.0181 3.35254ZM12.0181 5.35254C9.27306 5.35257 6.79423 6.71983 4.62264 9.03613C3.84637 9.86416 3.16713 10.7556 2.59237 11.6455C2.49221 11.8006 2.39923 11.9503 2.31307 12.0928L2.15877 12.3525L2.31307 12.6123L2.44784 12.832L2.59237 13.0596C3.16713 13.9495 3.84637 14.8409 4.62264 15.6689C6.79423 17.9852 9.27306 19.3525 12.0181 19.3525C14.7633 19.3525 17.2421 17.9852 19.4137 15.6689C20.1899 14.8409 20.8692 13.9495 21.4439 13.0596C21.5441 12.9045 21.6371 12.7548 21.7232 12.6123L21.8765 12.3525L21.7232 12.0928L21.5885 11.873L21.4439 11.6455C20.8692 10.7556 20.1899 9.86416 19.4137 9.03613C17.2421 6.71983 14.7633 5.35254 12.0181 5.35254ZM12.0181 8.35254C14.2273 8.35254 16.0182 10.1434 16.0182 12.3525C16.0182 14.5617 14.2273 16.3525 12.0181 16.3525C9.80901 16.3525 8.01815 14.5617 8.01815 12.3525C8.01815 10.1434 9.80901 8.35254 12.0181 8.35254ZM12.0181 10.3525C10.9136 10.3525 10.0181 11.248 10.0181 12.3525C10.0181 13.4571 10.9136 14.3525 12.0181 14.3525C13.1227 14.3525 14.0181 13.4571 14.0181 12.3525C14.0181 11.248 13.1227 10.3525 12.0181 10.3525Z"
					fill="currentColor"
				/>
				

				<line
					v-if="isPasswordVisible"
					x1="0.50895"
					y1="23.8434"
					x2="23.8435"
					y2="0.508899"
					stroke="currentColor"
					stroke-width="1.44"
				/>
				</svg>
			</button>
			<button
				v-if="props.erased && props.modelValue"
				class="input__container__button"
				type="button"
				:disabled="isDisabled"
				aria-label="Стереть"
				@click="eraseInput"
				@mousedown.prevent
			>
				<component 
					class="input__container__icon"
					:is="CrossIcon"
				/>
			</button>
			<InputHint 
				:data="props.variants"
				:header="props.hintHeader"
				:page="props.hintPage"
				:grid="hintGrid"
				@clicked="(variant)=>emit('clicked', variant)"
				@update:page="value => emit('update:hintPage', value)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '../../app/styles/palette.scss' as *;

	.input{
		width: var(--input-width, 400px);
		height: fit-content;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;

		&__header{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			gap: 10px;

			padding: 10px 10px;

			width: 100%;
			height: fit-content;

			p{
				font-family: var(--font-family-bold);
				font-size: 14px;
				color: $color-label;
			}
		}

		&__container{
			position: relative;
			width: 100%;
			height: fit-content;

			&__field{
				width: 100%;
				height: 50px;

				outline: none;
				appearance: none;

				padding: 0 18px;

				border: 1px solid transparent;
				border-color: var(--color-border);
				border-radius: var(--input-radius, 14px);

				color: $color-label;
				font-size: 14px;
				font-family: var(--font-family-main);
				background-color: var(--color-surface);

				&:focus{
					color: var(--color-text-primary);
					border-color: var(--color-text-primary);

					&::placeholder{
						color: var(--color-text-primary);
					}
				}
			}

			&__button{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 16px;

				width: 25px;
				height: 25px;

				background: transparent;
				color: $color-label;
				cursor: pointer;

				&__icon{--icon-primary-color: var(--color-text-secondary);}
			}

			&:focus-within{
				.input__container__button{
					color: var(--color-text-primary);

					&__icon{--icon-primary-color: var(--color-text-primary);}
				}
			}
		}
	}

	.input--disabled{
		.input__container{
			&__field{
				background-color: var(--input-bgcolor-disabled, var(--color-background-tertiary));
				color: var(--input-color-disabled, $color-label);
			}

			&__button{
				opacity: 0;
				cursor: default;
			}
		}
	}

	.input--loading{
		.input__container{
			&__field{
				background-color: var(--color-loading);
				border: none;
			}

			&__button{
				opacity: 0;
				cursor: default;
			}
		}
	}

	.input--error{
		.input__header{
			p{
				color: $red-500;
			}
		}

		.input__container{
			&__field{
				border-color: $red-500;
				color: $red-500;

				&:focus{
					color: $red-500;
					border-color: $red-500;
				}

				&::placeholder{
					color: $red-500;
				}
			}

			&__button{
				color: $red-500;
			}

			&:focus-within{
				.input__container__button{
					color: $red-500;
				}
			}
		}
	}

</style>
