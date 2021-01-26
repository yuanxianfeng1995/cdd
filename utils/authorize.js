export const applyForAuthorization = (scope) =>
  new Promise((resolve, reject) => wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) wx.authorize({
        scope,
        success() {
          resolve();
        },
        fail(err) {
          reject(err);
        }
      });
      else resolve();
    },
    fail(err) {
      reject(err);
    }
  }));