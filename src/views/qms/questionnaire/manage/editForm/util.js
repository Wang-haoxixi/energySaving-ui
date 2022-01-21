import {
  downLoad,
} from "@/api/qms/answer";

function downloadExe(response) {// 未使用参数 name
  // 处理返回的文件流
  const blob = new Blob([response.data], {
    type: "application/vnd.ms-excel",
  });
  return window.URL.createObjectURL(blob);
  // ie 兼容
  // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //   window.navigator.msSaveOrOpenBlob(blob, filename);
  // } else {
  //   const link = document.createElement("a");
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = name || filename;
  //   document.body.appendChild(link);
  //   link.style.display = "none";
  //   link.click();
  //   link.remove();
  // }
}
// 获取下载文件名
// function getTitle(contentDisposition) {
//   let obj = "";
//   const list = contentDisposition.split("; ");
//   list.forEach(item => {
//     const n = item.split("=");
//     if (n[1]) {
//       obj = n[1];
//     } else {
//       obj = n[0];
//     }
//   });
//   return obj;
// }
export async function getUrl(data) {
  const a = await downLoad(data).then(res => {
    return downloadExe(res, data.original);
  });
  // let a = "";
  return a;
}
