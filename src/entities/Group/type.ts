import type { directionAPI } from "../Course/type"

export type departamentAPI = {
	"id": number,
	"name": string,
	"direction": directionAPI
}

export type getGroupsResponse = departamentAPI[];
