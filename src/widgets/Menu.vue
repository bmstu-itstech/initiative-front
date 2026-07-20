<script setup lang="ts">
import type { Component } from 'vue';
import { ref, computed } from 'vue';

import IllustrationLogo from '@/shared/assets/illustrations/illustration-logo.svg?component';
import { PROJECT_NAME } from '@/shared/constants/config';

import { MENU_CONFIG, type MenuButtonType } from '@/shared/config/menu';

import MenuButton from '@/shared/ui/MenuButton.vue';


const props = withDefaults(
	defineProps<{
		logo?: Component,
		header?: string,
		buttons?: MenuButtonType[],
		activeButton?: number | null
	}>(), {
		logo: IllustrationLogo,
		header: PROJECT_NAME,
		buttons: ()=>MENU_CONFIG,
		activeButton: null
	}
);

const emit = defineEmits<{
  	clicked: [id: number];
}>();

const isHovered = ref<boolean>(false);
const activeButtonId = ref<number | null>(props.activeButton);

const topButtons = computed(() => {
  	return props.buttons.filter((button) => button.position === 'top')
});

const bottomButtons = computed(() => {
 	 return props.buttons.filter((button) => button.position === 'bottom')
});

function handleButtonClick(id: number) {
  	activeButtonId.value = id;
  	emit('clicked', id);
}

</script>

<template>
	<div 
		class="sidebar" 
		:class="{'sidebar--hover': isHovered}"
		@mouseenter="isHovered=true" 
		@mouseleave="isHovered=false"
	>

		<div class="sidebar__menu">
			<div class="sidebar__menu__top">
				<div class="sidebar__menu__top__logo">
					<component 
						:is="props.logo"
						class="sidebar__menu__top__logo__icon"
					/>
					<span class="sidebar__menu__top__logo__text">
						{{ props.header }}
					</span>
				</div>
				<div
					class="sidebar__menu__top__button" 
					v-for="button in topButtons"
					:key="button.id"
				>
					<MenuButton 
						class="sidebar__menu__top__button__inner"
						:icon-url="button.icon"
						:text="button.text"
						:elongated="button.elongated || isHovered"
						:is-active="button.id === activeButtonId || button.isActive"
						@clicked="handleButtonClick(button.id)"
					/>
				</div>
			</div>
			<div class="sidebar__menu__bottom">
				<div
					class="sidebar__menu__bottom__button"
					v-for="button in bottomButtons"
					:key="button.id"
				>
					<MenuButton 
						:icon-url="button.icon"
						:text="button.text"
						:elongated="button.elongated || isHovered"
						:is-active="false"
						@clicked="emit('clicked', button.id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.sidebar{
		width: 90px;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 19px;

		border-top-right-radius: 12px;
		border-bottom-right-radius: 12px;

		padding: 20px 20px;

		background-color: var(--color-primary);

		transition:
			width 0.3s ease,
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		&__menu{
			width: fit-content;
			height: 100%;

			display: flex;
			align-content: center;
			justify-content: space-between;
			flex-direction: column;

			&__top, &__bottom{
				width: fit-content;
				height: fit-content;

				display: flex;
				align-items: flex-start;
				justify-content: flex-start;
				flex-direction: column;
				gap: 16px;
				
				--menu-button-size: 50px;
			}

			&__top__logo{
				width: fit-content;
				height: fit-content;

				display: flex;
				align-items: center;
				justify-content: center;
				gap: 14px;

				--icon-primary-color: white;

				&__icon{
					width: 50px;
					height: 50px;
				}
				&__text{
					color: white;
					font-size: 32px;

					opacity: 0;
					max-width: 0;
					overflow: hidden;
					white-space: nowrap;

					transition:
						opacity 0.2s ease,
						max-width 1s ease;

					span{
						font-family: var(--font-family-bold);
					}
				}
			}
		}
	}
	.sidebar--hover{
		width: 300px;

		.sidebar__menu__top__logo__text{
			opacity: 1;
			max-width: 200px;
		}
	}
</style>
