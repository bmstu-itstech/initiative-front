import { api } from "@/shared/api/request";
import type { getGroupsResponse } from "./type";

export async function getGroupsAPI(): Promise<getGroupsResponse>{
	return await api.get('/api/members/departments/') as getGroupsResponse;
}
