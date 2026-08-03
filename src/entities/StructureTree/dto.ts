import { courseAPI2courseTree } from "../Course/dto";
import type { getDirectionsResponse } from "../Course/type";
import { groupAPI2groupTree } from "../Group/dto";
import type { briefDepartmentAPI, getGroupsResponse } from "../Group/type";
import { LeaderAPI2Appointment } from "../Leader/dto";
import type { getLeadersResponse } from "../Leader/type";
import type { briefUserAPI, UserAPI } from "../User/type";
import type { briefLeaderAPI, getStructureResponse, StructureTreeNodeInterface } from "./type";


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

export function makeStructureTree(
	leaders: getLeadersResponse,
	structure: getStructureResponse
): StructureTreeNodeInterface[] {
	const tree: StructureTreeNodeInterface[] = [];

	leaders
		.map(LeaderAPI2Appointment)
		.filter(leader=>leader.courseId == null && leader.groupId == null)
		.forEach(leader=>tree.push({
			id: leader.id,
			type: 'endpoint',
			
			title: leader.title ?? 'Член Руководства',
			subtitle: leader.subtitle,

			children: []
		}));

	structure.forEach(course=>{
		tree.push({
			id: course.id,
			type: 'course',

			title: course.name,
			subtitle: course.leaders.map(StructureLeader2Subtitle).join(', '),

			children: course.departments.map(StructureDepartment2StructureTreeNode)
		})
	})
	
	return tree;
}

function StructureLeader2Subtitle(leader: briefLeaderAPI): string {
	return `${leader.member.last_name} ${leader.member.first_name} ${leader.member.patronymic ?? ''} (${leader.position})`;
}

function StructureDepartment2StructureTreeNode(group: briefDepartmentAPI): StructureTreeNodeInterface {
	return {
		id: group.id,
		type: 'group',

		title: group.name,
		subtitle: group.leaders.map(StructureLeader2Subtitle).join(', '),

		children: group.members.map(StructureUser2StructureTreeNode)
	}
}

function StructureUser2StructureTreeNode(user: briefUserAPI): StructureTreeNodeInterface {
	return {
		id: user.id,
		type: 'user',
		
		title: `${user.last_name} ${user.first_name} ${user.patronymic ?? ''}`,
		subtitle: '',
	
		children: []
	}
}
