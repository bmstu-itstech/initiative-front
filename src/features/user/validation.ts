import type { MembershipType, UserProfileInterface } from "@/entities/UserProfile/type";
import type { UserValidationMsg, UserValidationRow, UserValidationStructureType } from "./type";


const createValidationMessage = (
	inputId: number,
	header: string,
	description: string
): UserValidationMsg => ({
	inputId,
	errorSelector: null,
	alert: {
		state: 'danger',
		header,
		description
	}
});

export const USER_VALIDATION_FIRST_NAME: UserValidationRow[] = [
	{
		[/\S/u.source]: createValidationMessage(
			1,
			'Имя не указано',
			'Введите имя.'
		)
	},
	{
		[/^.{0,64}$/u.source]: createValidationMessage(
			1,
			'Слишком длинное имя',
			'Имя должно содержать не более 64 символов.'
		)
	},
	{
		[/^[А-ЯЁа-яёA-Za-z -]*$/u.source]: createValidationMessage(
			1,
			'Некорректное имя',
			'Имя может содержать только буквы, пробелы и дефисы.'
		)
	}
];


export const USER_VALIDATION_SECOND_NAME: UserValidationRow[] = [
	{
		[/\S/u.source]: createValidationMessage(
			3,
			'Фамилия не указана',
			'Введите фамилию.'
		)
	},
	{
		[/^.{0,64}$/u.source]: createValidationMessage(
			3,
			'Слишком длинная фамилия',
			'Фамилия должна содержать не более 64 символов.'
		)
	},
	{
		[/^[А-ЯЁа-яёA-Za-z -]*$/u.source]: createValidationMessage(
			3,
			'Некорректная фамилия',
			'Фамилия может содержать только буквы, пробелы и дефисы.'
		)
	}
];


export const USER_VALIDATION_SURNAME: UserValidationRow[] = [
	{
		[/^.{0,64}$/u.source]: createValidationMessage(
			5,
			'Слишком длинное отчество',
			'Отчество должно содержать не более 64 символов.'
		)
	},
	{
		[/^[А-ЯЁа-яёA-Za-z -]*$/u.source]: createValidationMessage(
			5,
			'Некорректное отчество',
			'Отчество может содержать только буквы, пробелы и дефисы.'
		)
	}
];


export const USER_VALIDATION_GROUP: UserValidationRow[] = [
	{
		[/^.{0,32}$/u.source]: createValidationMessage(
			0,
			'Слишком длинное название группы',
			'Название группы должно содержать не более 32 символов.'
		)
	},
	{
		[
			/^(?:$|((((ИУ|ИБМ|МТ|СМ|БМТ|РЛ|Э|РК|ФН|Л|СГН|РКТ|АК|ПС|РТ|ЛТ|К|ЮР)[1-9]\d?)|(ЮР(\.ДК)?))(К)?[ИЦ]?-(((1[0-2])|(\d))((\d)|(\.\d\d+))([АМБ]?(В)?))))$/u.source
		]: createValidationMessage(
			0,
			'Некорректная группа',
			'Введите группу в корректном формате, например ИУ3-63Б.'
		)
	}
];


export const USER_VALIDATION_CONTACT: UserValidationRow[] = [
	{
		[/\S/u.source]: createValidationMessage(
			2,
			'Telegram не указан',
			'Введите Telegram-ник.'
		)
	},
	{
		[/^.{5,}$/u.source]: createValidationMessage(
			2,
			'Слишком короткий Telegram-ник',
			'Telegram-ник должен содержать не менее 5 символов.'
		)
	},
	{
		[/^.{0,32}$/u.source]: createValidationMessage(
			2,
			'Слишком длинный Telegram-ник',
			'Telegram-ник должен содержать не более 32 символов.'
		)
	},
	{
		[/^[A-Za-z0-9_]*$/u.source]: createValidationMessage(
			2,
			'Некорректный Telegram-ник',
			'Используйте только латинские буквы, цифры и нижнее подчёркивание. Символ @ вводить не нужно.'
		)
	}
];


export const USER_VALIDATION_BIRTHDATE: UserValidationRow[] = [
	{
		[/^(?:-$|\d{4}-\d{2}-\d{2})$/u.source]: createValidationMessage(
			4,
			'Некорректный формат даты рождения',
			'Введите дату в формате ДД.ММ.ГГГГ.'
		)
	}
];

export const USER_VALIDATION_ENTRYDATE: UserValidationRow[] = [
	{
		[/^(?:-$|\d{4}-\d{2}-\d{2})$/u.source]: createValidationMessage(
			6,
			'Некорректный формат даты вступления',
			'Введите дату в формате ДД.ММ.ГГГГ.'
		)
	}
];

const UserValidationStructure: UserValidationStructureType = {
	'firstName': USER_VALIDATION_FIRST_NAME,
	'secondName': USER_VALIDATION_SECOND_NAME,
	'surName': USER_VALIDATION_SURNAME,
	'group': USER_VALIDATION_GROUP,
	'contact': USER_VALIDATION_CONTACT,
	'birthday': USER_VALIDATION_BIRTHDATE,
	'entryday': USER_VALIDATION_ENTRYDATE,
}

export function userFormValidator(form: UserProfileInterface): UserValidationMsg|null{
	const fields = Object.entries(form) as [
		keyof UserProfileInterface,
		UserProfileInterface[keyof UserProfileInterface]
	][];
	for(const [key, value] of fields){
		if(key == 'id' || key=='membership')
			continue;
		const rules = UserValidationStructure[key];
		
		for(const rule of rules){
			const entry = Object.entries(rule)[0];
			if(!entry)
				continue;
			const [regexSource, message] = entry;
			const regex = RegExp(regexSource, 'u');
			if(!regex.test(String(value)))
				return message
		}
	}

	return userMembershipValidator(form.membership);
}


type MembershipValidationType = {
	case: Partial<MembershipType>,
	msg: UserValidationMsg
}

const MembershipValidationStructure: MembershipValidationType[] = [
	{
		case: {
			isHead: true,
			course: ''
		},
		msg: {...createValidationMessage(
			0,
			'Введены некорректные данные',
			'Заполните все поля'
		), errorSelector: [true, true]}
	},
	{
		case: {
			isHead: false,
			courseId: -1,
			groupId: -1
		},
		msg: {...createValidationMessage(
			0,
			'Введены некорректные данные',
			'Заполните все поля'
		), errorSelector: [true, true]}
	},
	{
		case: {
			isHead: false,
			groupId: -1
		},
		msg: {...createValidationMessage(
			0,
			'Введены некорректные данные',
			'Заполните поле отдела'
		), errorSelector: [false, true]}
	},
];

export function userMembershipValidator(appointments: MembershipType[]): UserValidationMsg|null{
	for(const appointment of appointments){
		for(const rule of MembershipValidationStructure){
			const ertries = Object.entries(rule.case) as [
				keyof MembershipType,
				MembershipType[keyof MembershipType]
			][];
			const res = ertries.every(([key, value])=>{
				return appointment[key] == value;
			});
			if(res)
				return {...rule.msg, inputId: appointment.id};
		}
	}
	return null;
}
