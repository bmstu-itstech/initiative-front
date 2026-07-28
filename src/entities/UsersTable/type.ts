import type { TableMapperType } from "@/features/filterTable/type";

export type PeopleTableRow = {
	'ID': number,
	'ФИО': string,
	'Группа': string,
	'Контакт': string,
	'Дата рождения': string,
	'Дата вступления': string,
	'Личная страница': string,
};
export type PeopleTableData = PeopleTableRow[];

export type DateColumn =
	| 'Дата рождения'
	| 'Дата вступления';

export const PeopleTableMapper: TableMapperType = {
	'ID': 'number',
	'ФИО': 'text',
	'Группа': 'text',
	'Контакт': 'text',
	'Дата рождения': 'date',
	'Дата вступления': 'date',
	'Личная страница': 'text',
}
