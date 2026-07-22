import type { LeadershipDraft } from "../type";

export interface LeadershipChanges {
	create: LeadershipDraft[];
	update: LeadershipDraft[];
	delete: number[];
}

function isLeadershipEqual(
	original: LeadershipDraft,
	current: LeadershipDraft
): boolean {
	return (
		original.course === current.course &&
		original.courseId === current.courseId &&
		original.group === current.group &&
		original.groupId === current.groupId &&
		original.position === current.position
	);
}

export function getLeadershipChanges(
	original: LeadershipDraft[],
	current: LeadershipDraft[]
): LeadershipChanges {
	const original_mapper = new Map<number, LeadershipDraft>(
		original.filter((item)=>item.appointmentId != null)
			.map((item)=>[item.appointmentId as number, item])
	);
	const current_mapper = new Map<number, LeadershipDraft>(
		current.filter((item)=>item.appointmentId!=null)
			.map((item)=>[item.appointmentId as number, item])
	);

	const create = original.filter((item)=>item.appointmentId==null);
	const update = current.filter((item)=>{
		if(item.appointmentId==null)
			return false;
		const match = original_mapper.get(item.appointmentId);
		if(match == undefined)
			return false;

		return !isLeadershipEqual(item, match);
	});
	const deleteIds = original
		.filter(item=>item.appointmentId!=null && !current_mapper.has(item.appointmentId))
		.map(item=>item.appointmentId as number);

	return {create, update, delete: deleteIds};
}
