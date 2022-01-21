import { Message } from "element-ui";

const vHover = {
  bind(el: Element | any, { value }: any) {
    el.$value = value;
    el.onmouseover = () => {
      if (!el.$value) {
        Message("无绑定内容");
        return;
      }
      if (typeof value.ms != "undefined") {
        value.ms();
      }
      if (typeof value.class != "undefined") {
        el.classList.add(value.class);
      }
    };
    el.onmouseout = () => {
      if (!el.$value) {
        Message("无绑定内容");
        return;
      }
      if (typeof value.mo != "undefined") {
        value.mo();
      }
      if (typeof value.class != "undefined") {
        el.classList.remove(value.class);
      }
    };
    // el.addEventListener("click", el.handler);

  },
  componentUpdated(el: Element | any, { value }: any) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  // unbind(el: Element | any) {
  //   el.removeEventListener("mouseover", el.handler);
  //   el.removeEventListener("mouseout", el.handler);
  // },
};
export default vHover;
