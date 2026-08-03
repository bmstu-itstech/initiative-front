import type { directionAPI } from "../Course/type"
import type { briefLeaderAPI } from "../StructureTree/type"
import type { briefUserAPI } from "../User/type"

export type departamentAPI = {
	"id": number,
	"name": string,
	"direction": directionAPI
}

export type briefDepartmentAPI = {
	id: number,
	name: string,
	leaders: briefLeaderAPI[],
	members: briefUserAPI[] 
}

export type getGroupsResponse = departamentAPI[];
