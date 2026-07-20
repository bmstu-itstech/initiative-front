import { api, request } from "@/shared/api/request";
import type { createUserRequest, createUserResponse, getUsersResponse, updateUserRequest, updateUserResponse, UserAPI } from "./type";


export async function getUsersFromGroupAPI(id: number): Promise<getUsersResponse>{
	return await api.get(`/api/members/department/${id}/`) as getUsersResponse;
}

export async function getUsersAPI(
	group: string|null = null,
	limit: number = 20,
	offset: number = 0,
	search: string|null = null,
	sort_by: string|null = null
): Promise<getUsersResponse>{
	return await request('/api/members/', { query: {
		group,
		limit,
		offset,
		search,
		sort_by
	}});
}

export async function getUserAPI(id: number): Promise<UserAPI>{
	return await api.get(`/api/members/${id}/`) as UserAPI;
}

export async function updateUserAPI(id: number, body: updateUserRequest): Promise<updateUserResponse>{
	return await api.put(`/api/members/${id}/`, body) as updateUserResponse;
}

export async function deleteUserAPI(id: number): Promise<void>{
	await api.delete(`/api/members/${id}/`) as createUserResponse;
}

export async function createUserAPI(body: createUserRequest): Promise<createUserResponse> {
	return await api.post('/api/members/', body) as createUserResponse;
}
