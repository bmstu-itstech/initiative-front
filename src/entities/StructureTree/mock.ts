import type { StructureTreeNodeInterface } from "./type"

export const STRUCTURE_TREE_MOCK: StructureTreeNodeInterface[] = [
	{
		id: 0,
		type: 'endpoint',
		
		title: 'Главный Председатель',
		subtitle: 'Фамилия Имя Отчество',
	
		children: [
			{
				id: 1,
				type: 'course',
				
				title: 'Направление №1',
				subtitle: 'Руководитель №1, Руководитель №2',
			},
			{
				id: 2,
				type: 'course',
				
				title: 'Направление №2',
				subtitle: 'Руководитель №1, Руководитель №2',

				children: [
					{
						id: 6,
						type: 'group',
						
						title: 'Отдел №1',
						subtitle: 'Руководитель №1, Руководитель №2',
					},
					{
						id: 7,
						type: 'group',
						
						title: 'Отдел №2',
						subtitle: 'Руководитель №1, Руководитель №2',

						children: [
							{
								id: 7,
								type: 'user',
								
								title: 'Фамилия Имя Отчество',
								subtitle: '',
							},
							{
								id: 8,
								type: 'user',
								
								title: 'Фамилия Имя Отчество',
								subtitle: '',
							},
						]
					},
				]
			},
			{
				id: 3,
				type: 'course',
				
				title: 'Направление №3',
				subtitle: 'Руководитель №1, Руководитель №2',
			},
			{
				id: 4,
				type: 'course',
				
				title: 'Направление №4',
				subtitle: 'Руководитель №1, Руководитель №2',

				children: [
					{
						id: 9,
						type: 'group',
						
						title: 'Отдел №1',
						subtitle: 'Руководитель №1, Руководитель №2',
					},
					{
						id: 10,
						type: 'group',
						
						title: 'Отдел №2',
						subtitle: 'Руководитель №1, Руководитель №2',

						children: [
							{
								id: 11,
								type: 'user',
								
								title: 'Фамилия Имя Отчество',
								subtitle: '',
							},
							{
								id: 12,
								type: 'user',
								
								title: 'Фамилия Имя Отчество',
								subtitle: '',
							},
						]
					},
				]
			},
			{
				id: 5,
				type: 'course',
				
				title: 'Направление №5',
				subtitle: 'Руководитель №1, Руководитель №2',
			},
		]
	}
];
