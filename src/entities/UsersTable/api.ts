import { getUsersAPI } from "../User/api";
import type { getUsersResponse, UserAPI } from "../User/type";

export async function getPeople(): Promise<UserAPI[]>{
	let res: UserAPI[] = [];

	let index = 0;
	let limit = 100;
	let chunk: getUsersResponse = await getUsersAPI(null, limit, index, null);
	while(chunk.length != 0){
		res.push(...chunk);
		index+=limit;
		chunk = await getUsersAPI(null, limit, index, null);
	}

	return res;
}
