import Vue from "vue";
import { Vue2Storage } from "vue2-storage";
import VueIntro from 'vue-introjs';
import Directives from "@/directives/index";
import { storageOptions, constTagLabel } from "@/config/defaultSettings";

// pwa
import "@/registerServiceWorker";

// 第三方插件
import { i18n } from "@/plugins/element";

// 权限
import "@/router/permission";

// 组件引用
import "@/core/components_use";
import "@/core/views_components_use";
import '@/core/ican_components_use';

// 全局自定义样式
import "@/styles/index.scss";
// Intro.js 样式
import 'intro.js/introjs.css';

// 全局变量 typescript 需要在 ./shims-option.d.ts 添加类型
import {
  mergeByFirst,
  openPage,
  fillStatisticsArray,
  goToRedirect,
  openWindow,
  _shortcut,
  generateOrderPage,
} from "@/util/util";

// 全局filter
import * as filters from "@/filters/index";

Vue.prototype.$mergeByFirst = mergeByFirst;
Vue.prototype.$openPage = openPage;
Vue.prototype.$generateOrderPage = generateOrderPage;
Vue.prototype.$fillStatisticsArray = fillStatisticsArray;
Vue.prototype.$goToRedirect = goToRedirect;
Vue.prototype.$openWindow = openWindow;
Vue.prototype.$wxAppId = "wx92d9fe94daef034e";
Vue.prototype.$constTagLabel = constTagLabel;
Vue.prototype.$_shortcut = _shortcut;
Vue.prototype.$pathPrefix_UserStyle = "/channel/styles/user/";
Vue.prototype.$pathPrefix_SoStyle = "/channel/styles/so/";

// 使用 Vue use
Vue.use(Directives);
Vue.use(Vue2Storage, storageOptions);
Vue.use(VueIntro);
//加载过滤器
for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key as keyof typeof filters]);
}

export { i18n };
