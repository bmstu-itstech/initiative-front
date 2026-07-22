<script setup lang="ts">
import UserEditor from '@/features/user/user-editor/UserEditor.vue';
import UserFeature from '@/features/user/UserFeature.vue';

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
