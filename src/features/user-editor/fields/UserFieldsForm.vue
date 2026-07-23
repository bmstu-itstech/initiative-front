<script setup lang="ts">
import type { InputType } from '@/shared/types/types';
import type { UserFieldsDraft } from '../type';
import { USER_FIELD_SCHEMA, type UserFieldType } from './config';
import Input from '@/shared/ui/Input.vue';
import DateInput from '@/widgets/DateInput/DateInput.vue';
import type { UserFieldErrorMapType } from '../validation/type';


const props = defineProps<{
	modelValue: UserFieldsDraft;
	errors: UserFieldErrorMapType;
	isEditing: boolean;
	isLoading: boolean;
}>();
const emit = defineEmits<{
	'change': [field: UserFieldType, value: string];
}>();

function updateField(
	field: UserFieldType,
	value: string
): void {
	emit('change', field, value);
}

function getInputState(field: UserFieldType): InputType {
	if (props.isLoading)
		return 'loading';

	if(props.errors[field])
		return 'error';

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
				:state="getInputState(field.field)"
				@update:model-value="updateField(field.field, $event)"
			/>
			<DateInput 
				v-else

				:model-value="props.modelValue[field.field]"
				:header="field.header"
				:placeholder="field.placeholder"
				:is-password="false"
				:state="getInputState(field.field)"
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

	@media (max-width: 1010px) {
		.user-fields {
			grid-template-columns: 1fr;
		}
	}
</style>
