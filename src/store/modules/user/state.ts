import { UserState } from "./types";
import { UserEntity } from "@/types/user";

const userState: UserState = {
  userLoading: false,
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
  userInfo: new UserEntity(),
  roles: [],
  permissions: [],
  orgList: [],
  noticeReadStatus: true,
  noticeDialogShow: false,
  currentMenuGroup: undefined,
  menuGroup: [],
  menuGroupRouter: [],
  reportDialogShow: false,
  reportGroup: {
    id: 0,
    type: 0,
  },
};

export default userState;
