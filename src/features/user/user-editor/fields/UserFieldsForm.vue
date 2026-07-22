<script setup lang="ts">
import type { InputType } from '@/shared/types/types';
import type { UserFieldsDraft } from '../type';
import { USER_FIELD_SCHEMA, type UserFieldType } from './config';
import Input from '@/shared/ui/Input.vue';
import DateInput from '@/widgets/DateInput/DateInput.vue';


const props = defineProps<{
	modelValue: UserFieldsDraft;
	isEditing: boolean;
	isLoading: boolean;
}>();
const emit = defineEmits<{
	'update:modelValue': [value: UserFieldsDraft];
}>();

function updateField(
	field: UserFieldType,
	value: string
): void {
	emit('update:modelValue', {
		...props.modelValue,
		[field]: value
	})
}

function getInputState(): InputType {
	if (props.isLoading)
		return 'loading';

	return props.isEditing
		? 'default'
		: 'disabled';
}

</script>

<template>
	<div class="user-fields">
		<template v-for="field in USER_FIELD_SCHEMA">
			<Input 
				v-if="field.type == 'text'"

				:model-value="props.modelValue[field.field]"
				:header="field.header"
				:placeholder="field.placeholder"
				:is-password="false"
				:state="getInputState()"
				@update:model-value="updateField(field.field, $event)"
			/>
			<DateInput 
				v-else

				:model-value="props.modelValue[field.field]"
				:header="field.header"
				:placeholder="field.placeholder"
				:is-password="false"
				:state="getInputState()"
				@update:model-value="updateField(field.field, $event)"
			/>
		</template>
	</div>
</template>

<style scoped lang="scss">
	.user-fields {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}

	@media (max-width: 800px) {
		.user-fields {
			grid-template-columns: 1fr;
		}
	}
</style>
