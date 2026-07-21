import { date_mapper, DEFAULT_DATE_HINT, type DateHint } from "./config";

export function getArrayYear(amount: number): string[]{
	let res: string[] = [];
	let year: number = Number(new Date().getFullYear());
	for(let i=0;i<amount;i++)
		res.push(String(year - i));
	return res;
}

export function getArrayDays(year: number, month: number): string[] {
	let res: string[] = [];
	let amount = new Date(year, month+1, 0).getDate();
	for(let i=1;i<=amount;i++)
		res.push(String(i));
	return res;
}

export function date2hint(value: string): DateHint {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

	if (!match)
		return { ...DEFAULT_DATE_HINT };

	const [, yearString, monthString, dayString] = match;

	const year = Number(yearString);
	const month = Number(monthString);
	const day = Number(dayString);

	if (
		!Number.isInteger(year) ||
		!Number.isInteger(month) ||
		!Number.isInteger(day) ||
		month < 1 ||
		month > 12 ||
		day < 1 ||
		day > 31
	) {
		return { ...DEFAULT_DATE_HINT };
	}

	const date = new Date(year, month - 1, day);

	const isValidDate =
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day;

	if (!isValidDate)
		return { ...DEFAULT_DATE_HINT };

	return {
		year: yearString ?? '2026',
		month: Object.keys(date_mapper)[month - 1] ?? 'Январь',
		day: String(day)
	};
}
