<script setup lang="ts">

const props = defineProps<{
	header: string,
	message: string
}>();

</script>
<template>
	<div class="block">
		<span class="block__header">{{ header }}</span>
		<span class="block__content">{{ message }}</span>
	</div>
</template>
<style scoped lang="scss">
	.block{
		width: 100%;
		height: fit-content;
		
		background-color: var(--color-background);

		padding: 20px 40px;

		border: 1px solid transparent;
		border-color: var(--color-border);
		border-radius: 20px;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		gap: 10px;

		&__header{
			font-size: 20px;
			font-family: var(--font-family-bold);
			color: var(--color-text-primary);
		}

		&__content{
			font-size: 16px;
			color: var(--color-text-primary);
			text-align: start;
			text-wrap: normal;
		}
	}
</style>
