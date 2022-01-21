/**
 * 新增报名管理API请求接口
 */

import request from '@/router/axios';
/**
 * 获取试题列表
 * @param {Object} params 参数
 */
export function getExamRegistrationList(params) {
  return request({
    url: '/exms/iepentryform/getIepEntryFormPage',
    method: 'get',
    params: params,
  });
}
/**
 * 通过审核
 */
export function passExamerById(params) {
  return request({
    url: '/exms/iepentryform/batchState',
    method: 'post',
    data: params,
  });
}
/**
 * 撤销资格
 */
export function cancelExamerById(params) {
  return request({
    url: '/exms/iepentryform/changeStat',
    method: 'post',
    data: params,
  });
}

/**
 * 删除
 */
export function deleteById(params) {
  return request({
    url: '/exms/iepentryform/removeByIds',
    method: 'post',
    data: params,
  });
}
