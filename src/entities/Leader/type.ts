import type { UserAPI } from "../User/type";
import type { departamentAPI } from "../Group/type";
import type { directionAPI } from "../Course/type";

export type LeaderAPI = {
	"id": number,
	"position": string,
	"member": UserAPI,
	"department": departamentAPI|null,
	"direction": directionAPI|null
};

export type AppointmentAPI = {
	"member_id": number,
	"position": string,
	"department_id": number|null,
	"direction_id": number|null
};

export interface Appointment {
	id: number,
	title?: string,
	subtitle: string
	courseId: number|null,
	groupId: number|null,
	memberId?: number
}

export type getLeadersResponse = LeaderAPI[];
export type getLeaderResponse = LeaderAPI;

export type createLeaderRequest = AppointmentAPI;
export type createLeaderResponse = LeaderAPI;

export type updateLeaderRequest = AppointmentAPI;
export type updateLeaderResponse = LeaderAPI;
