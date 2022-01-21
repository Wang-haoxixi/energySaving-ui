/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * 全站权限配置
 */
import Vue from "vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router/index";
import store from "@/store";
import * as types from "@/store/modules/user/mutation-types";
import { Route } from "vue-router";
import { documentSetTitle, IepContainerScrollToTop, AppScrollToTop } from "@/util/util";
import { Notification } from "element-ui";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  NProgress.start();
  const meta = to.meta || {};
  const accessToken = Vue.$storage.get(types.SET_ACCESS_TOKEN);
  if (accessToken) {
    if (to.path === "/login") {
      next('/');
    } else {
      // 0 进入获取用户基本信息 1 以上就跳过进入正常页面
      if (store.getters.roles.length === 0) {
        if (store.getters.userInfo?.userId) {
          Notification({ title: "出了点问题", message: "角色已丢失，请向管理员申请", type: "warning" });
          next(false);
        } else {
          try {
            // 刷新页面不丢失token重新获取用户信息与菜单
            await store.dispatch("userGetInfo");
            await store.dispatch("menuRouterSet");
            // 获取通用数据以及其他操作
            store.dispatch('getAllCommonData');
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(to.query.redirect as string || to.path);
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true });
            } else {
              // 跳转到目的路由
              next({ path: redirect });
            }
          } catch (error) {
            console.error(error);
            await store.dispatch("userLogout");
            next({ path: "/login" });
          }
        }
      } else {
        next();
      }
    }
  } else {
    if (meta.isAuth === false) {
      next();
    } else {
      const redirect = encodeURIComponent(to.fullPath);
      next({
        path: `/login`,
        query: {
          redirect,
        },
      });
    }
  }
});

router.afterEach((to: Route) => {
  NProgress.done();
  if (to.matched[0].path === '/spa') {
    const titleArr = to.name?.split('-');
    documentSetTitle(titleArr ? titleArr[1] : '');
  } else {
    documentSetTitle(to.name || '');
  }
  AppScrollToTop();
  IepContainerScrollToTop();
});
