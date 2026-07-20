import { ERROR_ALERT, type ErrorAlertMap } from "../alert/config";

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
}

export const LOGIN_ALERTS: ErrorAlertMap = {
	...ERROR_ALERT,
	400: {
		state: "danger",
		header: "Неверный формат данных",
		description: ""
	},
	401: {
		state: "danger",
		header: "Ошибка аутентификации",
		description: "Неверен логин или Пароль"
	},
	429: {
		state: "danger",
		header: "Ваша учетная запись заблокирована",
		description: "Было осуществлено слишком много попыток. Для разблокировки обратитесь к админу"
	}
};
