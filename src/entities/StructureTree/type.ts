import type { DropDownMenuType } from "@/shared/types/types"

export interface StructureTreeNodeInterface{
	id: number,
	type: DropDownMenuType,
	
	title: string,
	subtitle: string,

	children?: StructureTreeNodeInterface[]
}
