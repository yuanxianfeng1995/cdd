import { appId } from './constant';
import { auth } from '@/api/auth';
import { tips } from '@/utils/tips';
import { loading } from '@/utils/loading';
import eventHub from '@/utils/event-hub';

export const setAuthInfo = (data) => {
  uni.setStorageSync('authInfo', JSON.stringify(data));
  eventHub.emit('updateAuthInfo', data);
};
export const getAuthInfo = () => {
  try {
    const data = JSON.parse(uni.getStorageSync('authInfo'));
    if (typeof data === 'object') return data;
    return {};
  } catch (e) {
    return {};
  }
};
export const initAuth = (openLoading = false) => new Promise((resolve, reject) => {
  if (openLoading) {
    loading.open();
    setAuthInfo({
      ...getAuthInfo(),
      loading: true,
    });
  }
  const reLogin = () => wx.login({
    success(data) {
      const { code } = data;
      resolve(auth(code).then((res) => {
        const {
          sessionKey,
          openid
        } = res || {};
        const result = {
          ...getAuthInfo(),
          appId,
          sessionKey,
          openId: openid,
          loading: false,
        };
        setAuthInfo(result);
        return result;
      }).catch((err) => {
        setAuthInfo({ ...getAuthInfo(), loading: false });
        return Promise.reject(err);
      }).finally(() => {
        openLoading && loading.close();
      }));
    },
    fail(err) {
      tips('错误', '获取授权码失败！');
      openLoading && loading.close();
      setAuthInfo({ ...getAuthInfo(), loading: false });
      reject(err);
    }
  });
  wx.checkSession({
    success() {
      const authInfo = getAuthInfo();
      if (authInfo?.id) {
        const result = {
          ...getAuthInfo(),
          loading: false
        };
        resolve(result);
        setAuthInfo(result);
        loading.close();
      } else reLogin();
    },
    fail() {
      reLogin();
    }
  });
});
export default {
  getAuthInfo,
  setAuthInfo,
  initAuth
};