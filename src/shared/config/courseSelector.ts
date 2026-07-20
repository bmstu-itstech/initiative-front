import type { ButtonType, CourseSelectorType, InputType } from "../types/types";

export const COURSE_SELECTOR_CONFIG = {
	'active': {
		state: 'default',
		buttonText: 'Уволить',
		buttonState: 'tertiary'
	},
	'passive': {
		state: 'disabled',
		buttonText: 'Уволить',
		buttonState: 'disabled'
	},
	'loading': {
		state: 'loading',
		buttonText: 'Уволить',
		buttonState: 'disabled'
	}
} satisfies Record<
	CourseSelectorType, 
	{
		state: InputType,
		buttonText: string,
		buttonState: ButtonType
	}
>
