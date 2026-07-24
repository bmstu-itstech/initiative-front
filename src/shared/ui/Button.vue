<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonType } from '../types/types';
import ArrowIcon from '@/shared/assets/icons/Arrow.svg?component';

const props = withDefaults(
	defineProps<{
		text: string
		icon?: boolean
		state?: ButtonType
	}>(),
	{
		icon: false,
		state: 'primary',
	}
)

const emit = defineEmits<{
	clicked: []
}>();

const isDisabled = computed(() => props.state === 'disabled')

function handleClick() {
  if (isDisabled.value) return

  emit('clicked')
}

</script>

<template>
	<button
		type="button"
		class="button"
		:class="`button--${props.state}`"
		:disabled="isDisabled"
		@click="handleClick"
	>
    <span>{{ props.text }}</span>

	<component 
		v-if="props.icon"
		:is="ArrowIcon"
		class="button__icon"
	/>
  </button>
</template>

<style scoped lang="scss">
	@use '../../app/styles/palette.scss' as *;

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 5px;

		width: var(--button-width, fit-content);
		height: var(--button-height, fit-content);

		border: 0;
		border-radius: var(--button-radius, 14px);

		padding: 10px 16px;

		font-size: 16px;
		line-height: 1;
		cursor: pointer;

		transition:
			background-color 0.2s ease,
			box-shadow 0.2s ease,
			color 0.2s ease,
			transform 0.1s ease;
	}

	.button__icon {
		width: 24px;
		height: 24px;
		filter: brightness(100) saturate(100%);
	}

	.button--primary {
		background-color: $color-primary;
		color: $color-background;
		box-shadow: 0 6px 12px 0 rgba($color-primary, 0.35);

		&:hover{
			background-color: $blue-900;
			box-shadow: 0 6px 12px 0 rgba($blue-900, 0.35);
		}

		&:active{
			background-color: $blue-600;
			box-shadow: 0 6px 12px 0 rgba($blue-600, 0.35);
		}
	}

	.button--disabled {
		background-color: $color-label;
		color: $color-background;
		box-shadow: 0 6px 12px 0 rgba($color-label, 0.35);
		cursor: default;
	}

	.button--secondary {
		background-color: $color-background;
		color: $color-secondary;
		box-shadow: 0 6px 12px 0 rgba($color-secondary, 0.35);

		.button__icon {
			filter: brightness(0) saturate(100%);
		}

		&:hover{
			background-color: $blue-300;
			color: $color-label;
			box-shadow: 0 6px 12px 0 rgba($blue-300, 0.35);

			.button__icon {
				filter: brightness(1) saturate(100%);
			}
		}

		&:active{
			background-color: $blue-100;
			color: $color-label;
			box-shadow: 0 6px 12px 0 rgba($blue-100, 0.35);
		}
	}

	.button--tertiary {
		background-color: $color-secondary;
		color: $color-background;
		box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.25);

		&:hover{
			color: $color-label;

			.button__icon {
				filter: brightness(1) saturate(100%);
			}
		}
	}

	.button--danger {
		background-color: $red-500;
		color: $color-background;
		box-shadow: 0 6px 12px 0 rgba($red-500, 0.35);

		&:hover{
			background-color: $red-900;
			box-shadow: 0 6px 12px 0 rgba($red-900, 0.35);
		}

		&:active{
			border: 1px solid $red-900;
			box-shadow: 0 6px 20px 0 rgba($blue-100, 1);
		}
	}
</style>
