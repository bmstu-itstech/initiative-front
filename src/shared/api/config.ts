// export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL = window.location.origin;

// if(!API_URL)
// 	throw new Error('URL в vite не задан!');

export const LINKS_CONFIG: Record<string, string> = {
	"login": '/api/auth/login/',
	"courses": '/api/members/directions/',
	"groups": '/api/members/departments/',
	"leaders": '/api/members/leaders/',
	"usersFromGroup": '/api/members/direction/'
};
