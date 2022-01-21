import Vue from "vue";
import { serialize } from "@/util/util";
import axios from "axios";
import qs from "qs";
import NProgress from "nprogress"; // progress bar
import { getErrorCode, ErrorCodeKey } from "@/const/errorCode";
import { MessageBox, Notification } from "element-ui";
import "nprogress/nprogress.css";
import store from "@/store"; // progress bar style
import router from "@/router";
import * as types from "@/store/modules/user/mutation-types";
import { ElNotificationOptions } from 'element-ui/types/notification';
import { ElMessageBoxOptions } from 'element-ui/types/message-box';

const 换行转换 = (message: string) => {
  return message.replace(/\\n/g, '<br>');
};

const openErrorMessage = (msg: string) => {
  let message = "";
  if (msg === undefined) {
    message = "服务器出了点小差";
    console.log("发生空指针");
  } else if
    (msg.includes("###")) {
    console.log(msg);
    message = "数据库查询发生错误, 请查看控制台";
  } else {
    console.log(msg);
    message = msg;
  }
  // 判断测试站直接报错但正式站不提示弹框错误
  const replaceMsg = 换行转换(message);
  const opt: ElNotificationOptions = { title: "错误", message: replaceMsg, type: "warning", dangerouslyUseHTMLString: true };
  if (process.env.NODE_ENV !== "production") {
    opt.title = "错误";
  } else {
    opt.title = "提示";
  }
  Notification(opt);
};

const openLockDialog = (msg: string) => {
  const replaceMsg = 换行转换(msg);
  const opt: ElMessageBoxOptions = {
    title: '提示', message: replaceMsg, type: "warning", dangerouslyUseHTMLString: true,
  };
  MessageBox(opt);
};

axios.defaults.timeout = 30000;
axios.defaults.baseURL = "/api";

// const source = axios.CancelToken.source();
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
});

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start(); // start progress bar
  const isToken = (config.headers || {}).isToken === false;
  const accessToken = Vue.$storage.get(types.SET_ACCESS_TOKEN);
  if (accessToken && !isToken) {
    config.headers["Authorization"] = "Bearer " + accessToken; // token
  }
  // config.cancelToken = source.token;
  // headers中配置serialize为true开启序列化
  if (config.method === "post" && config.headers.serialize) {
    config.data = serialize(config.data);
    delete config.data.serialize;
  }
  if (config.method === "get") {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: "brackets" });
    };
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use((res: any) => {
  NProgress.done();
  const status = (String(res.status) || "200") as ErrorCodeKey;
  const message = getErrorCode(status, res.data.message);
  if (status === "401") {
    openErrorMessage(message);
    store.dispatch("clearUserInfo").then(() => {
      router.push({ path: "/login" });
    });
    return;
  } else if (/4\d\d/.test(status)) {
    openErrorMessage(message);
    return res.data;
  } else {
    if (res.data.code === 4001) {
      openLockDialog(message);
      return;
    } else if (res.data.code === 1) {
      openErrorMessage(message);
    }
    return res.data;
  }
}, error => {
  // 处理其他异常
  NProgress.done();
  return Promise.reject(new Error(error));
});


export default axios;
