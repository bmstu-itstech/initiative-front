import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import type { SelectorIDs, SelectorTree, SelectorTreeCourse } from "./type";

export function Structure2Selector(structure: StructureTreeNodeInterface[]): SelectorTree{
	let tree: SelectorTree = {};
	let groups: Record<string, number> = {};
	structure.forEach((node)=>{
		if(node.type=='course' && (node.children ?? []).length > 0){
			groups = {};
			node.children?.forEach((child)=>{
				if(child.type == 'group')
					groups[child.title] = child.id;
			});
			if(groups.length != 0){
				tree[node.title] = {
					id: node.id,
					groups: groups
				}
			}
		}
	});
	return tree;
}

export function getSelectorCourses(tree: SelectorTree): string[]{ return Object.keys(tree); }
export function getSelectorCourseGroups(tree: SelectorTree, course: string): string[] {
	if(tree[course] != undefined)
		return Object.keys(tree[course].groups);
	return [];
}
export function getSelectorIDs(tree: SelectorTree, course: string, group: string): SelectorIDs|null{
	if(tree[course] != undefined && tree[course].groups[group] != undefined){
		return {
			courseId: tree[course].id, 
			groupId: tree[course].groups[group]
		}
	}
	return null;
}
