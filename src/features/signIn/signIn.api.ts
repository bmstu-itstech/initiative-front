import { api } from "@/shared/api/request";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "./type";
import type { LoginRequest, LoginResponse } from "./type";


export const authStorage = {
	getAccessToken(): string | null {
		return localStorage.getItem(ACCESS_TOKEN);
	},
	getRefreshToken(): string | null {
		return localStorage.getItem(REFRESH_TOKEN);
	},
	setTokens(access_token: string, refresh_token: string) {
		localStorage.setItem(ACCESS_TOKEN, access_token);
		localStorage.setItem(REFRESH_TOKEN, refresh_token);
	},
	clearTokens(): void {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
	}
};


export async function loginAPI(
	data: LoginRequest
): Promise<LoginResponse> {
	const response: LoginResponse = await api.post('/api/auth/login/', data, true);

	authStorage.setTokens(response.access_token, response.refresh_token);

	return response;
}

export function logout(): void {
	authStorage.clearTokens();
}
