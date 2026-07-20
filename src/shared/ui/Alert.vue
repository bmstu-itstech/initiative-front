<script setup lang="ts">
import Button from './Button.vue';

import type { AlertType } from '../types/types.js';
import { ALERT_CONFIG } from '../config/alert.js';

import { computed } from 'vue';


const props = withDefaults(
	defineProps<{
		state: AlertType,
		header: string,
		description: string,
		buttons?: string[],
		cross?: boolean
	}>(), {
		buttons: ()=>['Кнопка#1', 'Кнопка#2'],
		cross: true
	}
);

const emit = defineEmits<{
	buttonOK: [],
	buttonNO: [],
	buttonCross: []
}>();

const metaType = computed(() => ALERT_CONFIG[props.state] );

const firstButtonText = computed(() => props.buttons?.[0]);
const secondButtonText = computed(() => props.buttons?.[1]);

</script>

<template>
	<div class="alert" :class="metaType.className">
		<div class="alert__info">
			<div class="alert__info__content">
				<img 
					class="alert__info__content__icon"
					:src="metaType.iconUrl"
					alt=""
				>
				<div class="alert__info__content__text">
					<p class="alert__info__content__text__header"> {{ props.header }} </p>
					<p class="alert__info__content__text__description"> {{ props.description }} </p>
				</div>
			</div>
			<img 
				v-show="props.cross"
				class="alert__info__cross"
				:src="metaType.crossUrl"
				:disabled="props.cross"
				alt=""
				@click="emit('buttonCross')"
			>
		</div>
		<div v-if="props.buttons.length>0" class="alert__buttons">
			<Button 
				v-if="firstButtonText" 
				:text="firstButtonText"
				:state="'secondary'"
				:style="'background-color: ' + metaType.buttonColor + '; color: white;'"
				@clicked="emit('buttonOK')"
			/>
			<Button 
				v-if="secondButtonText"
				:text="secondButtonText"
				:state="'secondary'"
				@clicked="emit('buttonNO')"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '../../app/styles/palette.scss' as *;

	.alert{
		width: 475px;
		height: fit-content;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;

		border-radius: 12px;

		&__info{
			width: 100%;
			height: fit-content;

			padding: 4px 4px;

			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: flex-start;

			&__content{
				width: 100%;
				height: fit-content;

				display: flex;
				flex-direction: row;
				align-items: flex-start;
				justify-content: flex-start;
				gap: 20px;

				padding: 12px 0 12px 12px;

				&__icon{
					width: 36px;
					height: 36px;
				}

				&__text{
					width: 100%;
					height: fit-content;

					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: flex-start;
					gap: 4px;

					&__header{
						font-family: var(--font-family-bold);
						font-size: 18px;
					}
				}
			}

			&__cross{
				cursor: pointer;
			}
		}

		&__buttons{
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			gap: 20px;

			padding-top: 2px;
			padding-bottom: 10px;

			width: 100%;
			height: fit-content;
		}
	}

	.alert--danger{
		background-color: $red-100;
		border-left: solid 2px $red-500;

		.alert__info__content__text{
			color: $red-500;
		}
	}
	
	.alert--warning{
		background-color: $orange-100;
		border-left: solid 2px $orange-500;

		.alert__info__content__text{
			color: $orange-500;
		}
	}

	.alert--success{
		background-color: $green-100;
		border-left: solid 2px $green-500;

		.alert__info__content__text{
			color: $green-500;
		}
	}

	.alert--info{
		background-color: $blue-100;
		border-left: solid 2px $blue-500;

		.alert__info__content__text{
			color: $blue-500;
		}
	}

</style>
