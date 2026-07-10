export type PeopleTableRow = {
	'ID': number,
	'ФИО': string,
	'Группа': string,
	'Контакт': string,
	'Дата рождения': string,
	'Дата вступления': string,
	'Личная страница': string,
};
export type PeopleTableData = Record<string, PeopleTableRow>;
