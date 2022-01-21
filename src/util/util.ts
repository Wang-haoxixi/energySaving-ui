import _ from "lodash";
import CryptoJS from "crypto-js";
import router from "@/router/index";
import website, { defaultRoutePath } from "@/const/website";
import { ShortcutKeyName, shortcutMap, OpenJumpType } from "@/config/defaultSettings";
import { Route } from 'vue-router';
import store from '@/store/index';
import { OrderInfo } from '@/types/order';
import * as types from "@/store/modules/common/mutation-types";
// 表单序列化
export const serialize = (data: any): string => {
  const list: string[] = [];
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};
/**
 * 容器中的页面滚动置顶
 */
export const IepContainerScrollToTop = () => {
  const oScroll = document.querySelector("#iep-container-scroll");
  oScroll && (oScroll.scrollTop = 0);
};
/**
 * 频道页面滚动置顶
 */
export const AppScrollToTop = () => {
  const oApp = document.querySelector("#app");
  oApp && (oApp.scrollTop = 0);
};

/**
 *加密处理
 */
export const encryption = (params: any) => {
  // let { key } = params;
  let key = "gdscloudprisbest";
  const { data, type, param } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach((ele: any) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele: any) => {
      const data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      const iv = key;
      // 加密
      const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number, date: boolean) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random = random + Date.now();
  return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url: string, title: string, w = 1100, h = 900) => {
  // Fixes dual-screen position
  const dualScreenLeft = window.screenLeft;
  const dualScreenTop = window.screenTop;

  const width = window.innerWidth ?? document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight ?? document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`);

  // Puts focus on the newWindow
  if (window.focus && newWindow) {
    newWindow.focus();
  }
};
/**
 * 覆盖对象属性
 * @param distObject 初始化对象
 * @param srcObject 传递过来新对象
 */
export function mergeByFirst<T>(distObject: T, srcObject: Partial<T>) {
  const distPropList = _.keys(distObject);
  const srcPropList = _.keys(_.omitBy(srcObject, _.isNil));
  const propList = _.intersection(distPropList, srcPropList);
  return {
    ...distObject,
    ..._.pick(srcObject, propList),
  };
}
/**
 * 通用跳转方法
 * @param value 路径或者其他值
 * @param type 跳转类型
 */
export function openPage(value: string, type: OpenJumpType = OpenJumpType.path) {
  if (type === OpenJumpType.path) {
    // console.log(document.location.pathname, value);
    if (document.location.pathname !== value) {
      if (value.includes("http") || value.includes("https")) {
        window.location.href = value;
      } else {
        router.push({
          path: value,
        });
      }
    } else {
      AppScrollToTop();
      return;
    }
  }
  if (type === OpenJumpType.name) {
    router.push({
      name: value,
    });
    return;
  }
  if (type === OpenJumpType.url) {
    window.open(value, "_blank");
    return;
  }
  if (type === OpenJumpType.bind) {
    window.location.href = value;
    return;
  }
  if (type === OpenJumpType.spa) {
    router.push({
      path: `/spa${value}`,
    });
    return;
  }
}
/**
 * 获取重定向路径
 * @param $route 当前路由
 */
export const getRedirect = ($route: Route, isWx = false) => {
  // debugger;
  let redirect: any = store.state.common?.redirect;
  if (isWx) {
    redirect = store.state.common?.wxRedirect;
  }
  if (_.isString(redirect) && redirect !== '') {
    return redirect;
  }
  redirect = $route.query.redirect;
  if (_.isString(redirect)) {
    const path = decodeURIComponent(redirect) ?? defaultRoutePath;
    return path;
  } else {
    return defaultRoutePath;
  }
};
/**
 * 重定向页面
 * @param route 当前路由
 */
export const goToRedirect = ($route: Route, isWx = false) => {
  // debugger;
  if (isWx) {
    const path = getRedirect($route, isWx);
    openPage(path);
    store.commit(types.SET_WX_REDIRECT, '');
  } else {
    const path = getRedirect($route);
    if (document.location.pathname === '/register') {
      openPage(`${path}?welcome=true`);
    } else {
      openPage(path);
    }
  }
};

/**
 * 生成加密字符并跳转
 * @param orderInfo 前端固定传参
 */
export const generateOrderPage = (orderInfo: OrderInfo) => {
  const oI = JSON.stringify(orderInfo);
  const words = CryptoJS.enc.Utf8.parse(oI);
  const base64 = CryptoJS.enc.Base64.stringify(words);
  const id = encodeURIComponent(base64);
  // 生成订单
  openPage(`/channel/order/${id}/confirm`);
};

export const decodeOrderId = (id: string): OrderInfo => {
  const base64 = decodeURIComponent(id);
  const words = CryptoJS.enc.Base64.parse(base64);
  const textString = CryptoJS.enc.Utf8.stringify(words);
  const orderInfo = JSON.parse(textString);
  return orderInfo;
};

/**
 * 统计数据处理
 * @param oldData 初始化数据
 * @param newData 后端传递过来的数据
 * @param force 是否强制转换
 */
export function fillStatisticsArray(oldData: [], newData: [], force = false): number[] {
  const newStatistics: number[] = [];
  for (let i = 0; i < oldData.length; i++) {
    const element = oldData[i];
    const newElement = newData[i];
    if (force || newElement) {
      newStatistics.push(newElement);
    } else {
      newStatistics.push(element);
    }
  }
  return newStatistics;
}

export function customTree(origin: any, oOpt: any = { label: "name", value: "menuId" }) {

  const target: any[] = [];
  const rOpt = { label: "label", value: "value" };
  const myTree = _.cloneDeep(origin);
  function addPath(myTree: []) {
    myTree.forEach((element: any) => {
      const myLabel = element[oOpt.label];
      const myValue = element[oOpt.value];
      const obj = {
        [rOpt.label]: myLabel,
        [rOpt.value]: myValue,
        parentId: element.parentId,
      };
      const isChild = element.children && element.children.length !== 0;
      if (isChild) {
        addPath(element.children);
        target.push(obj);
      } else {
        target.push(obj);
      }
    });
  }
  addPath(myTree);
  return target;

}
/**
 * 通过形象字符活动转换后，真实的秒数
 * @param str 形象字符
 */
export function getSec(str: string) {
  const str1 = Number(str.substring(1, str.length));
  const str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}
/**
 * 设置网页标题
 * @param name 标题
 */
export function documentSetTitle(name: string) {
  const title = `${name}_${website.title} - ${website.slogan}`;
  document.title = title;
}
/**
 * 获取对应的颜色
 * @param str 随机字符串
 */
export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
/**
 * 想对象树转换成数组
 * @param root 对象树
 */
export const convertTreeToList = (root: any) => {
  const stack: any[] = [], array: any[] = [];
  stack.push(root);

  while (stack.length !== 0) {
    const node = stack.pop();
    const { children } = node;
    delete node.children;
    array.push(node);
    if (children?.length !== 0) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }

  return array;
};
/**
 * 处理对象树, 并移除空子树
 * @param node 对象树
 * @param action 具体处理函数
 */
export const recursiveTraverse = (node: any, action?: Function) => {
  if (!node) { return; }
  else if (!node.children) {
    delete node.children;
    return;
  } else if (node.children.length === 0) {
    delete node.children;
  } else {
    node.children.forEach((item: any) => {
      recursiveTraverse(item, action);
    });
  }
  if (action) {
    action(node);
  }
};

/**
 * 解析出所有的节点id
 * @param json 待解析的json串
 * @param idArr 原始节点数组
 * @param temp 临时存放节点id的数组
 * @return 节点id数组
 */
export const resolveAllEunuchNodeId = (json: any, idArr: number[], temp: any) => {
  for (const item of json) {
    // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
    if (item.children?.length !== 0) {
      resolveAllEunuchNodeId(item.children, idArr, temp);
    } else {
      temp.push(idArr.filter(id => id === item.id));
    }
  }
  return temp;
};
/**
 * 快捷跳转
 */
export const _shortcut = (name: ShortcutKeyName) => {
  openPage(shortcutMap[name]);
};
/**
 * 网址转链接
 * @param content 链接
 */
export const httpToLink = (content: string) => {
  const reg1 = /<(?!a|\/a).*?>/g;
  let text = content.replace(reg1, "");
  const reg2 = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:)+)/g;
  text = text.replace(reg2, "<a href='$1$2' target='_blank'>$1$2</a>");
  return text;
};
/**
 * 改动路由但不跳转路由
 * @param params query
 * @param $route Route
 */
export const addParamsToLocation = (params: any, $route: Route) => {
  history.pushState(
    {},
    '',
    $route.path +
    '?' +
    Object.keys(params)
      .map(key => {
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        );
      })
      .join('&'),
  );
};
/**
 * 数组换位
 * @param arr 要修改的数组
 * @param index1 索引1
 * @param index2 索引2
 */
export const swapArr = (arr: any[], index1: number, index2: number) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

/**
 * 判断是否为移动设备
 */
export function browserRedirect() {
  const sUserAgent: string = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i)?.toString() === "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i)?.toString() === "iphone os";
  const bIsMidp = sUserAgent.match(/midp/i)?.toString() === "midp";
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)?.toString() === "rv:1.2.3.4";
  const bIsUc = sUserAgent.match(/ucweb/i)?.toString() === "ucweb";
  const bIsAndroid = sUserAgent.match(/android/i)?.toString() === "android";
  const bIsCE = sUserAgent.match(/windows ce/i)?.toString() === "windows ce";
  const bIsWM = sUserAgent.match(/windows mobile/i)?.toString() === "windows mobile";

  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) return true;
  return false;
}

/**
 * 判断数组是否有重复项
 */
export const isArrRepeat = (arr: any[] = []) => {
  return !(arr.length === _.uniq(arr).length);
};
