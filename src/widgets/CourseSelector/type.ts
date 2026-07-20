export type SelectorTreeCourse = {
	id: number,
	groups: Record<string, number>
};

export type SelectorTree = Record<string, SelectorTreeCourse>;

export type SelectorIDs = {
	courseId: number,
	groupId: number
}
