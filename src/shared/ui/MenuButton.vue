<script setup lang="ts">
import default_icon from "@/shared/assets/icons/menu/Structure.svg";

const props = withDefaults(
	defineProps<{
		iconUrl?: string,
		text?: string,
		elongated?: boolean,
		isActive?: boolean
	}>(), {
		iconUrl: default_icon,
		text: "Структура",
		elongated: true,
		isActive: false
	}
);

const emit = defineEmits<{
	clicked: []
}>();

</script>

<template>
	<button 
		type="button"
		class="menu-button" 
		:class="{
			'menu-button--elongated': props.elongated,
			'menu-button--active': props.isActive,
		}"
		@click="emit('clicked')"
	>

		<div class="menu-button__container">
			<img
				class="menu-button__icon"
				:src="props.iconUrl"
				alt=""
				aria-hidden="true"
			>
		</div>
		<span class="menu-button__text"> 
			{{ text }} 
		</span>

	</button>
</template>

<style scoped lang="scss">
	@use "../../app/styles/palette.scss" as *;

	.menu-button{
		height: var(--menu-button-size, 44px);
		width: var(--menu-button-size, 44px);
		padding: 10px 10px;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;

		overflow: hidden;

		border-radius: 70px;
		background-color: $blue-300;

		cursor: pointer;

		transition:
			width 0.3s ease,
			background-color 0.4s ease,
			color 0.4s ease,
			transform 0.1s ease;
			

		&__container{
			height: 100%;
			aspect-ratio: 1 / 1;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__icon{
			width: 24px;
			height: 24px;
			flex: 0 0 auto;
			filter: brightness(0.85) saturate(100%);
			transition: filter 0.3s ease;
		}

		&__text{
			max-width: 0;
			opacity: 0;
			overflow: hidden;
			height: 100%;
			white-space: nowrap;
			margin-left: 0;

			display: flex;
			align-items: center;
			justify-content: flex-start;

			font-size: 14px;
			color: $color-label;

			transition:
				max-width 0.3s ease,
				opacity 0.2s ease,
				margin-left 0.3s ease,
				color 0.3s ease;
		}

		&--elongated{
			width: 260px;

			.menu-button__text {
				max-width: 216px;
				opacity: 1;
				margin-left: 12px;
			}
		}

		&:hover, &--active{
			background-color: $white;
			border: solid 1px transparent;
			border-color: $gray-100;
			
			.menu-button__text{
				color: $color-secondary;
			}

			.menu-button__icon{
				filter: brightness(0) saturate(100%);
			}
		}

		&:active{
			background-color: $blue-100;
			border: solid 1px transparent;
			border-color: $gray-100;
			
			.menu-button__text{
				color: $color-secondary;
				opacity: 0.66;
			}

			.menu-button__icon{
				filter: brightness(0.85) saturate(100%);
			}
		}
	}
</style>
