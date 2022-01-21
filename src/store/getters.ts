/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RootState } from "./types";

const getters = {
  // common
  isCollapse: (state: RootState) => state.common!.isCollapse,
  menu: (state: RootState) => state.common!.menu,
  addRouters: (state: RootState) => state.common!.addRouters,
  tableSize: (state: RootState) => state.common!.tableSize,
  dictGroup: (state: RootState) => state.common!.dictGroup,
  cityTree: (state: RootState) => state.common!.cityTree,
  industryTree: (state: RootState) => state.common!.industryTree,
  positionTree: (state: RootState) => state.common!.positionTree,
  professionTree: (state: RootState) => state.common!.professionTree,
  // user
  userInfo: (state: RootState) => state.user!.userInfo,
  orgList: (state: RootState) => state.user!.orgList,
  accessToken: (state: RootState) => state.user!.accessToken,
  refreshToken: (state: RootState) => state.user!.refreshToken,
  expiresIn: (state: RootState) => state.user!.expiresIn,
  roles: (state: RootState) => state.user!.roles,
  permissions: (state: RootState) => state.user!.permissions,
  noticeReadStatus: (state: RootState) => state.user!.noticeReadStatus,
  currentMenuGroup: (state: RootState) => state.user!.currentMenuGroup,
  menuGroup: (state: RootState) => state.user!.menuGroup,
  // ics
  questionDialogShow: (state: RootState) => state.ics!.questionDialogShow,
};
export default getters;
