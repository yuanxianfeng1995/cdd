import Vue from 'vue';
import App from '@/App';
import Container from '@/components/container';
import CuCustom from '@/color-ui/components/cu-custom.vue';
import store from '@/store';
import filter from '@/utils/filter';
import { tips } from '@/utils/tips';
import { toast } from '@/utils/toast';
import { loading } from '@/utils/loading';
Vue.component('CuCustom', CuCustom);
Vue.component('Container', Container);
Vue.config.productionTip = false;
Vue.prototype.$toast = toast;
Vue.prototype.$tips = tips;
Vue.prototype.$loading = loading;
Vue.prototype.$store = store;
App.mpType = 'app';




wx.onThemeChange(({ theme }) => store.setThemeMode(theme));
const app = new Vue({
    ...App,
		filters: filter,
});
app.$mount();
