import DoorIcon from '../assets/icons/menu/Door.svg?url';
import SunIcon from '../assets/icons/menu/Sun.svg?url';
import PeopleIcon from '../assets/icons/menu/People.svg?url';
import StructureIcon from '../assets/icons/menu/Structure.svg?url';

import type { MenuButtonPositionType } from '../types/types';


export type MenuButtonType = {
	id: number,

	isActive: boolean,
	elongated: boolean,
	position: MenuButtonPositionType,

	icon: string,
	text: string,
	link: string | null
};

export const MENU_CONFIG: MenuButtonType[] = [
	{
		id: 0,

		isActive: false,
		elongated: false,
		position: 'top',

		icon: StructureIcon,
		text: 'Структура',
		link: 'structure'
	},
	{
		id: 1,

		isActive: false,
		elongated: false,
		position: 'top',

		icon: PeopleIcon,
		text: 'Активисты',
		link: 'people'
	},
	{
		id: 2,

		isActive: false,
		elongated: false,
		position: 'bottom',

		icon: SunIcon,
		text: 'Сменить цветовую тему',
		link: null
	},
	{
		id: 3,

		isActive: false,
		elongated: false,
		position: 'bottom',

		icon: DoorIcon,
		text: 'Выйти из аккаунта',
		link: null
	},
];
