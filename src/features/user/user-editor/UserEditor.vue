<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserEditor } from './useUserEditor';
import { watch } from 'vue';
import { showAlert } from '@/features/alert/alert';
import UserFieldsForm from './fields/UserFieldsForm.vue';
import MembershipSection from './memberships/MembershipSection.vue';
import { UPDATE_USER_ALERTS } from '@/entities/User/type.ts';
import { UNKNOWN_ERROR } from '@/features/alert/config.ts';


const props = defineProps<{
	id: number;
}>();
const router = useRouter();

const {
	draft,
	mode,
	isEditing,
	isLoading,
	hints,
	errorAlert,

	load,
	save,
	create,
	startEditingDraft,
	cancelEditingDraft
} = useUserEditor();

watch(
	() => props.id,
	async (id) => {
		const success = await load(id);

		if (success)
			return;

		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		router.replace({
			name: 'people'
		});
	},
	{ immediate: true }
);

async function saveUser(): Promise<void> {
	const success = await save();

	if (!success) {
		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		return;
	}

	await load(props.id);

	showAlert(
		UPDATE_USER_ALERTS[200] ?? UNKNOWN_ERROR,
		true
	);
}

async function createUser(): Promise<void>{
	const success = await create();
	if(!success){
		if(errorAlert.value)
			showAlert(errorAlert.value, true);

		return;
	}
	showAlert(
		UPDATE_USER_ALERTS[200] ?? UNKNOWN_ERROR,
		true
	);
	router.push({
		name: 'people'
	});
}

</script>

<template>
	<UserFieldsForm 
		v-model="draft.fields"
		:is-editing="isEditing"
		:is-loading="isLoading"
	/>
	<div class="user-editor__assignments">
		<MembershipSection
			v-model="draft.memberships"
			:tree="hints"
			:is-editing="isEditing"
			:is-loading="isLoading"
		/>

		<LeadershipSection
			v-model="draft.leaderships"
			:tree="hints"
			:is-editing="isEditing"
			:is-loading="isLoading"
		/>
	</div>
	<Button
		v-if="!isEditing"
		text="Изменить"
		state="primary"
		@clicked="startEditingDraft"
	/>

	<template v-else>
		<Button
			text="Сохранить"
			:state="isLoading ? 'disabled' : 'primary'"
			@clicked="saveUser"
		/>

		<Button
			text="Отмена"
			:state="isLoading ? 'disabled' : 'secondary'"
			@clicked="cancelEditingDraft"
		/>
	</template>
</template>

<style scoped lang="scss">
	.user-editor__assignments {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
</style>
