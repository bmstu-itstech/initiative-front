import type { AppointmentAPI } from "@/entities/Leader/type";
import type { LeadershipDraft } from "../type";
import { createLeaderAPI, deleteLeaderAPI, updateLeaderAPI } from "@/entities/Leader/api";
import type { LeadershipChanges } from "./leadershipDTO";

function leadershipDraft2leadershipAPI(
	userId: number,
	leader: LeadershipDraft
): AppointmentAPI {
	let position: string = leader.position;
	if (leader.courseId == null && leader.groupId == null && leader.course != '')
		position = leader.course;
	return {
		"member_id": userId,
		"position": position,
		"department_id": leader.groupId,
		"direction_id": leader.courseId
	};
}

async function createLeadership(
	userId: number,
	leader: LeadershipDraft
): Promise<void> {
	await createLeaderAPI(
		leadershipDraft2leadershipAPI(userId, leader)
	);
}
async function updateLeadership(
	userId: number,
	leader: LeadershipDraft
): Promise<void> {
	if (leader.appointmentId === null) {
		throw new Error(
			'Нельзя обновить несохранённое назначение'
		);
	}

	await updateLeaderAPI(
		leader.appointmentId,
		leadershipDraft2leadershipAPI(userId, leader)
	);
}

export async function syncLeadership(
	userId: number,
	changes: LeadershipChanges
): Promise<void> {
	await Promise.all(
		changes.delete.map((appointmentId) =>
			deleteLeaderAPI(appointmentId)
		)
	);

	await Promise.all([
		...changes.update.map((item) =>
			updateLeadership(userId, item)
		),

		...changes.create.map((item) =>
			createLeadership(userId, item)
		)
	]);
}
