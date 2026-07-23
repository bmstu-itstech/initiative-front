import type { AppointmentAPI } from "@/entities/Leader/type";
import type { LeadershipDraft } from "../type";
import { createLeaderAPI, deleteLeaderAPI, updateLeaderAPI } from "@/entities/Leader/api";
import type { LeadershipChanges } from "./leadershipDTO";
import { ApiLeadershipError } from "../alertsAPI";
import { ApiError, type OPTION_METHOD } from "@/shared/api/type";

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

async function wrapLeadershipRequest(
	request: () => Promise<unknown>,
	method: OPTION_METHOD
): Promise<void> {
	try {
		await request();
	} catch (currentError) {
		if (currentError instanceof ApiError) {
			throw new ApiLeadershipError(
				currentError.status,
				method
			);
		}

		throw currentError;
	}
}

export async function syncLeadership(
	userId: number,
	changes: LeadershipChanges
): Promise<void> {
	await Promise.all(
		changes.delete.map((appointmentId) => 
			wrapLeadershipRequest(
				() => deleteLeaderAPI(appointmentId),
				'DELETE'
			)
		)
	);

	await Promise.all([
		...changes.update.map((item) => 
			wrapLeadershipRequest(
				() => updateLeadership(userId, item),
				'PUT'
			)
		),

		...changes.create.map((item) => 
			wrapLeadershipRequest(
				() => createLeadership(userId, item),
				'POST'
			)
		)
	]);
}
