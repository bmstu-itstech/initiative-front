<script setup lang="ts">
import { computed, ref } from 'vue';
import ArrowIcon from '@/shared/assets/icons/Arrow.svg?component';


const props = withDefaults(defineProps<{
	data: string[][],
	header?: string[],
	page?: number,
	grid?: number[][]
}>(), {
	header: ()=>[],
	page: 0,
	grid: ()=>[[1]]
});

const emit = defineEmits<{
	'clicked': [variant: string],
	'update:page': [value: number]
}>();

const page = computed<number>({
	get: () => props.page,
	set: value => emit('update:page', value)
});
const currentData = computed<string[]>(()=>props.data[page.value] ?? []);
const currentHeader = computed<string>(()=>props.header[page.value] ?? '');

const leftHeaderClass = ref<boolean>(false);
const rightHeaderClass = ref<boolean>(false);

function leftSwipe(){
	leftHeaderClass.value = true;
	setTimeout(()=>page.value--, 125);
	setTimeout(()=>leftHeaderClass.value=false, 250);
}

function rightSwipe(){
	rightHeaderClass.value = true;
	setTimeout(()=>page.value++, 125);
	setTimeout(()=>rightHeaderClass.value=false, 250);
}

const grid = computed<string>(()=>
	'grid-template-columns: ' +
	(props.grid[page.value] ?? [1])
	.map(String).join('fr ')+'fr;');

</script>

<template>
	<div 
		v-if="props.data.length > 0"
		class="input-hint"
		@mousedown.prevent
	>
		<div
			class="input-hint__content"
			:class="{
				'input-hint__content--left': leftHeaderClass,
				'input-hint__content--right': rightHeaderClass
			}"
		>
			<span 
				v-if="props.header"
				class="input-hint__header"
			>
				<div><component 
					v-if="page != 0"
					class="input-hint__header__page-left"
					:is="ArrowIcon"
					@click="leftSwipe"
				/></div>
				{{ currentHeader }}
				<div><component 
					v-if="page != props.data.length-1"
					class="input-hint__header__page-right"
					:is="ArrowIcon"
					@click="rightSwipe"
				/></div>
			</span>
			<div 
				class="input-hint__variants"
				:style="grid"
			>
				<div 
					v-for="(variant, index) in currentData"
					:key = "index"
					class="input-hint__variant"
					@click="emit('clicked', variant)"
				>
					<span class="input-hint__variant__text">
						{{ variant }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.input-hint{
		position: absolute;
		inset: 60px 0;
		z-index: 100;
		
		width: 100%;
		height: fit-content;

		background-color: var(--color-background);
		border: 1px solid transparent;
		border-color: var(--color-border);
		padding: 10px;
		border-radius: 14px;

		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		gap: 4px;

		overflow-x: hidden;

		&__content{
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 10px;

			&--left{ animation: left-swipe 0.25s linear; }
			&--right{ animation: right-swipe 0.25s linear; }
		}

		&__header{
			width: 100%;
			height: fit-content;

			display: flex;
			align-items: center;
			justify-content: space-between;

			color: var(--color-text-primary);

			&__page-left, &__page-right{
				--icon-primary-color: var(--color-text-secondary);
				cursor: pointer;
				&:hover{ --icon-primary-color: var(--color-text-primary); }
			}

			&__page-left{ transform: rotate(180deg); }
		}

		&__variants{
			height: fit-content;
			max-height: 150px;
			overflow-y: auto;

			display: grid;
			width: 100%;
			grid-template-columns: 1fr;
			align-items: flex-start;
			justify-content: center;
			gap: 4px;
		}

		&__variant{
			width: 100%;
			height: fit-content;
			padding: 4px;

			border-bottom: 1px solid transparent;
			border-color: var(--color-border);

			cursor: pointer;

			transition:
				background-color 0.2s ease,
				color 0.2s ease,
				border-color 0.2s ease,
				box-shadow 0.2s ease;

			&__text{
				color: var(--color-text-secondary);
				transition: color 0.2s ease;
			}

			&:hover{
				background-color: var(--color-background-secondary);

				.input-hint__variant__text{
					color: var(--color-text-primary);
				}
			}
		}
	}

	@keyframes left-swipe {
		0%{margin-left: 0;}
		50% {margin-left: 100%;}
		51% {margin-left: -100%;}
		100% {margin-left: 0;}
	}
	@keyframes right-swipe {
		0%{margin-left: 0;}
		50% {margin-left: -100%;}
		51% {margin-left: 100%;}
		100% {margin-left: 0;}
	}
</style>
