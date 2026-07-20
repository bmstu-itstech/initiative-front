<script setup lang="ts">
import Alert from '@/shared/ui/Alert.vue';
import { alertState } from './alert';

</script>

<template>
	<Teleport to="body">
		<Alert 
			v-if="alertState.visible"
			class="global-alert"
			:class="{'global-alert--temporary': alertState.isTemporary}"
			:state="alertState.state"
			:header="alertState.header"
			:description="alertState.description"
			:buttons="alertState.buttons"
			:cross="alertState.cross"
			@button-n-o="alertState.onNo"
			@button-o-k="alertState.onOk"
			@button-cross="alertState.onCross"
		/>
	</Teleport>
</template>

<style scoped lang="scss">
	.global-alert{
		z-index: 1000;

		position: fixed;
		top: 24px;
		right: 24px;

		animation: alert-show 0.5s ease-out;

		&--temporary{
			animation: alert-hide 0.5s ease-in forwards;
		}
	}
	@keyframes alert-show {
		from {
			transform: translate(
				calc(100% + 24px),
				0
			);
			opacity: 0;
		}
		to {
			transform: translate(0, 0);
			opacity: 1;
		}
	}
	@keyframes alert-hide {
		from {
			transform: translate(0, 0);
			opacity: 1;
		}
		to{
			transform: translate(
				calc(100% + 24px),
				0
			);
			opacity: 0;
		}
	}
</style>
