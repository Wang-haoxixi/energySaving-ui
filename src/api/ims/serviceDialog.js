import request from "@/router/axios";
const prefixUrl = "/ims/serviceDialog";

export function getQuery(query) {
  return request({
    url: `${prefixUrl}/query/${query}`,
    method: "get",
  });
}

export function getDialogPage(query) {
  return request({
    url: `${prefixUrl}/getDialogPage`,
    method: "get",
    params: query,
  });
}

export function exportExcel(row) {
  request({
    url: `${prefixUrl}/exportExcel`,
    params: row,
    method: "get",
    responseType: "arraybuffer",
    timeout: "3600000",
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "record.xlsx";
    document.body.appendChild(link);
    link.style.display = "none";
    link.click();
  });
}
