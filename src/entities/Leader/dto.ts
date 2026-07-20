import type { StructureTreeNodeInterface } from "../StructureTree/type";
import type { MembershipType } from "../UserProfile/type";
import type { Appointment, AppointmentAPI, LeaderAPI } from "./type";

export function LeaderAPI2Appointment(data: LeaderAPI): Appointment{
	if(data.department == null && data.direction == null)
		return {
			id: data.id,
			title: data.position,
			subtitle: `${data.member.last_name} ${data.member.first_name} ${data.member.patronymic ?? ''}`,
			courseId: null,
			groupId: null,
			memberId: data.member.id
		}
	return data.direction == null 
		? {
			id: data.id,
			subtitle: `${data.member.last_name} ${data.member.first_name} ${data.member.patronymic ?? ''}`,
			courseId: data.department != null ? data.department?.direction.id : null,
			groupId: data.department != null ? data.department?.id : null,
			memberId: data.member.id
		}
		: {
			id: data.id,
			subtitle: `${data.member.last_name} ${data.member.first_name} ${data.member.patronymic ?? ''}`,
			courseId: data.direction.id,
			groupId: null,
			memberId: data.member.id
		}
}

export function LeaderAPI2Membership(
	leader: LeaderAPI,
): MembershipType{
	if(leader.department == null && leader.direction == null)
		return {
			id: leader.id,
			isHead: true,
			position: leader.position,
			course: leader.position,
			courseId: -1,
			group: 'Студ.совета',
			groupId: -1
		}
	return leader.direction == null 
		? {
			id: leader.id,
			isHead: true,
			course: leader.department?.direction.name ?? '-',
			courseId: leader.department?.direction.id ?? -1,
			group: leader.department?.name ?? '-',
			groupId: leader.department?.id ?? -1
		}
		: {
			id: leader.id,
			isHead: true,
			course: leader.direction.name,
			courseId: leader.direction.id,
			group: 'Руководитель направления',
			groupId: -1
		}
}

export function Membership2AppointmentAPI(member:MembershipType, userId: number): AppointmentAPI {
	if(member.courseId == -1 && member.groupId == -1)
		return {
			"member_id": userId,
			"position": member.position ?? 'Руководитель',
			"department_id": null,
			"direction_id": null
		}
	return member.groupId == -1
		? {
			"member_id": userId,
			"position": 'Руководитель направления',
			"department_id": null,
			"direction_id": member.courseId
		}
		: {
			"member_id": userId,
			"position": 'Руководитель',
			"department_id": member.groupId,
			"direction_id": null
		}
}
