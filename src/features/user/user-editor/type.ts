export interface UserFieldsDraft {
	firstName: string;
	secondName: string;
	surName: string;
	group: string;
	contact: string;
	birthday: string;
	entryday: string;
}

export interface MembershipDraft {
	key: string;
	type: 'membership';
	courseId: number|null;
	course: string;
	groupId: number|null;
	group: string;
}

export interface LeadershipDraft {
	key: string;
	type: 'leadership';
	appointmentId: number|null;
	position: string;
	courseId: number|null;
	course: string;
	groupId: number|null;
	group: string;
}

export interface UserEditorDraft {
	userId: number|null;
	fields: UserFieldsDraft;
	memberships: MembershipDraft[];
	leaderships: LeadershipDraft[];
}

export type UserEditorMode = 
	| 'read'
	| 'update'
	| 'create';
