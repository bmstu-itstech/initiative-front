<script setup lang="ts">
import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';

import DropDownMenu from './DropDownMenu.vue';

import { ref } from 'vue';


const props = defineProps<{
	node: StructureTreeNodeInterface
}>();

const emit = defineEmits<{
	clicked: [id: number[]]
}>();

function handleClick(id: number) {
  	if (props.node.type === 'user') {
  	  	emit('clicked', [id])
  	}
}

function handleChildClick(ids: number[]) {
  	emit('clicked', [props.node.id, ...ids])
}

</script>

<template>
	<DropDownMenu
		:ID="props.node.id"
		:header="props.node.title"
		:footer="props.node.subtitle"
		:state="props.node.type"
		@clicked="handleClick"
	>
		<TreeNode 
			v-for="child in node.children"
			:key="child.id"
			:node="child"
			@clicked="handleChildClick"
		/>
	</DropDownMenu>
</template>

<style scoped lang="scss">
	
</style>
