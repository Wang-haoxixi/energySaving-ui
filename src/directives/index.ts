import copy from "./copy";
import hover from "./hover";
import hoverSpan from "./hoverSpan";
import dialogDrag from "./dialogDrag";
import { VueConstructor } from "vue";
// 自定义指令
const directives = {
  copy,
  hover,
  hoverSpan,
  dialogDrag,
};
// 这种写法可以批量注册指令
export default {
  install(Vue: VueConstructor) {
    for (const key of Object.keys(directives)) {
      Vue.directive(key, directives[key as keyof typeof directives]);
    }
  },
};
