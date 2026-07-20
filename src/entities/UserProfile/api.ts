interface updateUserRequestAPI {
	"first_name": string,
	"last_name": string,
	"telegram": string,
	"patronymic": string|null,
	"group": string|null,
	"birth_date": string|null,
	"department_ids": number[]
}

export type direction = {
	"id": number,
	"name": string
}

export type departament = {
	"id": number,
	"name": string,
	"direction": direction
}

// interface updateUserResponseAPI;

type UserAPI = {
	"id": number,
	"first_name": string,
	"last_name": string,
	"telegram": string,
	"join_date": string,
	"patronymic": string|null,
	"group": string|null,
	"birth_date": string|null,
	"departaments": departament[]
}
