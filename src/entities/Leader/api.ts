import { api } from "@/shared/api/request";
import type { AppointmentAPI, createLeaderRequest, createLeaderResponse, getLeaderResponse, getLeadersResponse, LeaderAPI } from "./type";

export async function getLeadersAPI(): Promise<getLeadersResponse>{
	return await api.get('/api/members/leaders/') as getLeadersResponse;
}

export async function getLeaderAPI(id: number): Promise<getLeaderResponse>{
	return await api.get(`/api/members/leaders/${id}/`) as getLeaderResponse;
}

export async function createLeaderAPI(appointment: createLeaderRequest): Promise<createLeaderResponse>{
	return await api.post('/api/members/leaders/', appointment) as createLeaderResponse;
}
