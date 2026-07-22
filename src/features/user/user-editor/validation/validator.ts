import type { UserFieldType } from "../fields/config";
import type { UserFieldsDraft } from "../type";
import { USER_FIELD_RULES } from "./userRules";
import type { UserFieldErrorMapType, UserFieldErrorType } from "./type";

export function validateField(
	field: UserFieldType,
	form: UserFieldsDraft
): UserFieldErrorType | null {
	const value = form[field];
	const rules = USER_FIELD_RULES[field];
	for (const rule of rules) {
		const error = rule(value, form);
		if (error)
			return error;
	}
	return null;
}

export function validateFields(form: UserFieldsDraft): UserFieldErrorMapType {
	const errors: UserFieldErrorMapType = {};
	const fields = Object.keys(USER_FIELD_RULES) as UserFieldType[];
	for (const field of fields) {
		const error = validateField(field, form);
		if (error)
			errors[field] = error;
	}
	return errors;
}
