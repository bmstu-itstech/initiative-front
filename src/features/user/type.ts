import type { UserProfileInterface } from "@/entities/UserProfile/type";
import { ERROR_ALERT, type ErrorAlertMap } from "../alert/config";
import type { AlertOptions } from "../alert/type";

export type MembershipStatusType = 'create'|'delete'|'update';
export type LeaderJournalType = Record<MembershipStatusType, number[]>

export type UserValidationMsg = {
	alert: AlertOptions,
	inputId: number,
	errorSelector: boolean[]|null
}
export type UserValidationRow = Record<string, UserValidationMsg>
export type UserValidationStructureType = Record<
	keyof Omit<UserProfileInterface, 'id' | 'membership'>, 
	UserValidationRow[]
>

export const GET_USER_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	404: {
		state: 'danger',
		header: 'Ничего не найдено',
		description: 'Данный пользователь не найден'
	}
};
