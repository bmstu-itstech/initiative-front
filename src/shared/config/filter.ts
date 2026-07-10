import type { Component } from "vue";
import type { FilterButtonClassType } from "../types/types";

import IconUser from '@/shared/assets/icons/filter/User.svg?component';
import IconGroup from '@/shared/assets/icons/filter/Groups.svg?component';
import IconCourse from '@/shared/assets/icons/filter/Course.svg?component';

type FilterConfigItem = {
	id: number
	icon?: Component
	text: string
}

export const FILTER_CONFIG: Record<FilterButtonClassType, FilterConfigItem> = {
	'user': {
		id: 0,
		icon: IconUser,
		text: 'Активист'
	},
	'group': {
		id: 1,
		icon: IconGroup,
		text: 'Отдел'
	},
	'course': {
		id: 2,
		icon: IconCourse,
		text: 'Направление'
	},
	'none': {
		id: 3,
		text: 'Без фильтра'
	}
} satisfies Record<
	FilterButtonClassType,
	{
		id: number,
		icon?: Component,
		text: string
	}
>
