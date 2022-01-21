/**
 * 新增新试题API请求接口
 */

import request from '@/router/axios';
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
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getTestList(params) {
  return request({
    url: 'exms/iepexamination/findexamrecord',
    method: 'get',
    params: params,
  });
}

/**
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getPracticeTestList(params) {
  return request({
    url: 'exms/iepexamination/findimiexamrecord',
    method: 'get',
    params: params,
  });
}

/**
 * 报名提交
 * @param {Object} params 参数
 */
export function postSign(params) {
  return request({
    url: 'exms/iepentryform/save',
    method: 'post',
    data: params,
  });
}

/**
 * 查看考试
 * @param {Object} params 参数
 */
export function getResultInfo(params) {
  return request({
    url: 'exms/examer/resultinfo',
    method: 'get',
    params: params,
  });
}
