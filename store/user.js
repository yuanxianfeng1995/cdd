import { getItem, setItem } from './base';
export const setUserInfo = (data = {}) => setItem('userInfo', data, true);
export const getUserInfo = () => getItem('userInfo', true);

export const setLoginInfo = (data = {}) => setItem('loginInfo', data, true);
export const getLoginInfo = () => getItem('loginInfo', true);

export const setRequestSubscribeMessage = (data = {}) => setItem('requestSubscribeMessage', data, true);
export const getRequestSubscribeMessage = () => getItem('requestSubscribeMessage', true);

export const setOrder = (data = {}) => setItem('order', data, true);
export const getOrder = () => getItem('order', true);

export const setScene = (data = {}) => setItem('scene', data, true);
export const getScene = () => getItem('scene', true);

export const setPharmacy = (data = {}) => setItem('pharmacy', data, true);
export const getPharmacy = () => getItem('pharmacy', true);
export default {
  setUserInfo,
  getUserInfo,
	setLoginInfo,
	getLoginInfo,
	setRequestSubscribeMessage,
	getRequestSubscribeMessage,
	setOrder,
	getOrder,
	setPharmacy,
	getPharmacy,
	setScene,
	getScene
};