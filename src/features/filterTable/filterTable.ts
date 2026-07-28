import type { TableMapperType, TableRowType, TableType } from "./type";


function getData(row: TableRowType, except: string[]): string {
	return Object.entries(row)
		.filter(([key]) => !except.includes(key))
		.map(([, value]) => String(value))
		.join(' ')
		.toLowerCase();
}

export function filterTable(search: string, data: TableType, mapper: TableMapperType): TableType {
	const normalizedSearch = search
		.trim()
		.toLowerCase();

	if (!normalizedSearch)
		return data;

	const targets = normalizedSearch.split(/\s+/);

	const except = Object.entries(mapper)
		.filter(([_, value]) => value == 'except')
		.map(([key, _]) => key);

	return data.filter((row) => {
		const rowData = getData(row, except);

		return targets.every((target) =>
			rowData.includes(target)
		);
	});
}

function parseDate(value: string): number {
	const [year, month, day] = value.split('-').map(Number);
	if (year == undefined || month == undefined)
		return 0;
	return new Date(year, month - 1, day).getTime();
}

export function filterColumn(
	columnName: string,
	data: TableType,
	direction: 'asc' | 'desc',
	mapper: TableMapperType,
	parser: (value: string) => number = parseDate
): TableType {
	return [...data].sort((row1, row2) => {
		const value1 = row1[columnName];
		const value2 = row2[columnName];

		let result: number;
		if (mapper[columnName] == 'number')
			result = Number(value1) - Number(value2);
		else if (mapper[columnName] == 'date')
			result = parser(String(value1)) - parser(String(value2));
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
