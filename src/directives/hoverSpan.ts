import { Message } from "element-ui";

const vHover = {
  bind(el: Element | any, { value }: any) {
    el.$value = value;
    el.handle = (value: string) => {
      if (!value) {
        Message("无绑定内容");
        return;
      }
      let n = 0;
      el.children.forEach((m: any) => {//找到元素下的SPAN 修改SPAN内容
        if (m.nodeName === "SPAN") {
          n++;
          m.innerHTML = value;
        }
      });
      if (!n) {//如果没有SPAN 则添加一个SPAN
        const span = document.createElement("span");
        span.className = "hover-span";
        span.innerHTML = value;
        el.appendChild(span);
      }
    };
    el.onmouseover = () => {
      el.$value.isFlag ? el.handle(el.$value.cancel) : el.handle(el.$value.default);
    };
    el.onmouseout = () => {
      el.$value.isFlag ? el.handle(el.$value.active) : el.handle(el.$value.default);
    };
    el.onmouseout();
    // el.addEventListener("click", el.handler);
  },
  componentUpdated(el: Element | any, { value }: any) {
    el.$value = value;
    el.onmouseout();
  },
  // 指令与元素解绑的时候，移除事件绑定
  // unbind(el: Element | any) {
  //   el.removeEventListener("mouseover", el.handler);
  //   el.removeEventListener("mouseout", el.handler);
  // },
};
export default vHover;
