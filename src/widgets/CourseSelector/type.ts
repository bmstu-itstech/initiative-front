export type SelectorTreeCourse = {
	id: number,
	groups: Record<string, number>
};

export type SelectorTree = Record<string, SelectorTreeCourse>;

export type SelectorIDs = {
	courseId: number,
	groupId: number
}

export interface CourseSelectorValueType {
	courseId: number|null;
	course: string;
	groupId: number|null;
	group: string;
}

export type CourseSelectorVariant =
	| 'membership'
	| 'leadership';
