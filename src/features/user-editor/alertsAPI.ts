import { ERROR_ALERT, UNKNOWN_ERROR, type ErrorAlertMap } from "@/features/alert/config";
import type { AlertOptions } from "@/features/alert/type";
import type { OPTION_METHOD } from "@/shared/api/type";


export class ApiLeadershipError extends Error {
	public alert: AlertOptions;
	constructor(
		public status: number,
		public type: OPTION_METHOD
	){
		super()
		this.alert = UNKNOWN_ERROR;
		const mapper = LEADERSHIP_ERROR_ALERT[type];
		if(mapper != undefined)
			this.alert = mapper[status] ?? UNKNOWN_ERROR;
	}
}

export const GET_USER_ERROR_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	404: {
		state: 'danger',
		header: 'Данные не найдены',
		description: 'Пользователь с таким идентификатором не существует'
	}
}
export const DELETE_USER_ERROR_ALERT: ErrorAlertMap = GET_USER_ERROR_ALERT;

export const PUT_USER_ERROR_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	400: {
		state: 'danger',
		header: 'Неизвестная ошибка валидации',
		description: 'Десинхронизация верификационных данных с сервером. Форма не удоволтеворяет добавленным правилам'
	},
	404: {
		state: 'danger',
		header: 'Нарушение атомарности',
		description: 'Данный пользователь был удален'
	},
	409: {
		state: 'danger',
		header: 'Конфликт данных',
		description: 'Логическая ошибка выбора дат'
	}
}

export const POST_USER_ERROR_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	400: {
		state: 'danger',
		header: 'Неизвестная ошибка валидации',
		description: 'Десинхронизация верификационных данных с сервером. Форма не удоволтеворяет добавленным правилам'
	},
	409: {
		state: 'danger',
		header: 'Конфликт данных',
		description: 'Логическая ошибка выбора дат'
	}
}

//LEADERSHIP ERRORS
const PUT_LEADERSHIP_ERROR_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	400: {
		state: 'danger',
		header: 'Неизвестная ошибка изменения назначения',
		description: 'Десинхронизация данных с сервером. Форма не удоволтеворяет добавленным правилам'
	},
	404: {
		state: 'danger',
		header: 'Нарушение атомарности',
		description: 'Данное назначение уже было снято'
	},
	409: {
		state: 'danger',
		header: 'Конфликт данных',
		description: 'Данная должность уже занята'
	}
}
const POST_LEADERSHIP_ERROR_ALERT: ErrorAlertMap = {
	...PUT_LEADERSHIP_ERROR_ALERT,
	400: {
		state: 'danger',
		header: 'Неизвестная ошибка изменения назначения',
		description: 'Десинхронизация данных с сервером. Форма не удоволтеворяет добавленным правилам'
	}
}

const DELETE_LEADERSHIP_ERROR_ALERT: ErrorAlertMap = {
	...ERROR_ALERT,
	404: PUT_LEADERSHIP_ERROR_ALERT[404]
}

export const LEADERSHIP_ERROR_ALERT: Partial<Record<OPTION_METHOD, ErrorAlertMap>> = {
	'PUT': PUT_LEADERSHIP_ERROR_ALERT,
	'POST': POST_LEADERSHIP_ERROR_ALERT,
	'DELETE': DELETE_LEADERSHIP_ERROR_ALERT
}
