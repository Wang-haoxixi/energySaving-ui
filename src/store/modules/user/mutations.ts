import Vue from "vue";
import * as types from "./mutation-types";
import { UserInfo } from "@/types/user";
import { UserState } from "./types";
import { IepMenuGroupItem } from "@/types/menu";

export default {
  [types.SET_USER_LOADING](state: UserState, userLoading: boolean) {
    state.userLoading = userLoading;
  },
  [types.SET_ACCESS_TOKEN](state: UserState, accessToken: string) {
    state.accessToken = accessToken;
    Vue.$storage.set(types.SET_ACCESS_TOKEN, accessToken);
  },
  [types.CLEAR_ACCESS_TOKEN](state: UserState) {
    state.accessToken = "";
    Vue.$storage.remove(types.SET_ACCESS_TOKEN);
  },
  [types.SET_EXPIRES_IN](state: UserState, expiresIn: number) {
    state.expiresIn = expiresIn;
    Vue.$storage.set(types.SET_EXPIRES_IN, expiresIn);
  },
  [types.SET_REFRESH_TOKEN](state: UserState, refreshToken: string) {
    state.refreshToken = refreshToken;
    Vue.$storage.set(types.SET_REFRESH_TOKEN, refreshToken);
  },
  [types.SET_PERMISSIONS](state: UserState, permissions: string[]) {
    state.permissions = permissions;
  },
  [types.SET_ROLES](state: UserState, roles: number[]) {
    state.roles = roles;
  },
  [types.SET_USERINFO](state: UserState, userInfo: UserInfo) {
    state.userInfo = userInfo;
  },
  [types.SET_ORG_LIST](state: UserState, orgList: []) {
    state.orgList = orgList;
  },
  [types.SET_NOTICE_READ_STATUS](state: UserState, isRead: boolean) {
    state.noticeReadStatus = isRead;
  },
  [types.SET_NOTICE_DIALOGSHOW](state: UserState, show: boolean) {
    state.noticeDialogShow = show;
  },
  [types.SET_CURRENT_MENU_GROUP](state: UserState, currentMenuGroup: IepMenuGroupItem) {
    state.currentMenuGroup = currentMenuGroup;
    Vue.$storage.set(types.SET_CURRENT_MENU_GROUP, currentMenuGroup);
  },
  [types.SET_MENU_GROUP](state: UserState, menuGroup: IepMenuGroupItem[]) {
    state.menuGroup = menuGroup;
    Vue.$storage.set(types.SET_MENU_GROUP, menuGroup);
  },
  [types.OPEN_REPORT_DIALOG](state: UserState, reportGroup: Record<string, any>) {
    state.reportGroup = {
      id: reportGroup.id,
      type: reportGroup.type,
    };
    state.reportDialogShow = reportGroup.show === undefined ? true : false;
  },
  [types.SET_MENU_GROUP_ROUTER](state: UserState, menuGroupRouter: any[]) {
    state.menuGroupRouter = menuGroupRouter;
  },
};
