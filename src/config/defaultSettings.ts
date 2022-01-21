import { StorageOptions, StorageDriver } from "vue2-storage";
import { getSec } from "@/util/util";
import { IepMenuGroupItem } from "@/types/menu";

const storageOptions: StorageOptions = {
  prefix: "iep__",
  driver: "local" as StorageDriver,
  ttl: getSec("h24"), // 24 hours
};

/**
 * 跳转类型
 */
enum OpenJumpType {
  path, // 可本域名链接和专有路由path = 0
  name, // 专有路由name = 1
  url, // 新tab打开 = 2
  bind, // 本tab替换 = 3
  spa // 隐藏页跳转 = 4
}

const constTagLabel = {
  abilityTag: {
    name: "兴趣标签",
    shortName: "兴趣",
    soName: "标签",
  },
};

const menuGroup: IepMenuGroupItem[] = [
  // 普通用户的菜单组
  {
    id: 0,
    name: "组织赋能台",
    path: "index",
    menuIds: [],
    permission: 2, // 普通SO成员 roleId
  },
  // 运营用户的菜单组
  {
    id: 1,
    name: "运营工作台",
    path: "yy",
    menuIds: [],
    permission: 6, // 平台管理 roleId
  },
  // 超管的菜单组
  {
    id: 100,
    name: "系统工作台",
    path: "sys",
    menuIds: [],
    permission: 1, // 超级管理员 roleId
  },
];

const shortcutMap = {
  报表: "/mlms/report",
  纪要: "/mlms/summary",
  材料: "/mlms/material/create",
  产品: "/cpms/product",
  任务: "/task/list",
  发布公告: "/operate/notice",
  产品审核: "/conm/certified_product",
  说说管理: "/conm/thought",
  订单管理: "/dms/order",
  合伙人管理: "/dms/manage",
  建议处理: "/operate/suggest",
  标签管理: "/tms/manage/tag_list",
  举报管理: "/operate/report",
  问卷管理: "/conm/questionnaire_list",
  活动管理: "/conm/review",
  问答库管理: "/conm/library",
  问卷: "/ques/questionnaire_so",
  活动: "/meetting/admin",
  发布任务: "/conm/official_task",
  考试库: "/exam/exam_library_management",
};

type ShortcutKeyName = keyof typeof shortcutMap;

const rateTexts = ["很差", "较差", "还行", "推荐", "力荐"];

export {
  storageOptions,
  constTagLabel,
  shortcutMap,
  ShortcutKeyName,
  menuGroup,
  OpenJumpType,
  rateTexts,
};
