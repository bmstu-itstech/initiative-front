import type { UserProfileInterface } from "./type";

export const USER_PROFILE_MOCK: UserProfileInterface = {
	id: 0,
	firstName: 'Юдин',
	secondName: 'Данила',
	surName: 'Антонович',
	group: 'ИУ3-63Б',
	contact: '@danya0808',
	birthday: '08.08.2005',
	entryday: '01.01.1970',
	membership: [
		{
			id: 0,
			isHead: false,
			course: 'Направление №1',
			courseId: 0,
			group: 'Отдел №2',
			groupId: 1
		},
		{
			id: 1,
			isHead: false,
			course: 'Направление №3',
			courseId: 2,
			group: 'Отдел №2',
			groupId: 5
		},
		{
			id: 2,
			isHead: true,
			course: 'Направление №3',
			courseId: 2,
			group: 'Отдел №2',
			groupId: 5
		},
	]
};
