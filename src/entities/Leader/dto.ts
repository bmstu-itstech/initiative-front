import type { Appointment, LeaderAPI } from "./type";

export function LeaderAPI2Appointment(data: LeaderAPI): Appointment{
	if(data.department == null && data.direction == null)
		return {
			id: data.id,
			title: data.position,
			subtitle: `${data.member.first_name} ${data.member.last_name} ${data.member.patronymic ?? ''}`,
			courseId: null,
			groupId: null
		}
	return data.direction == null 
		? {
			id: data.id,
			subtitle: `${data.member.first_name} ${data.member.last_name} ${data.member.patronymic ?? ''}`,
			courseId: data.department != null ? data.department?.direction.id : null,
			groupId: data.department != null ? data.department?.id : null
		}
		: {
			id: data.id,
			subtitle: `${data.member.first_name} ${data.member.last_name} ${data.member.patronymic ?? ''}`,
			courseId: data.direction.id,
			groupId: null
		}
}
