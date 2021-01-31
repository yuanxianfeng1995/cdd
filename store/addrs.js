import { getItem, setItem } from './base';
export const setAddrsInfo = (data = {}) => setItem('addrsInfo', data, true);
export const getAddrsInfo = () => getItem('addrsInfo', true);

export default {
  setAddrsInfo,
  getAddrsInfo,
};