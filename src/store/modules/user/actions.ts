import Vue from "vue";
import * as types from "./mutation-types";
import { getUserInfo, userChangeOrg } from "@/api/admin/user";
import { postLogin } from "@/api/auth/oauth";
import { postLoginByMobile } from "@/api/auth/mobile";
import { postLogout } from "@/api/auth/token";
import { refreshToken, loginBySocial } from "@/api/login";
import { encryption, openPage } from "@/util/util";
import { AuthLogin } from "@/types/auth";
import { SysUserPermissions, UserEntity } from "@/types/user";
import { ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { IepMenuGroupItem } from "@/types/menu";
import { getMenuGroupList } from "@/api/admin/menu_group";
import { getWorkPlaceRoute } from '@/util/menu';
/**
 * 判断用户是普通登陆还是手机号登陆
 * @param user
 */
const judgePassOrMobile = async (user: any) => {
  if (user.type === "0") {
    return await postLogin(user.username, user.password, user.code, user.randomStr);
  }
  if (user.type === "1") {
    return await postLoginByMobile(user.username, user.vCode);
  } else {
    return await null;
  }
};
/**
 * 统一 et token
 * @param param0
 * @param res
 */
export const userSaveToken = ({ commit }: ActionContext<UserState, RootState>, res: any) => {
  const data: AuthLogin = { ...res };
  commit(types.SET_ACCESS_TOKEN, data.access_token);
  commit(types.SET_EXPIRES_IN, data.expires_in);
  commit(types.SET_REFRESH_TOKEN, data.refresh_token);
  return data;
};
/**
 * 用户登陆
 * @param param0
 * @param form
 */
export const userLogin = async ({ commit, dispatch }: ActionContext<UserState, RootState>, form: any) => {
  try {
    commit(types.SET_USER_LOADING, true);
    const user = encryption({
      data: form,
      param: ["password"],
    });
    const res: any = await judgePassOrMobile(user);
    if (res.code === 1) {
      return res.data;
    }
    const data = dispatch('userSaveToken', res);
    // 获取用户信息
    await dispatch("userGetInfo");
    await dispatch("menuRouterSet");
    // 获取通用数据以及其他操作
    dispatch('getAllCommonData');
    return data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    commit(types.SET_USER_LOADING, false);
  }
};

// 根据OpenId登录
export const userLoginBySocial = async ({ dispatch }: ActionContext<UserState, RootState>, param: any) => {
  try {
    const res: any = await loginBySocial(param.state, param.code);
    const data = dispatch('userSaveToken', res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 退出登陆
 * @param param0
 */
export const userLogout = async ({ dispatch }: ActionContext<UserState, RootState>) => {
  try {
    await postLogout();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch("clearUserInfo");
    dispatch("clearMenu");
    // 断开聊天服务器
    dispatch('disconnectIM');
  }
};

/**
 * 刷新token
 * @param param0
 */
export const userRefreshToken = async ({ dispatch, state }: ActionContext<UserState, RootState>) => {
  try {
    const res: any = await refreshToken(state.refreshToken);
    const data = dispatch('userSaveToken', res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 获取用户基本信息
 * @param param0
 */
export const userGetInfo = async ({ commit }: ActionContext<UserState, RootState>) => {
  try {
    const res: any = await getUserInfo();
    const data: SysUserPermissions = { ...res.data };
    // 设置权限需要的工作台
    commit(types.SET_ROLES, data.roles);
    commit(types.SET_PERMISSIONS, data.permissions);
    // 组织获取 后端限制了前10个
    commit(types.SET_ORG_LIST, data.userInfo.orgVOS.map(m => ({
      id: m.orgId,
      name: m.name,
      avatar: m.avatar,
      isAdmin: m.isAdmin,
    })));
    const { userInfo } = data;
    commit(types.SET_USERINFO, userInfo);
    // 设置已经公告状态
    commit(types.SET_NOTICE_READ_STATUS, data.userInfo.isRead);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 清除用户信息
 * @param param0
 */
export const clearUserInfo = async ({ commit }: ActionContext<UserState, RootState>) => {
  try {
    commit(types.SET_ACCESS_TOKEN, "");
    commit(types.SET_EXPIRES_IN, 0);
    commit(types.SET_REFRESH_TOKEN, "");
    commit(types.SET_USERINFO, new UserEntity());
    commit(types.SET_ROLES, []);
    commit(types.SET_PERMISSIONS, []);
    commit(types.SET_CURRENT_MENU_GROUP, null);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 改变工作台
 * @param param0
 * @param menuGroup
 */
export const changeUserDashBoard = async ({ commit }: ActionContext<UserState, RootState>, thisMenuGroup: IepMenuGroupItem) => {
  commit(types.SET_CURRENT_MENU_GROUP, thisMenuGroup);
  openPage(`/wel/${thisMenuGroup.path}`);
};
/**
 * 设置菜单组
 * @param param0
 */
export const menuGroupGet = async ({
  state,
  commit,
}: ActionContext<UserState, RootState>) => {
  try {
    const { data } = await getMenuGroupList();
    commit(types.SET_MENU_GROUP, data);
    const current = Vue.$storage.get(types.SET_CURRENT_MENU_GROUP);
    // 根据Role确定可用的工作台
    const filterMenuGroup = state.menuGroup.filter(m => state.roles.includes(m.permission));
    commit(types.SET_MENU_GROUP_ROUTER, getWorkPlaceRoute(filterMenuGroup));
    // 如果当前工作台没有确定, 则取第一个可访问的工作台
    if (!current) {
      commit(types.SET_CURRENT_MENU_GROUP, filterMenuGroup[0]);
    } else {
      commit(types.SET_CURRENT_MENU_GROUP, Vue.$storage.get(types.SET_CURRENT_MENU_GROUP));
    }
    // 设置工作台路由
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 改变组织
 * @param param0
 * @param id
 */
export const orgChangeAction = async ({
  state,
  commit,
  dispatch,
}: ActionContext<UserState, RootState>, id: number) => {
  try {
    const { data } = await userChangeOrg(id);
    if (data) {
      await dispatch("userGetInfo");
      await dispatch("menuRouterSet");
      const filterMenuGroup = state.menuGroup.filter(m => state.roles.includes(m.permission));
      commit(types.SET_CURRENT_MENU_GROUP, filterMenuGroup[0]);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
