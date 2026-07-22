<script setup lang="ts">
import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';
import type { MembershipDraft } from '../type';
import { resetMembership } from '../reset';
import type { CourseSelectorValueType } from '@/widgets/CourseSelector/type';
import CourseSelector from '@/widgets/CourseSelector/CourseSelector.vue';


const props = defineProps<{
	modelValue: MembershipDraft[];
	tree: StructureTreeNodeInterface[];
	isEditing: boolean;
	isLoading: boolean;
}>();
const emit = defineEmits<{
	'update:modelValue': [value: MembershipDraft[]];
}>();

function addMembership(): void {
	if(!props.isEditing || props.isLoading)
		return;

	emit('update:modelValue', [
		...props.modelValue,
		resetMembership()
	])
}
function updateMembership(key: string, value: CourseSelectorValueType): void {
	const res = props.modelValue.map((selector)=>{
		if(selector.key != key)
			return selector;
		return {...selector, ...value}
	})
}
function deleteMembership(key: string): void {
	if (!props.isEditing || props.isLoading)
		return;

	emit('update:modelValue', props.modelValue.filter((selector)=>selector.key!=key));
}

</script>

<template>
	<div class="membership-section">
		<h2 class="membership-section__header">
			Членство в организации
		</h2>
	</div>
	<div class="membership-section__list">
		<CourseSelector 
			v-for="selector in props.modelValue"
			:key="selector.key"
			variant="membership"
			:model-value="selector"
			:structure="props.tree"
			:state="props.isLoading ? 'loading' : props.isEditing ? 'active' : 'passive'"
			@update:model-value="value=>updateMembership(selector.key, value)"
			@delete="deleteMembership(selector.key)"
		/>
		<Button
			text="Назначить"
			:state="props.isEditing && !props.isLoading ? 'primary' : 'disabled'"
			@clicked="addMembership"
		/>
	</div>
</template>

<style scoped lang="scss">
	.membership-section {
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
