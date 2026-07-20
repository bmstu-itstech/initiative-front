import { courseAPI2courseTree } from "../Course/dto";
import type { getDirectionsResponse } from "../Course/type";
import { groupAPI2groupTree } from "../Group/dto";
import type { getGroupsResponse } from "../Group/type";
import { LeaderAPI2Appointment } from "../Leader/dto";
import type { getLeadersResponse } from "../Leader/type";
import type { StructureTreeNodeInterface } from "./type";


export function makeTree(
	courses: getDirectionsResponse,
	groups: getGroupsResponse,
	leaders: getLeadersResponse
): StructureTreeNodeInterface[]{
	const tree = courses.map(courseAPI2courseTree);

	const courseById = new Map(
		tree.map((course) => [course.id, course])
	);

	for (const group of groups) {
		const course = courseById.get(group.direction.id);

		if (!course) {
			continue;
		}

		course.children ??= [];
		course.children.push(groupAPI2groupTree(group));
	}

	leaders.forEach((leader)=>{
		const normLeader = LeaderAPI2Appointment(leader);
		if(normLeader.courseId == null){
			tree.push({
				id: normLeader.id,
				type: 'endpoint',
				
				title: normLeader.title ?? 'Член Руководства',
				subtitle: normLeader.subtitle,
				
				children: []
			});
			return;
		}

		const course = courseById.get(normLeader.courseId);
		if(course == undefined) return;
		
		if(normLeader.groupId != null){
			const group = course.children?.find((child)=>child.id == normLeader.groupId && child.type == 'group');
			if(group == undefined) return;
			group.subtitle = normLeader.subtitle;
		}else{
			course.subtitle = normLeader.subtitle;
		}
	})

	return tree;
}
