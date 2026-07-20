import type { CourseSelectorType } from "@/shared/types/types";

export interface UserProfileInterface {
	id: number,
	firstName: string,
	secondName: string,
	surName: string,
	group: string,
	contact: string,
	birthday: string,
	entryday: string,
	membership: MembershipType[]
};

export type MembershipType = {
	id: number,
	isHead: boolean,
	position?: string,
	course: string,
	courseId: number,
	group: string,
	groupId: number
};

export type UserProfileTextFieldKey = Exclude<
  	keyof UserProfileInterface,
  	'id' | 'membership'
>

export type InputConfigType = {
	id: number,
	field: UserProfileTextFieldKey,
	header: string
};

export type UserProfileSelectorStateType = {
	state: CourseSelectorType,
	error: boolean[]
}
