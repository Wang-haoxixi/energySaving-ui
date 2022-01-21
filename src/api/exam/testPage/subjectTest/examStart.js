/**
 * 新增开始考试API请求接口
 */

import request from '@/router/axios';
/**
 * 获取试题选项
 * @param {Object} params 参数
 */
export function getTestPageById(params) {
  return request({
    url: 'exms/iepcorrqstn/getTestPage',
    method: 'post',
    data: params,
  });
}

/**
 * 获取试题选项
 * @param {Object} params 参数
 */
// export function getsubjectById (params) {
//     return request({
//         url: 'exms/',
//         method: 'post',
//         data: params,
//     })
// }
