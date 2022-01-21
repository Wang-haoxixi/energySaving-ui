/**
 * 新增模拟练习记录API请求接口
 */

import request from '@/router/axios';
/**
 * 获取模拟练习记录列表页
 * @param {Object} params 参数
 */
export function getPracticeRecordList(params) {
  return request({
    url: '/exms/iepexamination/practice/page',
    method: 'get',
    params: params,
  });
}
