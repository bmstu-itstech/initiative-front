<script setup lang="ts">
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

import { ref, computed } from 'vue';

import type { ButtonType, InputType } from '@/shared/types/types';
import { useSignIn } from './useSignIn';
import type { LoginRequest } from './type';
import { showAlert } from '../alert/alert';


const {
	errorAPI: error,
	login: useLogin,
	isLoading
} = useSignIn();

const login = ref<string>('');
const password = ref<string>('');

const stateInputLogin = ref<InputType>('default');
const stateInputPassword = ref<InputType>('default');
const stateButton = computed<ButtonType>(()=>isLoading.value ? 'disabled' : 'primary');

async function handleButton(): Promise<void>{
	stateInputLogin.value = 'default'
	stateInputPassword.value = 'default'

	const data: LoginRequest = {
		"username": login.value,
		"password": password.value
	}

	const isLogined = await useLogin(data);

	if(!isLogined && error.value != null){
		showAlert(error.value, true);
		stateInputLogin.value = 'error';
		stateInputPassword.value = 'error';

		return;
	}
}

</script>

<template>
	<div class="sign-in">
		<div class="sign-in__inputs">
			<Input 
				class="sign-in__inputs__login"
				v-model="login"
				header="Логин"
				placeholder="Введите свой логин"
				:state="stateInputLogin"
				:isPassword="false"
			/>
			<Input 
				class="sign-in__inputs__password"
				v-model="password"
				header="Пароль"
				placeholder="Введите свой пароль"
				:state="stateInputPassword"
				:isPassword="true"
			/>
		</div>
		<div class="sign-in__action">
			<Button 
				class="sign-in__action__button"
				text="Войти"
				:icon="true"
				:state="stateButton"
				@clicked="handleButton"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.sign-in{
		min-width: 320px;
		width: 100%;
		height: fit-content;

		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		gap: 40px;

		&__inputs{
			width: 100%;
			min-width: 300px;
			height: fit-content;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: column;
			gap: 10px;
		}

		&__action{
			width: 100%;
			height: fit-content;

			display: flex;
			align-items: center;
			justify-content: center;

			&__button{
				--button-width: 170px;
				--button-height: 50px;
			}
		}
	}
</style>
