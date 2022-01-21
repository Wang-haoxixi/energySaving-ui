import Vue from "vue";
import VueI18n from 'vue-i18n';
// 全局重置变量
import "@/styles/reset.scss";
import "@/styles/element-variables.scss";

import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementUI from "element-ui";
import { zh, en } from '@/locales/index';

Vue.component(CollapseTransition.name, CollapseTransition);

Vue.use(CollapseTransition);
Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    ...zh,
    ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
};
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
});

Vue.use(ElementUI, {
  i18n: (key: any, value: any) => i18n.t(key, value),
});

export { i18n };
