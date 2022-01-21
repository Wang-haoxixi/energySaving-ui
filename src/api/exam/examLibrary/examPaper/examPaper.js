/**
 * 新增考卷管理API请求接口
 */

import request from '@/router/axios';
/**
 * 获取考卷管理列表页
 * @param {Object} params 参数
 */
export function getExamPaperList(params) {
  return request({
    url: 'exms/iepexaminationmanagement/page',
    method: 'get',
    params: params,
  });
}

/**
 * 收卷
 */
export function RollingTestById(params) {
  return request({
    url: 'exms/iepexaminationmanagement/changeStat',
    method: 'post',
    data: params,
  });
}

/**
 * 设为可考
 */
export function setTestById(params) {
  return request({
    url: 'exms/iepexaminationmanagement/changeNoState',
    method: 'post',
    data: params,
  });
}


/**
 * 删除
 */
export function deleteById(params) {
  return request({
    url: 'exms/iepexaminationmanagement/removeById',
    method: 'post',
    data: params,
  });
}
