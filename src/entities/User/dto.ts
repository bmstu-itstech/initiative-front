import type { StructureTreeNodeInterface } from "../StructureTree/type";
import type { updateUserRequest, UserAPI } from "./type";
import type { PeopleTableRow } from "../UsersTable/type";
import type { UserProfileInterface, UserProfileSourceInterface } from "../UserProfile/type";
import { groupAPI2groupProfile, groupProfile2groupAPI } from "../Group/dto";

export function userAPI2userTree(user: UserAPI): StructureTreeNodeInterface{
	return {
		id: user.id,
		type: 'user',
		
		title: `${user.last_name} ${user.first_name} ${user.patronymic ?? ''}`,
		subtitle: '',
	
		children: []
	}
}

export function userAPI2userTable(user: UserAPI): PeopleTableRow{
	return {
		'ID': user.id,
		'ФИО': `${user.last_name} ${user.first_name} ${user.patronymic ?? ''}`,
		'Группа': user.group ?? '-',
		'Контакт': `@${user.telegram}`,
		'Дата рождения': user.birth_date ?? '-',
		'Дата вступления': user.join_date,
		'Личная страница': 'Перейти',
	}
}

export function userAPI2userProfile(user: UserAPI): UserProfileInterface{
	return {
		id: user.id,
		firstName: user.first_name,
		secondName: user.last_name,
		surName: user.patronymic ?? '-',
		group: user.group ?? '-',
		contact: user.telegram,
		birthday: user.birth_date ?? '-',
		entryday: user.join_date,
		membership: user.departments.map((group, id)=>groupAPI2groupProfile(group, false, id))
	}
}

export function userProfile2userAPI(user: UserProfileInterface): UserAPI {
	return {
		"id": user.id,
		"first_name": user.firstName,
		"last_name": user.secondName,
		"telegram": user.contact,
		"join_date": user.entryday,
		"patronymic": user.surName == '-' ? null : user.surName,
		"group": user.group == '-' ? null : user.group,
		"birth_date": user.birthday == '-' ? null : user.birthday,
		"departments": user.membership.map(groupProfile2groupAPI)
	}
}

export function userProfile2updateUserAPI(user: UserProfileInterface): updateUserRequest {
	return {
		"first_name": user.firstName,
		"last_name": user.secondName,
		"telegram": user.contact,
		"patronymic": user.surName == '-' ? null : user.surName,
		"group": user.group == '-' ? null : user.group,
		"birth_date": user.birthday == '-' ? null : user.birthday,
		"join_date": user.entryday == '-' ? null : user.entryday,
		"department_ids": user.membership.map((member)=>member.groupId)
	}
}

export function userProfileSource2updateUserAPI(user: UserProfileSourceInterface): updateUserRequest {
	return {
		"first_name": user.firstName,
		"last_name": user.secondName,
		"telegram": user.contact,
		"patronymic": user.surName == '-' ? null : user.surName,
		"group": user.group == '-' ? null : user.group,
		"birth_date": user.birthday == '-' ? null : user.birthday,
		"join_date": user.entryday == '-' ? null : user.entryday,
		"department_ids": user.membership.map((member)=>member.groupId)
	}
}

export const userProfile2createUserAPI = userProfile2updateUserAPI;
