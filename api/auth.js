import fetch from '../utils/fetch';
export const auth = (code) => fetch('get', `/api-app/mini/fetchSession/${code}`);
export const login = (data, errHandler) => fetch('post', '/api-app/mini/login', data, { errHandler });
export default {
	login,
	auth
};
