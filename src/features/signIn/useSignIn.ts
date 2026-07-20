import { ref } from 'vue';
import { loginAPI } from './signIn.api';
import { LOGIN_ALERTS, type LoginRequest } from './type';
import { ApiError } from '@/shared/api/type';
import { useRoute, useRouter } from 'vue-router';
import type { AlertOptions } from '../alert/type';
import { UNKNOWN_ERROR } from '../alert/config';


export function useSignIn(){
	const errorAPI = ref<AlertOptions|null>(null);
	const isLoading = ref<boolean>(false);

	const router = useRouter();
	const route = useRoute();

	async function login(data: LoginRequest): Promise<boolean>{
		if(isLoading.value)
			return false;

		errorAPI.value = null;
		isLoading.value = true;

		try{
			await loginAPI(data);

			const redirect =
				typeof route.query.redirect === 'string'
					? route.query.redirect
					: '/';

			router.push(redirect);

			return true;
		} catch (currentError){
			let alert = null;
			if(currentError instanceof ApiError)
				alert = LOGIN_ALERTS[currentError.status];
			errorAPI.value = alert ?? UNKNOWN_ERROR;
			
			return false;
		} finally {
			isLoading.value = false;
		}
	}

	return {
		errorAPI,
		login,
		isLoading
	}
}
