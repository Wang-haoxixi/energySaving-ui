import { register } from "register-service-worker";
import { Notification } from "element-ui";

const showNotifacation = (title: string, message: string) => {
  Notification({
    title, message, type: "warning",
    position: "bottom-right", dangerouslyUseHTMLString: true,
  });
};

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("Service worker 正在从缓存中提供应用");
    },
    registered() {
      console.log("Service worker 已注册");
    },
    cached() {
      console.log("内容已缓存以供脱机使用");
      showNotifacation("提醒", "此网页应用可安装，点击地址栏右上角即可安装至桌面");
    },
    updatefound() {
      console.log("正在下载新内容");
      showNotifacation("更新", "正在下载新内容");
    },
    updated() {
      console.log("有新内容可用，请刷新");
      showNotifacation("更新完成", "有新内容可用，请刷新");
    },
    offline() {
      console.log("找不到互联网连接。 应用正在离线模式下运行");
      showNotifacation("提醒", "找不到互联网连接。 应用正在离线模式下运行");
    },
    error(error) {
      console.error("Service worker 注册期间发生错误：", error);
    },
  });
}
