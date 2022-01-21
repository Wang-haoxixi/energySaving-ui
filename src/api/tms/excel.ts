import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/excel

function getDownload(path: any, fileName: string) {
  return request({
    url: `${prefixUrl}${path}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.xls`;
    link.click();
  });
}
export function getTagExcelExport() {
  return getDownload("/excel/export", "标签导出信息");
}

// 提交
export function getModelExcel() {
  return getDownload("/excel/model_download", "导入模板");
}