import { Message } from "element-ui";
import request from "@/router/axios";
import { AxiosRequestConfig } from "axios";
// @/api/common
export function getCommonList(url: any, name: any) {
  return request({
    url: `/${url}/list`,
    method: "get",
    params: {
      name,
    },
  });
}

export function getCommonPage(url: any, params: any) {
  return request({
    url: `/${url}`,
    method: "get",
    params,
  });
}

export function downloadImg(url: string, name = "图片") {
  const filename = name + '.jpg';
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.style.display = "none";
  link.click();
}

export function downloadUrl(url: string, name = "") {
  const filename = name === "" ? url : name;
  request({
    url: "/admin/file/" + url,
    method: "get",
    responseType: "arraybuffer",
  }).then((response: any) => {
    // 处理返回的文件流
    const blob = new Blob([response]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.style.display = "none";
    link.click();
  });
}
export function downloadOssUrl(url: string, name = "") {
  const filename = name === "" ? url : name;
  request({
    url,
    method: "get",
    responseType: "arraybuffer",
  }).then((response: any) => {
    // 处理返回的文件流
    const blob = new Blob([response]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.style.display = "none";
    link.click();
  });
}

const downLoadMessage = [
  "文件较大，正在下载中，请耐心等候",
  "文件过大，需要较长下载时间，请耐心等候",
];

export function downloadFile(file: any) {
  const downLoadCode1 = window.setTimeout(() => {
    Message(downLoadMessage[0]);
  }, 1000 * 10);
  const downLoadCode2 = window.setInterval(() => {
    Message(downLoadMessage[1]);
  }, 1000 * 60);
  const opt: AxiosRequestConfig = {
    url: "/admin/file/" + file.url,
    method: "get",
    responseType: "arraybuffer",
    timeout: 3600000,
  };
  request(opt).then((response: any) => {
    // 处理返回的文件流
    const blob = new Blob([response]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name;
    document.body.appendChild(link);
    link.style.display = "none";
    link.click();
    // 关闭定时信息
    window.clearTimeout(downLoadCode1);
    window.clearInterval(downLoadCode2);
  });
}
