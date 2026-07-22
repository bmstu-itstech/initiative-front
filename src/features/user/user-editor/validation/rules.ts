import type { UserFieldErrorType, UserFieldValidationRuleType } from "./type";

function createError(
	header: string,
	description: string
): UserFieldErrorType{
	return {
		state: 'danger',
		header,
		description
	}
}

export function required(
	header: string,
	description: string
): UserFieldValidationRuleType {
	return (value)=>value.trim() ? null : createError(header, description);
}

export function maxLength(
	max: number,
	header: string,
	description: string
): UserFieldValidationRuleType {
	return (value)=>value.length<=max ? null : createError(header, description);
}

export function pattern(
	regex: RegExp,
	header: string,
	description: string
): UserFieldValidationRuleType {
	return (value)=>regex.test(value) ? null : createError(header, description);
}

export function isoDate(
	header: string,
	description: string,
	allowEmpty = false
): UserFieldValidationRuleType {
	return (value) => {
		if (!value) {
			return allowEmpty
				? null
				: createError(header, description);
		}

		const match =
			/^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);

		if (!match)
			return createError(header, description);

		const year = Number(match[1]);
		const month = Number(match[2]);
		const day = Number(match[3]);

		const date = new Date(
			Date.UTC(year, month - 1, day)
		);

		const valid =
			date.getUTCFullYear() === year &&
			date.getUTCMonth() === month - 1 &&
			date.getUTCDate() === day;

		return valid
			? null
			: createError(header, description);
	};
}
