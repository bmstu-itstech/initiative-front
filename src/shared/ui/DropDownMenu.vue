<script setup lang="ts">
import { DROP_DOWN_MENU_CONFIG } from '../config/dropDownMenu';
import type { DropDownMenuType } from '../types/types';
import type { Component } from 'vue';

import { ref } from 'vue';


const props = withDefaults(
	defineProps<{
		ID: number,
		header?: string,
		footer?: string,
		state?: DropDownMenuType
	}>(), {
		header: "Название",
		footer: "Фамилия Имя Отчество",
		state: "endpoint"
	}
);

const emit = defineEmits<{
	clicked: [id: number]
}>();

const flag = ref<boolean>(false);

function handler(): void{
	flag.value=!flag.value;
	emit('clicked', props.ID);
}

</script>

<template>
	<div class="dd-menu__wrapper">
		<div class="dd-menu" :class="'dd-menu--' + props.state" @click.stop="handler">
			<div class="dd-menu__indent">
				<component 
					:is="DROP_DOWN_MENU_CONFIG[props.state].icon"
					v-if="DROP_DOWN_MENU_CONFIG[props.state].icon"
					class="dd-menu__indent__icon"
					:class="{
						'dd-menu__indent__icon--inverted': flag
					}"
				/>
			</div>
			<div class="dd-menu__content">
				<span class="dd-menu__content__header">{{ props.header }}</span>
				<span class="dd-menu__content__footer">{{ props.footer }}</span>
			</div>
		</div>
		<div v-if="props.state=='endpoint' || flag" class="dd-menu__children">
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.dd-menu__wrapper{
		width: 100%;
	}

	.dd-menu{
		width: 100%;
		height: 50px;

		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: row;

		border-radius: 14px;

		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		&__indent{
			width: 40px;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			&__icon{
				width: 24px;
				height: 24px;

				transition: transform 0.2s ease;

				--icon-secondary-color: var(--color-background);
				--icon-primary-color: var(--color-text-primary);
			}
		}

		&__content{
			width: 100%;
			height: 100%;

			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			gap: 6px;

			border-bottom: 1px solid transparent;
			border-color: var(--color-border-secondary);

			&__header{
				font-size: 16px;
				color: var(--color-text-primary);
			}

			&__footer{
				font-size: 12px;
				color: var(--color-label);
			}
		}

		&:hover{
			background-color: var(--color-background-secondary);
		}
	}

	.dd-menu--course{
		cursor: pointer;
		user-select: none;
	}

	.dd-menu--group{
		cursor: pointer;
		user-select: none;

		.dd-menu__indent{
			margin-left: 30px;
		}
	}

	.dd-menu--user{
		height: fit-content;

		.dd-menu__content{
			padding: 6px 0;

			&__header{
				width: fit-content;
				height: fit-content;

				display: flex;
				align-items: center;
				justify-content: center;

				padding: 4px 4px;

				border-radius: 14px;

				cursor: pointer;
				user-select: none;
				
				color: var(--color-badge-primary);
				background-color: var(--color-badge-secondary);
			}
			&__footer{
				display: none;
			}
		}

		.dd-menu__indent{
			margin-left: 60px;

			&__icon{
				opacity: 0;
			}
		}
	}

	.dd-menu__indent__icon--inverted{
		transform: rotate(90deg);
	}
</style>
