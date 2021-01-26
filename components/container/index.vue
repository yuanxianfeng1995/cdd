<template>
  <view
    class="root full"
    :style="style"
    :data-theme-mode="mode"
  >
    <CuCustom
      style-inner="background-image:linear-gradient(to bottom,var(--background-color-main-0),var(--background-color-main-1))"
      :isBack="isBack"
    >
      <text
        slot="backText"
        style="color:#fff;"
      >返回</text>
      <block slot="content">{{title}}</block>
      <slot
        slot="action"
        name="action"
      />
    </CuCustom>
    <slot
      v-if="!authInfo.loading"
      :scope="scope"
      :auth-info="authInfo"
      :user-info="userInfo"
    />
    <view v-else>
      <slot name="loading" />
    </view>
    <TabBar
      v-if="tabbar"
      :value="value"
      @input="input"
      @change="change"
    />
  </view>
</template>
<script>
import { on, off } from '../../utils/event-hub';
import { getCurrentFullPath } from '@/utils/router';
import { gotoLogin } from '@/utils/navigation';
import TabBar from '../tab-bar';
export default {
  name: 'Container',
  props: {
    tabbar: {
      type: Boolean,
      default: false,
    },
    value: String,
    isBack: {
      type: Boolean,
      default: true,
    },
    title: String,
    style: String,
    scope: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    TabBar,
  },
  data() {
    const { $store } = this;
    return {
      authInfo: $store.getAuthInfo(),
      userInfo: $store.getUserInfo(),
      mode: $store.getThemeMode(),
    };
  },
  beforeCreate() {
    const mode = this.$store.getThemeMode();
    const { frontColor, backgroundColor } = {
      light: { frontColor: '#000000', backgroundColor: '#ffffff' },
      dark: { frontColor: '#ffffff', backgroundColor: '#000000' },
    }[mode];
  },
  created() {
    this.addEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    input(data) {
      this.$emit('input', data);
    },
    change(data) {
      this.$emit('change', data);
    },
    addEvent() {
      on('updateAuthInfo', (data) => {
        this.authInfo = data;
        const userInfo = this.$store.getUserInfo();
        // if (!userInfo.id) gotoLogin();
        // else this.userInfo = userInfo;
        this.userInfo = userInfo || {};
      });
      on('updateThemeMode', (data) => (this.mode = data));
      on('updateUserInfo', (data) => (this.userInfo = data));
    },
    removeEvent() {
      off('updateAuthInfo', () => {});
      off('updateThemeMode', () => {});
      off('updateUserInfo', () => {});
    },
  },
};
</script>
<style scoped>
@keyframes loading {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 125vmax;
  }
}
.root {
  background-color: var(--background-color-0);
  color: var(--font-color-0);
}
</style>
