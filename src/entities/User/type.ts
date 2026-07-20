import { ERROR_ALERT, type ErrorAlertMap } from "@/features/alert/config";
import type { departamentAPI } from "../Group/type"

export type UserAPI = {
	"id": number,
	"first_name": string,
	"last_name": string,
	"telegram": string,
	"join_date": string,
	"patronymic": string|null,
	"group": string|null,
	"birth_date": string|null,
	"departments": departamentAPI[]
}

export interface updateUserRequest {
	"first_name": string,
	"last_name": string,
	"telegram": string,
	"patronymic": string|null,
	"group": string|null,
	"birth_date": string|null,
	"department_ids": number[]
}
export interface updateUserResponse extends UserAPI {}

export interface createUserRequest extends updateUserRequest {}
export interface createUserResponse extends UserAPI {}

export type getUsersResponse = UserAPI[];

export const UPDATE_USER_ALERTS: ErrorAlertMap = {
	...ERROR_ALERT,
	200: {
		state: 'success',
		header: 'Успешно',
		description: 'Данные обновлены на сервере'
	},
	400: {
		state: 'danger',
		header: 'Неверный формат данных',
		description: ''
	},
	404: {
		state: 'danger',
		header: 'Пользователь не найден',
		description: ''
	},
	409: {
		state: 'danger',
		header: 'Конфликт данных',
		description: 'Логическая ошибка заполнения данных'
	}
};
