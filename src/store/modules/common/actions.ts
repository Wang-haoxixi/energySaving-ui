/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from "lodash";
import router from "@/router/index";
import * as types from "./mutation-types";
import NotFoundRouterMap from "@/components/exception/notFoundRouterMap";
import { resetRouter } from "@/router";
import { getMenu } from "@/api/admin/menu";
import { getDictAllMap } from "@/api/admin/dict";
import { transToRouter } from "@/util/menu";
import { recursiveTraverse } from "@/util/util";
import { ActionContext } from "vuex";
import { getCityTree } from "@/api/admin/city";
import { getIndustryTree } from "@/api/dms/industry";
import { getPositionTree } from "@/api/dms/position";
import { getProfessionTree } from "@/api/dms/profession";
import { CommonState } from "./types";
import { RootState } from "@/store/types";

export const menuGet = async ({
  commit,
  dispatch,
}: ActionContext<CommonState, RootState>) => {
  try {
    dispatch("clearMenu");
    const { data } = await getMenu();
    const menu = _.cloneDeep(data);
    const routerMenu = transToRouter(menu);
    commit(types.SET_MENU, menu);
    commit(types.SET_ADD_ROUTERS, routerMenu);
    return menu;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const clearMenu = async ({
  commit,
}: ActionContext<CommonState, RootState>) => {
  commit(types.SET_MENU, []);
  commit(types.SET_ADD_ROUTERS, []);
  resetRouter();
};

export const menuRouterSet = async ({
  rootState,
  getters,
  dispatch,
}: ActionContext<CommonState, RootState>) => {
  try {
    await dispatch("menuGet");
    await dispatch("menuGroupGet");
    if (getters.userInfo.orgId) {
      router.addRoutes(rootState.user!.menuGroupRouter); // 如果有加入组织则可以进入SO工作台
    }
    router.addRoutes(getters.addRouters); // 动态添加可访问路由表
    router.addRoutes(NotFoundRouterMap); // 添加404及重定向路由规则
  } catch (error) {
    return Promise.reject(error);
  }
};
// 字典获取
export const dictGroupGet = async ({
  commit,
}: ActionContext<CommonState, RootState>) => {
  try {
    const data: any = await getDictAllMap();
    const dictMap = new Map(Object.entries(data));
    commit(types.SET_DICT_GROUP, dictMap);
  } catch (error) {
    return Promise.reject(error);
  }
};
// 城市获取
export const cityTreeGet = async ({
  commit,
}: ActionContext<CommonState, RootState>) => {
  try {
    const { data } = await getCityTree();
    data.forEach((m: any) => {
      recursiveTraverse(m);
    });
    commit(types.SET_CITY_TREE, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
// 行业获取
export const industryTreeGet = async ({
  commit,
}: ActionContext<CommonState, RootState>) => {
  try {
    const { data } = await getIndustryTree();
    data.forEach((m: any) => {
      recursiveTraverse(m);
    });
    commit(types.SET_INDUSTRY_TREE, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
// 岗位获取
export const positionTreeGet = async ({
  commit,
}: ActionContext<CommonState, RootState>) => {
  try {
    const { data } = await getPositionTree();
    data.forEach((m: any) => {
      recursiveTraverse(m);
    });
    commit(types.SET_POSITION_TREE, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
// 专业获取
export const professionTreeGet = async ({ commit }: ActionContext<CommonState, RootState>) => {
  try {
    const { data } = await getProfessionTree();
    data.forEach((m: any) => {
      recursiveTraverse(m);
    });
    commit(types.SET_PROFESSION_TREE, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getAllCommonData = ({ dispatch }: ActionContext<CommonState, RootState>) => {
  // 连接聊天服务器
  dispatch('connectIM');
  dispatch("dictGroupGet");
  dispatch("cityTreeGet");
  dispatch("industryTreeGet");
  dispatch("positionTreeGet");
  dispatch("professionTreeGet");
};
