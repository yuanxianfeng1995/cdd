import { getItem, setItem } from './base';
export const setUserInfo = (data = {}) => setItem('userInfo', data, true);
export const getUserInfo = () => getItem('userInfo', true);

export const setLoginInfo = (data = {}) => setItem('loginInfo', data, true);
export const getLoginInfo = () => getItem('loginInfo', true);
export default {
  setUserInfo,
  getUserInfo,
	setLoginInfo,
	getLoginInfo
};