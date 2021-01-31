import { getItem, setItem } from './base';
export const setUserInfo = (data = {}) => setItem('userInfo', data);
export const getUserInfo = () => getItem('userInfo');

export const setLoginInfo = (data = {}) => setItem('loginInfo', data);
export const getLoginInfo = () => getItem('loginInfo');

export const setRequestSubscribeMessage = (data = {}) => setItem('requestSubscribeMessage', data, true);
export const getRequestSubscribeMessage = () => getItem('requestSubscribeMessage', true);

export const setOrder = (data = {}) => setItem('order', data);
export const getOrder = () => getItem('order');

export const setPharmacy = (data = {}) => setItem('pharmacy', data);
export const getPharmacy = () => getItem('pharmacy');
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
	getPharmacy
};