import App from "@/App.vue";
import bootstrap from "@/core/bootstrap";
// 核心文件使用
import { i18n } from "@/core/use";
// 必要的引用变量
import router from "@/router/index";
import store from "@/store";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  created: bootstrap,
  render: h => h(App),
}).$mount("#app");
