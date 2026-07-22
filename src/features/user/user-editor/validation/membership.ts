import type { MembershipDraft } from "../type";
import type { UserFieldErrorType } from "./type";

export interface MembershipItemErrors {
	course?: UserFieldErrorType;
	group?: UserFieldErrorType;
}

export type MembershipErrors = Record<
	string,
	MembershipItemErrors
>;

function createError(
	header: string,
	description: string
): UserFieldErrorType {
	return {
		state: 'danger',
		header,
		description
	};
}

export function validateMembership(
	item: MembershipDraft
): MembershipItemErrors {
	const errors: MembershipItemErrors = {};

	if (item.courseId === null) {
		errors.course = createError(
			'Направление не выбрано',
			'Выберите направление из списка'
		);
	}

	if (item.groupId === null) {
		errors.group = createError(
			'Отдел не выбран',
			'Выберите отдел из списка'
		);
	}

	return errors;
}

export function validateMembershipList(
	items: MembershipDraft[]
): MembershipErrors {
	const errors: MembershipErrors = {};

	for (const item of items) {
		const itemErrors = validateMembership(item);

		if (Object.keys(itemErrors).length > 0)
			errors[item.key] = itemErrors;
	}

	return errors;
}
