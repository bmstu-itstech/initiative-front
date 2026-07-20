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
