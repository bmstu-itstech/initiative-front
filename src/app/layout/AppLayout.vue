<script setup lang="ts">
import MenuFeature from '@/features/menu/MenuFeature.vue';
import AlertFeature from '@/features/alert/AlertFeature.vue';

</script>

<template>
	<div class="app-layout">
		<AlertFeature />
		<MenuFeature 
			class="app-layout__menu"
		/>
		<div class="app-layout__main">
			<RouterView />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.app-layout{
		width: 100%;
		height: 100%;

		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: row;

		background-color: var(--color-background);

		&__main{
			width: 100%;
			height: 100%;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: column;
			gap: 50px;
			padding: clamp(30px, 10vw, 60px) clamp(30px, 10vw, 60px);

			overflow-y: auto;
			overflow-x: hidden;
		}
	}
	@media (max-width: 700px) {
		.app-layout__main{overflow-x: auto;}
		.app-layout{
			flex-direction: column;
			justify-content: flex-start;
		}
	}
</style>
