import request from '@/router/axios';

export function getExamPage(obj) {
  return request({
    url: '/exms/iepitembank/page',
    method: 'get',
    params: obj,
  });
}

/**
 * 获取证书库管理列表
 * @param {Object} params 参数
 */
export function getCertificatePage(params) {
  return request({
    url: 'exms/iepcertificate/page',
    method: 'get',
    params: params,
  });
}

/**
* 提交新增的证书库
* @param {Object} params 对象
*/
export function postCertificate(obj) {
  return request({
    url: 'exms/iepcertificate/save',
    method: 'post',
    data: obj,
  });
}

/**
* 提交修改的证书库
* @param {Object} params 对象
*/
export function putCertificate(obj) {
  return request({
    url: 'exms/iepcertificate/updateById',
    method: 'post',
    data: obj,
  });
}

/**
 * 删除证书
 */
export function deleteById(id) {
  return request({
    url: 'exms/iepcertificate/deleteById',
    method: 'post',
    data: id,
  });
}

/**
* 批量删除证书
*/
export function deleteIdAll(ids) {
  return request({
    url: 'exms/iepcertificate/deleteById',
    method: 'post',
    data: ids,
  });
}

// 验证通用政策
export function validCertificateTitle(params) {
  return request({
    url: 'exms/iepcertificate/getByTitle',
    method: 'get',
    params: params,
  });
}
