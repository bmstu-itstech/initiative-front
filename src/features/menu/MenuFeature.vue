<script setup lang="ts">
import Menu from '@/widgets/Menu.vue';

import { useMenuHandler } from './useMenuHandler';

const {currentButtonId, handlerMenu} = useMenuHandler();

</script>

<template>
	<Menu 
		@clicked="handlerMenu"
		:active-button="currentButtonId"
	/>
</template>
