import { getCurrentFullPath } from '@/utils/router';
import { setAuthInfo } from '@/store/auth';
import { setUserInfo } from '@/store/user';
export const goto = (url) => uni.navigateTo({ url });
export const redirectTo = (url) => uni.redirectTo({ url });
export const gotoLogin = (errMessage, clearAllStorage = false) => {
  const currentFullPath = getCurrentFullPath();
  if (new RegExp('^(/pages/auth/login/login)').test(currentFullPath)) return;
  if (clearAllStorage) {
    setAuthInfo({});
    setUserInfo({});
  }
  redirectTo(`/pages/auth/login/login?redirect=${currentFullPath}&errMessage=${errMessage || ''}`);
};

export default {
  goto, redirectTo, gotoLogin
};