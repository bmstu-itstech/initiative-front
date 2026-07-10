import IconCircle from '@/shared/assets/icons/Tree circle.svg?component';
import IconArrow from '@/shared/assets/icons/Tree arrow.svg?component';

import type { DropDownMenuType } from '../types/types';
import type { Component } from 'vue';

export const DROP_DOWN_MENU_CONFIG = {
	'endpoint': {
		icon: IconCircle
	},
	'course': {
		icon: IconArrow
	},
	'group': {
		icon: IconArrow
	},
	'user': {
		icon: undefined
	}

} satisfies Record<
	DropDownMenuType,
	{
		icon?: Component
	}
>
