<script setup lang="ts">
import StructureTree from '@/widgets/StructureTree.vue';
import { useStructureTree } from './useStructureTree';
import { onMounted } from 'vue';
import { showAlert } from '../alert/alert';
import Skeleton from '@/shared/ui/Skeleton.vue';
import type { FilterDataInterface } from '@/shared/types/interfaces';
import { filterTree } from '../filterTree/filterTree';
import { computed } from 'vue';
import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';
import { useRouter } from 'vue-router';
import NotFoundIllustration from '@/shared/assets/illustrations/illustration-404.svg'
import NotFound from '@/shared/ui/NotFound.vue';


const router = useRouter();

const props = defineProps<{
	filter: FilterDataInterface
}>();

const filteredData = computed<StructureTreeNodeInterface[]>(()=>filterTree(props.filter, data.value));

const {
	isLoading,
	errorAlert,
	data,
	loadStructureTree
} = useStructureTree();

onMounted(async ()=>{
	await loadStructureTree();
	if(errorAlert.value!=null)
		showAlert(errorAlert.value, true);
})

function handleLink(ids: number[]): void{
	router.push({
		name: 'user',
		params: { 
			id: ids[ids.length-1],
		}, 
		query: {
			isEditing: "false",
			from: 'people'
		}
	});
}

</script>

<template>
	<Skeleton v-if="isLoading"/>
	<StructureTree 
		v-else
		:data="filteredData"
		@clicked="handleLink"
	/>
	<NotFound 
		:flag="filteredData.length == 0 && !isLoading"
	/>
</template>
