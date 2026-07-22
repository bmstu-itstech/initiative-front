import type { InputFieldType } from "@/shared/types/types";
import type { UserFieldsDraft } from "../type";

export type UserFieldType = keyof UserFieldsDraft;

export type UserFieldConfigType = {
	field: UserFieldType,
	header: string,
	placeholder: string,
	type: InputFieldType
}

export const USER_FIELD_SCHEMA = [
	{
		type: 'text',
		field: 'group',
		header: 'Группа',
		placeholder: 'Введите группу'
	},
	{
		type: 'text',
		field: 'firstName',
		header: 'Имя',
		placeholder: 'Введите имя'
	},
	{
		type: 'text',
		field: 'contact',
		header: 'Контактные данные',
		placeholder: 'Введите контактные данные'
	},
	{
		type: 'text',
		field: 'secondName',
		header: 'Фамилия',
		placeholder: 'Введите фамилию'
	},
	{
		type: 'date',
		field: 'birthday',
		header: 'Дата рождения',
		placeholder: 'Выберите дату рождения'
	},
	{
		type: 'text',
		field: 'surName',
		header: 'Отчество',
		placeholder: 'Введите отчество'
	},
	{
		type: 'date',
		field: 'entryday',
		header: 'Дата вступления',
		placeholder: 'Выберите дату вступления'
	}
] as const satisfies readonly UserFieldConfigType[];
