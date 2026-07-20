import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';
import { authStorage } from '@/features/signIn/signIn.api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to)=>{
	const isAuth = authStorage.getAccessToken() != null;
	if(to.meta.requiresAuth && !isAuth)
		return { name: 'login', query: {redirect: to.fullPath } };
})

export default router
