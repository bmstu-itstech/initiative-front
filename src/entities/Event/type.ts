export interface EventInterface {
	id: number,
	name: string,
	description: string,
	dataIn: string,
	dataOut: string,
	places: string[] | null,
	organizers: number[] | null
}

export interface OrganizerInterface {
	userId: number,
	roleId: number,
	eventId: number
}

export interface RoleInterface {
	id: number,
	title: string
}

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
