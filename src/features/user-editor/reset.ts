import type { LeadershipDraft, MembershipDraft, UserEditorDraft } from "./type";

export function resetUserDraft(): UserEditorDraft {
	return {
		userId: null,

		fields: {
			firstName: "",
			secondName: "",
			surName: "",
			group: "",
			contact: "",
			birthday: "",
			entryday: "",
		},
		memberships: [],
		leaderships: []
	}
}

export function resetMembership(): MembershipDraft {
	return {
		key: crypto.randomUUID(),
		type: 'membership',
		courseId: null,
		course: '',
		groupId: null,
		group: ''
	}
}

export function resetLeadership(): LeadershipDraft {
	return {
		key: crypto.randomUUID(),
		type: 'leadership',
		appointmentId: null,
		position: 'Руководитель',
		courseId: null,
		course: '',
		groupId: null,
		group: ''
	}
}
