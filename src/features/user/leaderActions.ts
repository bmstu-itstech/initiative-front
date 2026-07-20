import { createLeaderAPI, deleteLeaderAPI, updateLeaderAPI } from "@/entities/Leader/api";
import { Membership2AppointmentAPI } from "@/entities/Leader/dto";
import type { MembershipType } from "@/entities/UserProfile/type";
import type { LeaderJournalType, MembershipStatusType } from "./type";

export const LEADER_API_MAPPER: 
Record<MembershipStatusType, (id: number, leaders: MembershipType[], userId: number) => Promise<boolean>> = {
	'create': createLeader,
	'delete': deleteLeader,
	'update': updateLeader,
}


export async function deleteLeader(
	id: number,
	leaders: MembershipType[],
	userId: number
): Promise<boolean>{
	try{
		await deleteLeaderAPI(id);
		return true;
	}
	catch(currentError){
		return false;
	}
}
export async function updateLeader(
	id: number,
	leaders: MembershipType[],
	userId: number
): Promise<boolean>{
	const leader = leaders.find((l)=>l.id == id);
	if(leader == undefined)
		return false;
	try{
		await updateLeaderAPI(leader.id, Membership2AppointmentAPI(leader, userId));
		return true;
	}
	catch(currentError){
		return false;
	}
}
export async function createLeader(
	id: number,
	leaders: MembershipType[],
	userId: number
): Promise<boolean>{
	const leader = leaders.find((l)=>l.id == id);
	if(leader == undefined)
		return false;
	try{
		await createLeaderAPI(Membership2AppointmentAPI(leader, userId));
		return true;
	}
	catch(currentError){
		return false;
	}
}

function addJournalEntry(
	journal: LeaderJournalType,
	status: MembershipStatusType,
	id: number
): void {
	if (!journal[status].includes(id))
		journal[status].push(id);
}

function removeJournalEntry(
	journal: LeaderJournalType,
	status: MembershipStatusType,
	id: number
): void {
	journal[status] = journal[status]
		.filter((item) => item !== id);
}

export function createLeaderEntry(journal: LeaderJournalType, id: number){
	addJournalEntry(journal, 'create', id);
}
export function deleteLeaderEntry(journal: LeaderJournalType, leader: MembershipType){
	if (leader.isHead) {
		if (leader.id < 0) {
			removeJournalEntry(journal, 'create', leader.id);
			removeJournalEntry(journal, 'update', leader.id);
		} else {
			removeJournalEntry(journal, 'update', leader.id);
			addJournalEntry(journal, 'delete', leader.id);
		}
	}
}
export function updateLeaderEntry(journal: LeaderJournalType, leader: MembershipType){
	if(!leader.isHead || leader.id < 0)
		return;
	addJournalEntry(journal, 'update', leader.id);
}
