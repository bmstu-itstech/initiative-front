<script setup lang="ts">
import type { InputType } from '@/shared/types/types';
import Input from '@/shared/ui/Input.vue';
import { computed, onUnmounted, reactive, ref, watch } from 'vue';
import { DATE_INPUT_GRID, DATE_INPUT_HEADERS_CONFIG, DATE_INPUT_MONTHS_CONFIG, DATE_INPUT_YEARS_CONFIG, date_mapper } from './config';
import { date2hint, getArrayDays } from './lib';


const props = withDefaults(
	defineProps<{
		modelValue: string,
		header?: string,
		placeholder: string,
		state?: InputType
	}>(), {
		header: '',
		state: 'default'
	}
);

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>();

const formDate = reactive(date2hint(props.modelValue));
watch(()=>props.modelValue, (value)=>Object.assign(formDate, date2hint(value)));

const date = computed(() => {
	if (!formDate.year || !formDate.month || !formDate.day) {
		return '-';
	}

	const monthIndex = date_mapper[formDate.month] ?? 0;

	const month = String(monthIndex + 1).padStart(2, '0');
	const day = formDate.day.padStart(2, '0');

	return `${formDate.year}-${month}-${day}`;
});

const resetVars = computed<string[][]>(()=>[
	DATE_INPUT_YEARS_CONFIG,
	DATE_INPUT_MONTHS_CONFIG,
	getArrayDays(Number(formDate.year), date_mapper[formDate.month] ?? 0)
]);
const vars = ref<string[][]>([]);

const page = ref<number>(0);

function handler(value: string){
	const fields = ['year', 'month', 'day'] as const;
	const field = fields[page.value] ?? 'year';
	formDate[field] = value;

	if(page.value == vars.value.length - 1)
		hideVariants();
}

function showVariants(): void { vars.value = resetVars.value; touched.value = true; }

function hideVariants(): void { vars.value = []; }

watch(date, newDate=>emit('update:modelValue', newDate));

const touched = ref<boolean>(false);

onUnmounted(()=>{
	touched.value=false;
})

function clearDate(): void {
	formDate.year = '';
	formDate.month = '';
	formDate.day = '';

	page.value = 0;
	vars.value = [];
}

</script>

<template>
	<Input 
		:header="props.header"
		:placeholder="props.placeholder"
		:state="props.state"

		:model-value="date"
		:is-password="false"
		:variants="vars"
		:hint-header="DATE_INPUT_HEADERS_CONFIG"
		:hint-page="page"
		:hint-grid="DATE_INPUT_GRID"
		:readonly="true"
		:erased="true"

		@update:model-value="(value)=>{if(value==='')clearDate();}"
		@clicked="handler"
		@focused="showVariants"
		@unfocused="hideVariants"
		@update:hint-page="page=$event"
	/>
</template>

<style scoped lang="scss">
	
</style>
