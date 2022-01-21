import Vue from "vue";
// import store from "@/store";
import VueRouter from "vue-router";
import PageRouter from "@/page/router";
import myRouter from "@/views/my/router";
import channelRouter from "@/views/channel/router";
import channelProxyProductRouter from "@/views/channel/proxyProduct/router.ts";
import channelThoughtRouter from "@/views/channel/thought/router.ts";
import exceptionRouter from "@/components/exception/router";
import odsRouter from "@/views/ods/router";
import routerShare from "@/views/ods/routerDataShare";

Vue.use(VueRouter);

// 捕捉重复报错
const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: object) {
  return originalPush.call(this, location).catch((err: object) => err);
};
const originalReplace: any = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location: object) {
  return originalReplace.call(this, location).catch((err: object) => err);
};

// function routerFromStore(router: VueRouter) {
//   const addRouters = store.getters.addRouters;
//   router.addRoutes(addRouters);
// }

const createRouter: () => VueRouter = () =>
  new VueRouter({
    mode: "history",
    routes: [],
  });

const Router = createRouter();

export function initRouter(router: VueRouter) {
  // routerFromStore(router);
  router.addRoutes([
    ...PageRouter,
    ...myRouter,
    ...channelRouter,
    ...channelProxyProductRouter,
    ...channelThoughtRouter,
    ...exceptionRouter,
    ...odsRouter,
    ...routerShare,
  ]);
}

initRouter(Router);



export const resetRouter = () => {
  const newRouter = createRouter();
  initRouter(newRouter);
  (Router as any).matcher = (newRouter as any).matcher;
};

export default Router;
