
import auth from './auth';
import user from './user';
import theme from './theme';
import constant from './constant';
import { login } from '@/api/auth';
import { toast } from '@/utils/toast';
import { gotoLogin } from '@/utils/navigation';

export const updateUserInfo = (successMes = '') => {
  const { getAuthInfo } = auth;
  const { setUserInfo, getUserInfo } = user;
  const { rawData, phone, telephone, signature, encryptedData, iv, authCode } = getUserInfo();
  const { sessionKey } = getAuthInfo();
  return login(
    {
      sessionKey,
      rawData: JSON.stringify(rawData),
      signature,
      encryptedData,
      phone: phone || telephone,
      iv,
      authCode,
    },
    (err) => {
      gotoLogin('更新失败,请重新授权', true);
      return Promise.reject(err);
    }
  ).then((data) => {
    setUserInfo({
      ...data,
      doctorsList: data.doctorsList || [],
      phone: phone || data.telephone,
      rawData,
      signature,
      encryptedData,
      iv,
      authCode,
      displaySex: { 1: '男', 2: '女' }[data.sex],
    });
    successMes && toast.open(successMes);
  });
};
export default {
  updateUserInfo,
  ...constant,
  ...theme,
  ...user,
  ...auth,
};