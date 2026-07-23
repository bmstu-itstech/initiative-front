<script setup lang="ts">
import UserEditor from '@/features/user-editor/UserEditor.vue';


const props = defineProps<{
	id: number,
	isEditing: boolean,
	from: string
}>();
</script>

<template>
	<UserEditor 
		:id="id"
		:is-editing="isEditing",
		:from="from"
	/>
</template>
