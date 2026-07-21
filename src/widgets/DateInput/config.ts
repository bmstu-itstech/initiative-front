import { getArrayYear } from "./lib";

export const date_mapper: Record<string, number> = {
	'Январь': 0, 
	'Февраль': 1, 
	'Март': 2, 
	'Апрель': 3, 
	'Май': 4, 
	'Июнь': 5, 
	'Июль': 6, 
	'Август': 7, 
	'Сентябрь': 8, 
	'Октябрь': 9, 
	'Ноябрь': 10, 
	'Декабрь': 11
} as const;

export const DATE_INPUT_HEADERS_CONFIG = ['Год', 'Месяц', 'День'];
export const DATE_INPUT_YEARS_CONFIG = getArrayYear(100);
export const DATE_INPUT_MONTHS_CONFIG = Object.keys(date_mapper);

const DATE_INPUT_GRID_YEAR = [1, 1, 1, 1, 1];
const DATE_INPUT_GRID_MONTH = [1, 1, 1, 1];
const DATE_INPUT_GRID_DAY = [1, 1, 1, 1, 1, 1, 1];
export const DATE_INPUT_GRID = [
	DATE_INPUT_GRID_YEAR,
	DATE_INPUT_GRID_MONTH,
	DATE_INPUT_GRID_DAY
];

export type MonthName = keyof typeof date_mapper;

export interface DateHint {
	year: string;
	month: MonthName;
	day: string;
}

export const DEFAULT_DATE_HINT: DateHint = {
	year: '2026',
	month: 'Январь',
	day: '1'
};
