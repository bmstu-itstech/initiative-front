import type { InputConfigType, UserProfileInterface } from "@/entities/UserProfile/type";
import type { InputType } from "@/shared/types/types";
import type { AlertOptions } from "../alert/type";
import type { LeaderJournalType } from "./type";

export const USER_PROFILE_INPUT_CONFIG: InputConfigType[] = [
	{
		id: 0,
		field: 'group',
		header: 'Группа'
	},
	{
		id: 1,
		field: 'firstName',
		header: 'Имя'
	},
	{
		id: 2,
		field: 'contact',
		header: 'Контактные данные'
	},
	{
		id: 3,
		field: 'secondName',
		header: 'Фамилия'
	},
	{
		id: 5,
		field: 'surName',
		header: 'Отчество'
	},
];

export const USER_PROFILE_DATE_INPUT_CONFIG: InputConfigType[] = [
	{
		id: 4,
		field: 'birthday',
		header: 'Дата рождения'
	},
	{
		id: 6,
		field: 'entryday',
		header: 'Дата вступления'
	}
];

export const UserProfileInputStates: Record<string, InputType> = {
	'0': 'disabled',
	'1': 'disabled',
	'2': 'disabled',
	'3': 'disabled',
	'4': 'disabled',
	'5': 'disabled',
	'6': 'disabled'
};

export const USER_PLACEHOLDERS: UserProfileInterface = {
	id: 0,
	firstName: "Имя",
	secondName: "Фамилия",
	surName: "Отчество",
	group: "Группа",
	contact: "Контактные данные",
	birthday: "Дата рождения",
	entryday: "Дата вступления",
	membership: []
}

export const DOWNLOAD_ERROR: AlertOptions = {
	state: 'danger',
	header: 'Ошибка сети',
	description: 'Не удалось загрузить членство в организации'
};

export function createLeaderJournal():LeaderJournalType {
	return {
		'create': [],
		'delete': [],
		'update': []
	};
}
export const LEADER_ACTIONS = ['delete', 'update', 'create'] as const;
