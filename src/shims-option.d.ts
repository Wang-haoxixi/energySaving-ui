import { fillStatisticsArray, goToRedirect, mergeByFirst, openPage, openWindow, _shortcut, generateOrderPage } from "./util/util";
import { constTagLabel } from "./config/defaultSettings";
declare module "vue/types/vue" {
  // 可以使用 `VueConstructor` 接口
  // 来声明全局属性
  interface Vue {
    $mergeByFirst: typeof mergeByFirst,
    $openPage: typeof openPage,
    $generateOrderPage: typeof generateOrderPage,
    $fillStatisticsArray: typeof fillStatisticsArray,
    $goToRedirect: typeof goToRedirect,
    $openWindow: typeof openWindow,
    $wxAppId: string
    $constTagLabel: typeof constTagLabel,
    $_shortcut: typeof _shortcut,
    $pathPrefix_UserStyle: string,
    $pathPrefix_SoStyle: string,
  }
}
