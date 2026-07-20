import type { AlertOptions, AlertState } from "./type";

export const ANIM_DUR_CONFIG = 500;
export const TEMP_DUR_CONFIG = 4000;

export const DEFAULT_STATE_ALERT_CONFIG: AlertState = {
	visible: false,
	isTemporary: true,

	state: 'info',
	header: '',
	description: '',
	buttons: [],
	cross: true,

	onNo: undefined,
	onOk: undefined,
	onCross: undefined
};

export type ErrorAlertMap = Partial<Record<number|'network'|'unknown', AlertOptions>>;

export const UNKNOWN_ERROR: AlertOptions = {
	state: 'danger',
	header: 'Ошибка',
	description: 'Произошла неизвестная ошибка',
};

export const ERROR_ALERT: ErrorAlertMap = {
	401: {
		state: 'warning',
		header: 'Сессия истекла',
		description: 'Войдите в систему повторно',
	},
	403: {
		state: 'danger',
		header: 'Отказано в доступе',
		description: 'У вас недостаточно прав',
	},
	404: {
		state: 'info',
		header: 'Не найдено',
		description: 'Запрашиваемые данные не найдены',
	},
	500: {
		state: 'danger',
		header: 'Ошибка сервера',
		description: 'Попробуйте позже',
	},
	network: {
		state: 'danger',
		header: 'Ошибка соединения',
		description: 'Не удалось подключиться к серверу',
	}
};
