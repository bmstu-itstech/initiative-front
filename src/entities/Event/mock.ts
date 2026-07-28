import type { EventBlockType } from "./type";

export const EVENT_BLOCKS_MOCK: EventBlockType[] = [
	{
		key: crypto.randomUUID(),
		name: 'Мероприятие №1',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		dataIn: '22.07.2026',
		dataOut: '23.07.2026',
		places: ['ул.Бауманская, д5с3', 'ул.Бауманская, д5с3'],
		userName: 'Юдин Д.А.',
		roles: ['организатор', 'ответственный']
	},
	{
		key: crypto.randomUUID(),
		name: 'Мероприятие №2',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		dataIn: '23.07.2026',
		dataOut: '23.07.2026',
		places: ['ул.Бауманская, д5с2', 'ул.Бауманская, д5с3', 'ул.Бауманская, д5с4'],
		userName: 'Юдин Д.А.',
		roles: ['организатор', 'ответственный', 'глав.Орг']
	}
];

export const EVENTS_TABLE_MOCK = [
	{
		"ID": 1,
		"Название": 'Мероприятие №1',
		"Описание": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		"Масштаб организации": 12,
		"Даты проведения": '30.07.2026',
		"Страница мероприятия": 'Перейти'
	},
	{
		"ID": 2,
		"Название": 'Мероприятие №2',
		"Описание": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		"Масштаб организации": 2,
		"Даты проведения": '29.06.2026 - 26.07.2026',
		"Страница мероприятия": 'Перейти'
	}
];
