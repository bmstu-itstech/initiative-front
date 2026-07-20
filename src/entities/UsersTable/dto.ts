import { userAPI2userTable } from "../User/dto";
import type { UserAPI } from "../User/type";
import type { PeopleTableData } from "./type";

export function People2PeopleTable(users: UserAPI[]): PeopleTableData{
	return users.map(userAPI2userTable);
}
