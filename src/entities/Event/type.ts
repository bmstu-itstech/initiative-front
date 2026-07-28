import type { TableMapperType } from "@/features/filterTable/type";

export interface EventAPI {
	id: number,
	name: string,
	description: string,
	dataIn: string,
	dataOut: string,
	places: string[] | null,
	organizers: number[] | null
}

export interface OrganizerAPI {
	userId: number,
	roleId: number,
	eventId: number
}

export interface RoleAPI {
	id: number,
	title: string
}
//-----------------------------------
export type EventBlockType = {
	key: string,
	name: string,
	description: string,
	dataIn: string,
	dataOut: string,
	places: string[] | null,

	userName: string,
	roles: string[] | null
};

export type EventTableRowType = {
	"ID": number,
	"Название": string,
	"Описание": string,
	"Масштаб организации": number,
	"Даты проведения": string,
	"Страница мероприятия": string
}
export type EventTableType = EventTableRowType[];
export const EventTableMapper: TableMapperType = {
	"ID": 'number',
	"Название": 'text',
	"Описание": 'text',
	"Масштаб организации": 'number',
	"Даты проведения": 'date',
	"Страница мероприятия": 'except'
}
