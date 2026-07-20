import type { StructureTreeNodeInterface } from "../StructureTree/type";
import type { directionAPI } from "./type";

export function courseAPI2courseTree(course: directionAPI): StructureTreeNodeInterface{
	return {
		id: course.id,
		type: 'course',
		
		title: course.name,
		subtitle: '',
	
		children: []
	}
}
