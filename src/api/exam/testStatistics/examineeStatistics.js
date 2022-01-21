import request from '@/router/axios';

/**
 * 获取列表数据
 * @param {Object} params 参数
 */

// 获取考生统计列表
export function getExamineeList(params) {
  return request({
    url: '/exms/iepexaminationstatistics/page',
    method: 'get',
    params: params,
  });
}

// 获取考生考试详情列表
export function getExamList(params) {
  return request({
    url: '/exms//iepexaminationstatistics/detailPage',
    method: 'get',
    params: params,
  });
}

// 获取考生证书详情列表
export function getCertificateMapList(params) {
  return request({
    url: '/exms/iepexaminationstatistics/certificateCount',
    method: 'get',
    params: params,
  });
}

// 获取所在组织列
export function getDepList(name) {
  return request({
    url: '/admin/org/list',
    method: 'get',
    params: {
      name,
    },
  });
}

/**
 * 获取试题选项
 * @param {Object} params 参数
 */
export function getTestOption(params) {
  return request({
    url: 'exms/dict/map',
    method: 'get',
    params: params,
  });
}

export function downloadFile(url) {
  request({
    url: '/admin/file' + url,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = url;
    document.body.appendChild(link);
    link.style.display = 'none';
    link.click();
  });
}
