import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: '/test',
		name: 'test',
		component: ()=>import('@/pages/TestPage.vue')
	},
	{
		path: '/',
		name: 'home',
		component: ()=>import('@/app/layout/AppLayout.vue'),

		meta: {
			requiresAuth: true
		},

		children: [
			{
				path: 'structure',
				name: 'structure',
				component: ()=>import('@/pages/StructurePage.vue')
			},
			{
				path: 'people',
				name: 'people',
				component: ()=>import('@/pages/PeoplePage.vue')
			},
			{
				path: 'users/:id',
				name: 'user',
				component: ()=>import('@/pages/UserPage.vue'),

				props: (route) => (
					{
						id: Number(route.params.id),
						isEditing: route.query.isEditing === 'true',
						from: route.query.from
					}
				)
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: ()=>import('@/pages/SignInPage.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];
