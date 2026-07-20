import { refreshTokens } from "./auth";
import { API_URL } from "./config";
import { ApiError, type QueryParams, type RequestOptions } from "./type";

export async function request<TResponse, TBody=unknown>(
	path: string,
	options: RequestOptions<TBody> = {},
	isRetry: boolean = false,
	skipRefresh: boolean = false
): Promise<TResponse>{
	const access_token = localStorage.getItem('access_token');

	const response = await fetch(
		createURL(path, options.query),
		{
			method: options.method ?? 'GET',

			headers: {
				'Content-Type': 'application/json',

				...(access_token
					? { Authorization: `Bearer ${access_token}` }
					: {}
				),

				...options.headers
		},

		body: options.body != undefined
			? JSON.stringify(options.body)
			: undefined
	});

	if(response.status === 401 && !isRetry && !skipRefresh){
		await refreshTokens();

		return request<TResponse, TBody>(path, options, true);
	}

	if(!response.ok){
		throw new ApiError(
			`Ошибка запроса: ${response.status}`,
			response.status
		);
	}

	if(response.status == 204)
		return undefined as TResponse;

	return response.json() as Promise<TResponse>;
}

function createURL(
	path: string,
	query?: QueryParams
): string {
	const url = new URL(`${API_URL}${path}`);

	if(query)
		for(let [key, value] of Object.entries(query))
			if(value != undefined && value != null)
				url.searchParams.set(key, String(value));

	return url.toString();
}

export const api = {
	get<TResponse>(
		path: string,
		options?: Omit<RequestOptions, 'method' | 'body'>
	){
		return request<TResponse>(path,{
			...options,
			method: 'GET'
		});
	},
	post<TResponse, TBody>(
		path: string,
		body: TBody,
		skipRefresh = false
	){
		return request<TResponse, TBody>(path,
			{
				body,
				method: 'POST'
			}, 
			false, 
			skipRefresh
		);
	},
	put<TResponse, TBody>(
		path: string,
		body: TBody
	){
		return request<TResponse, TBody>(path,{
			body,
			method: 'PUT'
		});
	},
	delete<TResponse = void>(
		path: string,
	){
		return request<TResponse>(path,{
			method: 'DELETE'
		});
	}
};
