<script setup lang="ts">
import UserFeature from '@/features/user/UserFeature.vue';

const props = defineProps<{
	id: number,
	isEditing: boolean,
	from: string
}>();
</script>

<template>
	<UserFeature 
		:id="id"
		:is-editing="isEditing",
		:from="from"
	/>
</template>
