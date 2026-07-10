<script setup lang="ts">
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

import type { CourseSelectorType, InputType } from '@/shared/types/types';

import type { CourseSelectorInterface } from '@/shared/types/interfaces';

import { ref } from 'vue';
import { COURSE_SELECTOR_CONFIG } from '@/shared/config/courseSelector';

const props = withDefaults(
	defineProps<{
		state?: CourseSelectorType,
		error?: boolean[],
		course?: string,
		group?: string,
		id: number
	}>(), {
		state: 'active',
		error: ()=>[false, false],
		course: 'Направление',
		group: 'Отдел'
	}
);

const emit = defineEmits<{
	clicked: [CourseSelectorInterface]
}>();

const course = ref(props.state != 'passive' ? '' : props.course);
const group = ref(props.state != 'passive' ? '' : props.group);

</script>

<template>
	<div class="selector" :class="'selector--' + state">
		<Input 
			class="selector__input1"
			v-model="course"
			placeholder="Направление"
			:state="props.error[0] ? 'error' : COURSE_SELECTOR_CONFIG[props.state].state"
			:isPassword="false"
		/>
		<div class="selector__devider">
			<svg class="selector__devider__icon"

				width="24" height="24" viewBox="0 0 24 24" 
				fill="none"
				
				xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7903 11.3871L19.7071 11.2929L14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289C12.9324 6.65338 12.9047 7.22061 13.2097 7.6129L13.2929 7.70711L16.585 11H5C4.44772 11 4 11.4477 4 12C4 12.5128 4.38604 12.9355 4.88338 12.9933L5 13H16.585L13.2929 16.2929C12.9324 16.6534 12.9047 17.2206 13.2097 17.6129L13.2929 17.7071C13.6534 18.0676 14.2206 18.0953 14.6129 17.7903L14.7071 17.7071L19.7071 12.7071C20.0676 12.3466 20.0953 11.7794 19.7903 11.3871Z" 
				
					fill="#767675"
				/>
			</svg>
		</div>
		<Input 
			class="selector__input2"
			v-model="group"
			placeholder="Отдел"
			:state="props.error[1] ? 'error' : COURSE_SELECTOR_CONFIG[props.state].state"
			:isPassword="false"
		/>
		<Button 
			@clicked="emit('clicked', {
				status: props.state == 'passive' ? 'delete' : 'create',
				course: course,
				group: group,
				id: props.id
			})"
			class="selector__button"
			:text="COURSE_SELECTOR_CONFIG[props.state].buttonText"
			:state="COURSE_SELECTOR_CONFIG[props.state].buttonState"
		/>
	</div>
</template>

<style scoped lang="scss">
	@use '../app//styles/palette.scss' as *;

	.selector{
		width: fit-content;
		height: fit-content;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;

		&__input1{
			width: 200px;
			--input-radius: 14px 0 0 14px;
		}

		&__devider{
			width: 50px;
			height: 50px;

			display: flex;
			justify-content: center;
			align-items: center;

			border-top: 1px solid transparent;
			border-bottom: 1px solid transparent;
			border-color: var(--color-border);
			
			background-color: var(--color-background-tertiary);
			color: var(--color-text-primary);
		}

		&__input2{
			width: 200px;
			--input-radius: 0;
		}

		&__button{
			--button-height: 50px;
			--button-radius: 0 14px 14px 0;
			font-size: 14px;
			background-color: var(--color-text-primary);
			color: var(--color-background-tertiary);
		}
	}

	.selector--passive{
		.selector__input1{
			--input-color-disabled: var(--color-text-primary);
			--input-bgcolor-disabled: var(--color-background);
		}

		.selector__input2{
			--input-color-disabled: var(--color-text-primary);
			--input-bgcolor-disabled: var(--color-background);
		}
	}

	.selector--loading{
		.selector__button{
			background-color: $color-label;
			color: $color-background;
			box-shadow: 0 6px 12px 0 rgba($color-label, 0.35);
			cursor: default;
		}
	}
</style>
