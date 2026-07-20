import type { StructureTreeNodeInterface } from "../StructureTree/type";
import type { MembershipType } from "../UserProfile/type";
import type { departamentAPI } from "./type";

export function groupAPI2groupTree(group: departamentAPI): StructureTreeNodeInterface{
	return {
		id: group.id,
		type: 'group',
		
		title: group.name,
		subtitle: '',
	
		children: []
	}
}

export function groupAPI2groupProfile(group: departamentAPI, isHead: boolean, id: number): MembershipType{
	return {
		id,
		isHead,
		course: group.direction.name,
		courseId: group.direction.id,
		group: group.name,
		groupId: group.id
	}
}

export function groupProfile2groupAPI(group: MembershipType): departamentAPI {
	return {
		"id": group.groupId,
		"name": group.group,
		"direction": {
			"id": group.courseId,
			"name": group.course
		}
	}
}
