import type { LeadershipDraft } from "../type";
import type { UserFieldErrorType } from "./type";

export interface LeadershipItemErrors {
	course?: UserFieldErrorType;
	group?: UserFieldErrorType;
}

export type LeadershipErrors = Record<
	string,
	LeadershipItemErrors
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

export function validateLeadership(
	item: LeadershipDraft
): LeadershipItemErrors {
	const errors: LeadershipItemErrors = {};

	if (!item.course.trim()) {
		errors.course = createError(
			'Руководство не указано',
			'Выберите направление или введите название студенческого совета'
		);

		return errors;
	}

	if (
		item.courseId == null &&
		(item.group.trim() !== '' ||
			item.groupId !== null)
	) {
		errors.group = createError(
			'Отдел не используется',
			'Для студенческого совета отдел указывать не нужно'
		);
	}

	return errors;
}

export function validateLeadershipList(
	items: LeadershipDraft[]
): LeadershipErrors {
	const errors: LeadershipErrors = {};

	for (const item of items) {
		const itemErrors = validateLeadership(item);

		if (Object.keys(itemErrors).length > 0)
			errors[item.key] = itemErrors;
	}

	return errors;
}
