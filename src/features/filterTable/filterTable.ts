import type { DateColumn, PeopleTableData, PeopleTableRow } from "@/entities/UsersTable/type";


const dateColumns: DateColumn[] = [
	'Дата рождения',
	'Дата вступления'
];

function getData(row: PeopleTableRow): string{
	return Object.entries(row)
	.filter(([key])=>key!='Личная страница')
	.map(([, value])=>String(value))
	.join(' ')
	.toLowerCase();
}

export function filterTable(search: string, data: PeopleTableData): PeopleTableData{
	const normalizedSearch = search
		.trim()
		.toLowerCase();

	if (!normalizedSearch)
		return data;

	const targets = normalizedSearch.split(/\s+/);

	return data.filter((row) => {
		const rowData = getData(row);

		return targets.every((target) =>
			rowData.includes(target)
		);
	});
}

function parseDate(value: string): number {
	const [year, month, day] = value.split('-').map(Number);
	if(year == undefined || month==undefined)
		return 0;
	return new Date(year, month-1, day).getTime();
}

export function filterColumn(
	columnName: keyof PeopleTableRow,
	data: PeopleTableData,
	direction: 'asc' | 'desc'
): PeopleTableData {
	return [...data].sort((row1, row2) => {
		const value1 = row1[columnName];
		const value2 = row2[columnName];

		let result: number;
		if(columnName === 'ID')
			result = Number(value1) - Number(value2);
		else if(dateColumns.includes(columnName as DateColumn))
			result = parseDate(String(value1)) - parseDate(String(value2));
		else
			result = String(value1).localeCompare(
					String(value2),
					'ru',
					{
						numeric: true,
						sensitivity: 'base'
					}
				);

		return direction === 'asc'
			? result
			: -result;
	});
}
