<script setup lang="ts">
import type { StructureTreeNodeInterface } from '@/entities/StructureTree/type';
import type { MembershipDraft } from '../type';
import { resetMembership } from '../reset';
import type { CourseSelectorValueType } from '@/widgets/CourseSelector/type';
import CourseSelector from '@/widgets/CourseSelector/CourseSelector.vue';
import type { MembershipErrors } from '../validation/membership';
import Button from '@/shared/ui/Button.vue';


const props = defineProps<{
	modelValue: MembershipDraft[];
	tree: StructureTreeNodeInterface[];
	errors: MembershipErrors;
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
	});
	emit('update:modelValue', res);
}
function deleteMembership(key: string): void {
	if (!props.isEditing || props.isLoading)
		return;

	emit('update:modelValue', props.modelValue.filter((selector)=>selector.key!=key));
}

</script>

<template>
	<section class="membership-section">
		<h2 class="membership-section__header">
			Членство в организации
		</h2>
		<div class="membership-section__list">
			<CourseSelector
				v-for="selector in props.modelValue"
				:key="selector.key"
				:model-value="selector"
				variant="membership"
				:structure="props.tree"
				:state="
					props.isLoading
						? 'loading'
						: props.isEditing
							? 'active'
							: 'passive'
				"
				:error="[Boolean(props.errors[selector.key]?.course), Boolean(props.errors[selector.key]?.group)]"
				@update:model-value="value =>updateMembership(selector.key,value)"
				@delete="deleteMembership(selector.key)"
			/>
		</div>
		<Button
			text="Назначить"
			:state="
				props.isEditing &&
				!props.isLoading
					? 'primary'
					: 'disabled'
			"
			@clicked="addMembership"
		/>
	</section>
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
