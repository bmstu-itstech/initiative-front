import { api } from "@/shared/api/request";
import type { getDirectionsResponse } from "./type";

export async function getCoursesAPI(): Promise<getDirectionsResponse>{
	return await api.get('/api/members/directions/') as getDirectionsResponse;
}
