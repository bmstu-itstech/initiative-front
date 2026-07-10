<script setup lang="ts">
import type { TableCellPositionType } from '../types/types';


const props = withDefaults(
	defineProps<{
		id: number,
		text: string,
		position?: TableCellPositionType,
		isHeader?: boolean,
		isButton?: boolean,
	}>(), {
		position: 'center',
		isHeader: false,
		isButton: false,
	}
);

const emit = defineEmits<{
	'clicked': [id: number]
}>();

function handler(): void{
	if(!props.isButton)
		return
	emit('clicked', props.id)
}

</script>

<template>
	<div
		class="cell"
		:class="[{
			'cell--header': props.isHeader,
			'cell--button': props.isButton,
		},
			'cell--'+props.position
		]"
		@click="handler"
	>
		<span class="cell__text">{{ props.text }}</span>
	</div>
</template>

<style scoped lang="scss">
	.cell{
		width: 100%;
		height: 40px;

		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--color-text-primary);
		font-size: 14px;
		
		border-bottom: 1px solid transparent;
		border-color: var(--color-border);

		transition: background-color 0.2s ease;

		&:hover{
			background-color: var(--color-background-secondary);
		}
		
		&--left{
			justify-content: flex-start;
		}
		&--right{
			justify-content: flex-end;
		}

		&--button{
			user-select: none;
			color: var(--color-primary);
			cursor: pointer;

			&:hover{
				.cell__text{
					transition: text-shadow 0.5s ease;
					text-shadow: 0 0 12px var(--color-primary);
				}
			}
			&:active{
				.cell__text{
					transition: text-shadow 0.3s ease;
					text-shadow: 0 0 4px var(--color-primary);
				}
			}
		}
		&--header{
			background-color: var(--color-background-secondary);
			height: 52px;
			font-size: 12px;
			color: var(--color-text-header);
		}
	}
</style>
