/**
 * 新增专题考试记录API请求接口
 */

import request from '@/router/axios';
/**
 * 获取专题考试列表页
 * @param {Object} params 参数
 */
export function getTestRecordList(params) {
  return request({
    url: '/exms/iepexamination/selectById/page',
    method: 'get',
    params: params,
  });
}

/**
 * 获取专题考试分页
 * @param {Object} params 参数
 */
export function getTestRecordPage(params) {
  return request({
    url: '/exms/iepexamination/selectByUserId/page',
    method: 'get',
    params: params,
  });
}

/**
 * 获取证书
 * @param {Object} params 参数
 */
export function getCertificate(params) {
  return request({
    url: '/exms/iepcertificate/grantimage',
    method: 'get',
    params: params,
  });
}
