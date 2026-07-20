import { authStorage } from "@/features/signIn/signIn.api"
import { API_URL } from "./config"

type RefreshResponse = {
	access_token: string,
	refresh_token: string
}

export async function refreshTokens() {
	const refresh_token = authStorage.getRefreshToken();

	if(!refresh_token){
		authStorage.clearTokens();
		throw new Error('Refresh token is missing');
	}

	const response = await fetch(`${API_URL}/api/auth/refresh/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: refresh_token
		})
	});

	if(!response.ok){
		authStorage.clearTokens();
		throw new Error('Session expired');
	}

	const tokens = await response.json() as RefreshResponse;
	authStorage.setTokens(
		tokens.access_token,
		tokens.refresh_token
	);
}
