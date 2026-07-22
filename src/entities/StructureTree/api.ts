import { getCoursesAPI } from "../Course/api";
import { getGroupsAPI } from "../Group/api";
import { getLeadersAPI } from "../Leader/api";
import { getUsersFromGroupAPI } from "../User/api";
import { userAPI2userTree } from "../User/dto";
import { makeTree } from "./dto";
import type { StructureTreeNodeInterface } from "./type";

export async function getStructureTreeAPI():
Promise<StructureTreeNodeInterface[]> {
	const [courses, groups, leaders] = await Promise.all([
		getCoursesAPI(),
		getGroupsAPI(),
		getLeadersAPI()
	]);

	const tree = makeTree(courses, groups, leaders);

	const groupNodes = tree.flatMap(
		(course) => course.children ?? []
	);

	await Promise.all(
		groupNodes.map(async (group) => {
			const users = await getUsersFromGroupAPI(group.id);

			group.children = users.map(userAPI2userTree);
		})
	);

	return tree;
}

export async function getBriefStructureTreeAPI(): 
Promise<StructureTreeNodeInterface[]> {
	const [courses, groups] = await Promise.all([
		getCoursesAPI(),
		getGroupsAPI(),
	]);
	return makeTree(courses, groups, []);
}
