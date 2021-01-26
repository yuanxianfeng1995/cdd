import { getItem, setItem } from './base';
export const setUserInfo = (data = {}) => setItem('userInfo', data, true);
export const getUserInfo = () => getItem('userInfo', true);
export default {
  setUserInfo,
  getUserInfo
};