import { UserInfo } from "@/types/user";
import { CommonData } from "@/types/common";
import { IepMenuGroupItem } from "@/types/menu";

// types.ts
export interface UserState {
  userLoading: boolean,
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  userInfo?: UserInfo,
  roles: number[],
  permissions: string[],
  orgList: CommonData[],
  noticeReadStatus: boolean
  noticeDialogShow: boolean,
  currentMenuGroup?: IepMenuGroupItem,
  menuGroup: IepMenuGroupItem[],
  menuGroupRouter: any[],
  reportDialogShow: boolean,
  reportGroup: object,
}
