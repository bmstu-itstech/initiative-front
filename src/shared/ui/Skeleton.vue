<script setup lang="ts">
import { computed } from 'vue';
import { INDENTS_FAKE_NODES, NUMBER_FAKE_COLUMNS, NUMBER_FAKE_NODES, NUMBER_FAKE_ROWS } from '../config/skeleton';

import LoadingIcon from '@/shared/assets/icons/Spinner.svg?component';


const props = defineProps<{
		nodes?: number,
		indets?: string[],
		text?: string
	}>();

const nodes = computed(()=>props.nodes ? props.nodes : NUMBER_FAKE_NODES);
const indets = computed(()=>props.indets ? props.indets : INDENTS_FAKE_NODES);

const text = computed(()=>props.text ? props.text : "Загрузка");

</script>

<template>
	<div class="skeleton__container">
		<div class="fake-tree">
			<div 
				v-for="node in nodes"
				class="fake-tree__node"
				:key="node"
				:style="'margin-left:'+indets[node-1]+';'"
			/>
		</div>
		<div class="loading-anim">
			<component 
				:is="LoadingIcon"
				class="loading-anim__icon"
			/>
			<span class="loading-anim__text">
				{{ text }} <span>...</span>
			</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.skeleton__container{
		width: 100%;
		height: fit-content;
		position: relative;
	}
	.loading-anim{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: fit-content;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 5px;

		&__text{
			color: var(--color-text-primary);

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;

			span{
				font-size: 16px;
				animation: skeleton-spinner-text 2s linear infinite;
				overflow: hidden;
				width: 10px;
				display: inline-block;
			}
		}

		&__icon{
			--icon-primary-color: var(--color-spinner);
			--icon-secondary-color: var(--color-background-secondary);
			animation: skeleton-spinner 1s linear infinite;
		}
	}
	.fake-tree{
		width: 100%;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 5px;

		&__node{
			width: 100%;
			height: 50px;

			border-radius: 14px;
			background-color: var(--color-loading);

			background: linear-gradient(
				90deg,
				var(--color-loading) 0%,
				var(--color-background-secondary) 50%,
				var(--color-loading) 100%
			);

			background-size: 200% 100%;

  			animation: skeleton-node-loading 2s ease-in-out infinite;
		}
	}

	@keyframes skeleton-spinner {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@keyframes skeleton-node-loading {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}

	@keyframes skeleton-spinner-text {
		0% {width: 10px;opacity: 1;}
		50% {width: 0;opacity: 0;}
		100% {width: 10px;opacity: 1;}
	}
</style>
