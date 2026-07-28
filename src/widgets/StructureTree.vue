<script setup lang="ts">
import { STRUCTURE_TREE_MOCK } from '@/entities/StructureTree/mock';

import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';

import TreeNode from '@/shared/ui/TreeNode.vue';


const props = withDefaults(
	defineProps<{
		data?: StructureTreeNodeInterface[]
	}>(), {
		data: ()=>STRUCTURE_TREE_MOCK
	}
);

const emit = defineEmits<{
	clicked: [id: number[]]
}>();

</script>

<template>
	<TreeNode 
		v-for="node in props.data"
		:key="`${node.type}-${node.id}`"
		:node="node"
		@clicked="(ids: number[])=>emit('clicked', ids)"
	/>
</template>

<style scoped lang="scss">
	
</style>
