import type { FilterDataInterface } from "@/shared/types/interfaces";
import type { StructureTreeNodeInterface } from "@/entities/StructureTree/type";
import type { DropDownMenuType } from "@/shared/types/types";


const mapper: Record<string, DropDownMenuType[]> = {
	'0': ['user'],
	'1': ['group'],
	'2': ['course'],
	'3': ['user', 'group', 'course', 'endpoint']
}

function getData(id: string, node: StructureTreeNodeInterface): string|null{
	return mapper[id]?.includes(node.type) ? [node.type, node.title, node.subtitle].join(' ') : null;
}

function compare(data: string|null, target: string[]): boolean{
	if(data == null)
		return false;
	const normalizedData = data.toLowerCase();
	return target.every((t)=>normalizedData.includes(t));
}

function dfs(
	search: FilterDataInterface, 
	target: string[], 
	node: StructureTreeNodeInterface
): StructureTreeNodeInterface | null {

	const data = getData(String(search.buttonID), node);
	const match = compare(data, target);
	
	const filteredChildren:  StructureTreeNodeInterface[]= [];
	node.children?.forEach((child)=>{
		const buffer = dfs(search, target, child);
		if(buffer !== null)
			filteredChildren.push(buffer);
	});

	if(match || filteredChildren.length>0)
		return {
			...node,
			children: filteredChildren
		};

	return null;
}


export function filterTree(
	search: FilterDataInterface, 
	data:  StructureTreeNodeInterface[]):  StructureTreeNodeInterface[] {
		const normalizedSearch = search.value.trim();
		if (!normalizedSearch)
			return data;
		
		const target = normalizedSearch
			.toLowerCase()
			.split(/\s+/);

		const ans: StructureTreeNodeInterface[] = [];
		for(let node of data){
			const filteredNode = dfs(search, target, node);
			if(filteredNode != null)
				ans.push(filteredNode);
		}
		return ans;
}
