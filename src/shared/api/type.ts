export interface RequestOptions<TBody = unknown> {
	method?: OPTION_METHOD,
	headers?: Record<string, string>,
	body?: TBody,
	query?: QueryParams
}

export type OPTION_METHOD = 'GET' | 'PUT' | 'POST' | 'DELETE';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
};

export type QueryParams = Record<
	string,
	string | number | boolean | null | undefined
>;
