<script setup lang="ts">
import NotFoundIllustration from '@/shared/assets/illustrations/illustration-404.svg?component';
import type { Component } from 'vue';

const props = withDefaults(
	defineProps<{
		flag: boolean,
		icon?: Component,
		text?: string
	}>(), {
		flag: true,
		icon: NotFoundIllustration,
		text: "Ничего не найдено"
	}
);

</script>

<template>
	<div 
		class="not-found"
		v-if="props.flag"
	>
		<component 
			class="not-found__icon"
			:is="props.icon"
		/>
		<span class="not-found__text">{{ props.text }}</span>
	</div>
</template>

<style scoped lang="scss">
	.not-found{
		width: 100%;
		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&__text{
			color: var(--color-text-primary);
			font-size: 24px;
			font-family: var(--font-family-bold);
		}
	}
</style>
