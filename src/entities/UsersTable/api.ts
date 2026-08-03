import { api, request } from "@/shared/api/request";
import { getUsersAPI } from "../User/api";
import type { getUsersResponse, UserAPI } from "../User/type";
import { authStorage } from "@/features/signIn/signIn.api";

export async function getPeople(): Promise<UserAPI[]>{
	let res: UserAPI[] = [];

	let index = 0;
	let limit = 1000;
	let chunk: getUsersResponse = await getUsersAPI(null, limit, index, null);
	res.push(...chunk);
	while(chunk.length == limit){
		index+=limit;
		chunk = await getUsersAPI(null, limit, index, null);
		res.push(...chunk);
	}

	return res;
}

export async function downloadUsersTableCSV(isRetry: boolean = false): Promise<void> {
	const token = authStorage.getAccessToken();
	const response = await fetch('/api/members/export/', {
		headers: { 'Authorization': `Bearer ${token}` }
	});
	if(response.status == 401 && !isRetry){
		downloadUsersTableCSV(true);
		return;
	}
	const blob = await response.blob();
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = 'members.csv';

	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}
