<script>
import Vue from 'vue';
import { setThemeMode } from '@/store/theme';
const check = () => {
  wx.getSystemInfo({
    success({ theme }) {
      setThemeMode(theme);
    },
  });
};
let first = true;
export default {
  onLaunch: function () {
    check();
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });
    console.log('App Launch');
  },
  onShow: function () {
    !first && check();
    first = false;
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
@import 'color-ui/main.css';
@import 'color-ui/icon.css';
@import './styles/index.scss';
</style>
