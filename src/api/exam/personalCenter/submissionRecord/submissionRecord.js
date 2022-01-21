/**
 * 新增出题记录API请求接口
 */

import request from '@/router/axios';
/**
 * 获取出题列表页
 * @param {Object} params 参数
 */
export function getSubmissionRecordList(params) {
  return request({
    url: '/exms/iepitembank/page',
    method: 'get',
    params: params,
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
/**
 * 修改试题
 * @param {Object} params 参数
 */
export function postModify(params) {
  return request({
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'exms/iepitembank/update',
    method: 'post',
    data: params,
  });
}
