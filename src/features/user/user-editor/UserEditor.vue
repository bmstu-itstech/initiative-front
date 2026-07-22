<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/shared/ui/Button.vue';

import UserFieldsForm from './fields/UserFieldsForm.vue';
import MembershipSection from './memberships/MembershipSection.vue';
import LeadershipSection from './leaderships/LeadershipSection.vue';

import { useUserEditor } from './useUserEditor';

import {
	hideAlert,
	showAlert
} from '@/features/alert/alert';

import { UPDATE_USER_ALERTS } from '@/entities/User/type';

const props = withDefaults(
	defineProps<{
		id: number;
		isEditing?: boolean;
		from?: string;
	}>(),
	{
		isEditing: false,
		from: 'people'
	}
);

const router = useRouter();

const {
	draft,
	mode,
	isEditing,
	isLoading,
	hints,
	errorAlert,

	fieldErrors,
	updateField,

	membershipErrors,
	updateMembership,

	leadershipErrors,
	updateLeadership,

	load,
	prepareCreate,
	save,
	create,
	remove,

	resetValidation,

	startEditingDraft,
	cancelEditingDraft
} = useUserEditor();

const fullName = computed<string>(() => {
	const name = [
		draft.value.fields.firstName,
		draft.value.fields.secondName,
		draft.value.fields.surName
	]
		.map((part) => part.trim())
		.filter((part) => part && part !== '-')
		.join(' ');

	if (name)
		return name;

	return mode.value === 'create'
		? 'Новый пользователь'
		: 'Пользователь';
});

const displayedGroup = computed<string>(() => {
	const group = draft.value.fields.group.trim();
	return group === '-' ? '' : group;
});

watch(
	[
		() => props.id,
		() => props.isEditing
	],
	async ([id, isCreating]) => {
		const success = isCreating
			? await prepareCreate()
			: await load(id);

		if (success)
			return;

		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		await router.replace({
			name: props.from
		});
	},
	{
		immediate: true
	}
);

function beginEditing(): void {
	if (isLoading.value)
		return;

	resetValidation();
	startEditingDraft();
}

function cancelCurrentAction(): void {
	if (isLoading.value)
		return;

	resetValidation();
	errorAlert.value = null;

	if (mode.value === 'create') {
		router.push({
			name: props.from
		});

		return;
	}

	cancelEditingDraft();
}

async function saveUser(): Promise<void> {
	const success = await save();

	if (!success) {
		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		return;
	}

	const userId = draft.value.userId;
	if (userId !== null) {
		const loaded = await load(userId);

		if (!loaded) {
			if (errorAlert.value)
				showAlert(errorAlert.value, true);

			return;
		}
	}

	showAlert(
		UPDATE_USER_ALERTS[200] ?? {
			state: 'success',
			header: 'Данные сохранены',
			description:
				'Информация о пользователе успешно обновлена'
		},
		true
	);
}

async function createUser(): Promise<void> {
	const success = await create();

	if (!success) {
		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		return;
	}

	showAlert(
		UPDATE_USER_ALERTS[200] ?? {
			state: 'success',
			header: 'Пользователь создан',
			description:
				'Новый пользователь успешно добавлен'
		},
		true
	);

	await router.push({
		name: props.from
	});
}

async function submit(): Promise<void> {
	if (isLoading.value)
		return;

	if (mode.value === 'create') {
		await createUser();
		return;
	}

	await saveUser();
}

async function deleteCurrentUser(): Promise<void> {
	hideAlert();

	const success = await remove();

	if (!success) {
		if (errorAlert.value)
			showAlert(errorAlert.value, true);

		return;
	}

	showAlert(
		{
			state: 'success',
			header: 'Пользователь удалён',
			description:
				'Пользователь успешно удалён'
		},
		true
	);

	await router.push({
		name: props.from
	});
}

function requestUserDeletion(): void {
	showAlert(
		{
			state: 'danger',
			header: 'Удалить пользователя?',
			description:
				`Пользователь «${fullName.value}» будет удалён без возможности восстановления.`,

			buttons: ['Да', 'Нет'],
			cross: true,

			onOk: deleteCurrentUser,
			onNo: hideAlert,
			onCross: hideAlert
		},
		false
	);
}
</script>

<template>
	<div class="user-page">
		<header class="user-page__header">
			<div class="user-page__name">
				<div class="user-page__title">
					<span class="user-page__title-text">
						{{ fullName }}
					</span>
					<span
						v-if="mode !== 'create' && draft.userId !== null"
						class="user-page__id"
					>
						#{{ draft.userId }}
					</span>
				</div>
				<span
					v-if="displayedGroup"
					class="user-page__group"
				>
					{{ displayedGroup }}
				</span>
			</div>
		</header>
		<div class="user-page__content">
			<div class="user-page__left">
				<UserFieldsForm
					:model-value="draft.fields"
					:errors="fieldErrors"
					:is-editing="isEditing"
					:is-loading="isLoading"
					@change="updateField"
				/>
			</div>
			<div class="user-page__right">
				<div class="user-page__organization">
					<MembershipSection
						:model-value="draft.memberships"
						:errors="membershipErrors"
						:tree="hints"
						:is-editing="isEditing"
						:is-loading="isLoading"
						@update:model-value="updateMembership"
					/>
					<LeadershipSection
						:model-value="draft.leaderships"
						:errors="leadershipErrors"
						:tree="hints"
						:is-editing="isEditing"
						:is-loading="isLoading"
						@update:model-value="updateLeadership"
					/>
				</div>
				<div class="user-page__actions">
					<template v-if="mode === 'read'">
						<Button
							text="Изменить"
							:state="isLoading ? 'disabled' : 'primary'"
							@clicked="beginEditing"
						/>
						<Button
							text="Удалить"
							:state="isLoading ? 'disabled' : 'danger'"
							@clicked="requestUserDeletion"
						/>
					</template>
					<template v-else>
						<Button
							:text="mode === 'create' ? 'Создать' : 'Сохранить'"
							:state="isLoading ? 'disabled' : 'primary'"
							@clicked="submit"
						/>
						<Button
							text="Отмена"
							:state="isLoading ? 'disabled' : 'secondary'"
							@clicked="cancelCurrentAction"
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.user-page {
		width: fit-content;
		max-width: 100%;
		height: fit-content;

		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		gap: 30px;

		&__header {
			width: 100%;
			height: fit-content;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
		}

		&__name {
			width: fit-content;
			height: fit-content;

			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&__title {
			display: flex;
			align-items: baseline;
			flex-wrap: wrap;
			gap: 8px;
		}

		&__title-text {
			color: var(--color-text-primary);
			font-family: var(--font-family-bold);
			font-size: 32px;
			line-height: 1.2;
		}

		&__id {
			color: var(--color-label);
			font-family: var(--font-family-bold);
			font-size: 32px;
			line-height: 1.2;
		}

		&__group {
			color: var(--color-label);
			font-family: var(--font-family-bold);
			font-size: 24px;
			line-height: 1.2;
		}

		&__content {
			width: fit-content;
			max-width: 100%;
			height: fit-content;

			display: flex;
			align-items: stretch;
			flex-direction: row;
			gap: 30px;
		}

		&__left {
			width: fit-content;
			height: fit-content;
		}

		&__right {
			width: fit-content;
			height: auto;
			min-height: 396px;

			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			flex-direction: column;
			gap: 30px;
		}

		&__organization {
			width: fit-content;
			height: fit-content;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: column;
			gap: 30px;
		}

		&__actions {
			width: fit-content;
			height: fit-content;

			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 20px;
		}
	}

	@media (max-width: 1590px) {
		.user-page {
			&__content {
				width: 100%;
				flex-direction: column;
			}

			&__left {
				width: 100%;
			}

			&__right {
				width: 100%;
				min-height: 0;

				align-items: flex-start;
			}

			&__organization {
				width: 100%;
			}

			&__actions {
				align-self: flex-end;
			}
		}
	}

	@media (max-width: 800px) {
		.user-page {
			width: 100%;
			gap: 24px;

			&__title-text,
			&__id {
				font-size: 26px;
			}

			&__group {
				font-size: 20px;
			}

			&__content {
				gap: 24px;
			}

			&__right,
			&__organization {
				width: 100%;
			}

			&__actions {
				width: 100%;
				align-self: stretch;
				justify-content: flex-start;
				gap: 12px;
			}
		}
	}
</style>
