import type { MembershipType, UserProfileSourceInterface } from "@/entities/UserProfile/type";
import type { LeadershipDraft, MembershipDraft, UserEditorDraft } from "./type";
import type { UserProfileInterface } from "@/entities/UserProfile/type";
import type { createUserRequest, updateUserRequest } from "@/entities/User/type";

function normolizeID(id: number): number|null {
	return id === -1 ? null : id;
}

function Membership2Draft(member: MembershipType): MembershipDraft{
	return {
		key: crypto.randomUUID(),
		type: 'membership',
		course: member.course,
		courseId: normolizeID(member.courseId),
		group: member.group,
		groupId: normolizeID(member.groupId),
	}
}

function Leadership2Draft(leader: MembershipType): LeadershipDraft{
	return {
		key: crypto.randomUUID(),
		type: 'leadership',
		appointmentId: leader.id >= 0 ? leader.id : null,
		position: leader.position ?? 'Руководитель',
		course: leader.course,
		courseId: normolizeID(leader.courseId),
		group: leader.group,
		groupId: normolizeID(leader.groupId),
	}
}

export function UserProfile2Draft(
	user: UserProfileInterface,
	leaders: MembershipType[]
): UserEditorDraft {
	return {
		userId: user.id > 0 ? user.id : null,

		fields: {
			firstName: user.firstName,
			secondName: user.secondName,
			surName: user.surName,
			group: user.group,
			contact: user.contact,
			birthday: user.birthday,
			entryday: user.entryday,
		},

		memberships: user.membership
			.filter((member)=>!member.isHead)
			.map(Membership2Draft),

		leaderships: leaders
			.filter((leader)=>leader.isHead)
			.map(Leadership2Draft),
	}
}

function mapMemberships(draft: UserEditorDraft) {
	return draft.memberships.map((item)=>{
		if(item.courseId == null || item.groupId == null)
			throw new Error('Членство заполнено не полностью');
		return item.groupId;
	})
}

export function draft2updateUserRequest(draft: UserEditorDraft): updateUserRequest{
	if(draft.userId == null)
		throw new Error('У пользователя отсутствует ID');

	return {
		"first_name": draft.fields.firstName,
		"last_name": draft.fields.secondName,
		"telegram": draft.fields.surName,
		"patronymic": draft.fields.surName,
		"group": draft.fields.group,
		"birth_date": draft.fields.birthday,
		"department_ids": mapMemberships(draft)
	};
}

export function draft2createUserRequest(draft: UserEditorDraft): createUserRequest{
	return {
		"first_name": draft.fields.firstName,
		"last_name": draft.fields.secondName,
		"telegram": draft.fields.surName,
		"patronymic": draft.fields.surName,
		"group": draft.fields.group,
		"birth_date": draft.fields.birthday,
		"department_ids": mapMemberships(draft)
	};
}
