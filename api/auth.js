import fetch from '../utils/fetch';
export const auth = (code) => fetch('get', `/api-app/mini/fetchSession/${code}`);
export const login = (data, errHandler) => fetch('post', '/wx/mini/login', data, { errHandler });
//获取小程序首页药材详情列表
export const getMini = (parmas) => fetch('get', `/wx/mini/index`,parmas);

export default {
	login,
	auth,
	getMini
};
