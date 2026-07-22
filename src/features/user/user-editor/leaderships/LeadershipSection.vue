<script setup lang="ts">
import Button from '@/shared/ui/Button.vue';
import CourseSelector from '@/widgets/CourseSelector/CourseSelector.vue';

import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';
import type { CourseSelectorValueType } from '@/widgets/CourseSelector/type';

import type { LeadershipDraft } from '../type';
import { resetLeadership } from '../reset';

const props = defineProps<{
	modelValue: LeadershipDraft[];
	tree: StructureTreeNodeInterface[];
	isEditing: boolean;
	isLoading: boolean;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: LeadershipDraft[]];
}>();

function addLeadership(): void {
	if (!props.isEditing || props.isLoading)
		return;

	emit('update:modelValue', [
		...props.modelValue,
		resetLeadership()
	]);
}

function updateLeadership(
	key: string,
	value: CourseSelectorValueType
): void {
	const updatedLeadership = props.modelValue.map(
		(item) => {
			if (item.key !== key)
				return item;

			return {
				...item,
				...value
			};
		}
	);

	emit('update:modelValue', updatedLeadership);
}

function deleteLeadership(key: string): void {
	if (!props.isEditing || props.isLoading)
		return;

	emit(
		'update:modelValue',
		props.modelValue.filter(
			(item) => item.key !== key
		)
	);
}
</script>

<template>
	<section class="leadership-section">
		<h2 class="leadership-section__header">
			Руководство в организации
		</h2>

		<div class="leadership-section__list">
			<CourseSelector
				v-for="item in props.modelValue"
				:key="item.key"
				:model-value="item"
				variant="leadership"
				:structure="props.tree"
				:state="props.isLoading ? 'loading' : props.isEditing ? 'active' : 'passive'"
				@update:model-value="value => updateLeadership(item.key, value)"
				@delete="deleteLeadership(item.key)"
			/>
		</div>

		<Button
			text="Назначить"
			:state="props.isEditing && !props.isLoading ? 'primary' : 'disabled'"
			@clicked="addLeadership"
		/>
	</section>
</template>

<style scoped lang="scss">
	.leadership-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 15px;

		&__header {
			margin: 0;

			color: var(--color-text-primary);
			font-family: var(--font-family-bold);
			font-size: 24px;
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 15px;
		}
	}
</style>
