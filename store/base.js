import { getAuthInfo } from './auth';
import eventHub from '@/utils/event-hub';
export const setItem = (prop, data, isObject = false) => {
  const { openId } = getAuthInfo();
  uni.setStorageSync(`${prop}@${openId}`, isObject ? JSON.stringify(data) : data);
  eventHub.emit(`update${prop.slice(0, 1).toUpperCase()}${prop.slice(1)}`, data);
};
export const getItem = (prop, isObject = false) => {
  try {
    const { openId } = getAuthInfo();
    const originData = uni.getStorageSync(`${prop}@${openId}`);
    const result = isObject ? JSON.parse(originData) : originData;
    return isObject ? (typeof result === 'object' ? result : {}) : result;
  } catch (e) {
    return isObject ? {} : undefined;
  }
};
export default {
  setItem,
  getItem
};