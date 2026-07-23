import type { AlertOptions } from "@/features/alert/type";
import type { UserFieldType } from "../fields/config";
import type { UserFieldsDraft } from "../type";

export type UserFieldErrorType = Pick<
	AlertOptions,
	'state'|'header'|'description'
>;

export type UserFieldErrorMapType = Partial<
	Record<
		UserFieldType,
		UserFieldErrorType
	>
>;

export type UserFieldValidationRuleType = (
	value: string,
	form: UserFieldsDraft
)=>UserFieldErrorType|null;
