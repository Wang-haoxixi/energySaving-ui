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
