import { getAuthInfo } from '@/store/auth';
import WechatBizDataCrypt from './wechat-biz-data-crypt';
export const decrypt = (data, iv) => {
	const { appId, sessionKey } = getAuthInfo();
	return new WechatBizDataCrypt(appId, sessionKey).decryptData(data, iv);
};
export const decryptEventDetail = (event) => {
	const {
		encryptedData,
		iv
	} = event?.detail || {};
	return decrypt(encryptedData, iv);
};
