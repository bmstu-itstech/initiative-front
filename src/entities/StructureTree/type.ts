import type { DropDownMenuType } from "@/shared/types/types"
import type { LeaderAPI } from "../Leader/type"
import type { briefUserAPI } from "../User/type";
import type { briefDepartmentAPI } from "../Group/type";

export interface StructureTreeNodeInterface{
	id: number,
	type: DropDownMenuType,
	
	title: string,
	subtitle: string,

	children?: StructureTreeNodeInterface[]
}

export type briefLeaderAPI = Omit<LeaderAPI, 'department'|'direction'>;

export interface StructureNodeAPI {
	id: number,
	name: string,
	leaders: briefLeaderAPI[],
	departments: briefDepartmentAPI[],
}

export type getStructureResponse = StructureNodeAPI[];
