/**
 * 新增新试题API请求接口
 */

import request from '@/router/axios';
/**
 * 获取试题选项
 * @param {Object} params 参数
 */
export function getOptionList(params) {
  return request({
    url: 'exms/dict/map',
    method: 'get',
    params: params,
  });
}

/**
 * 获取列表
 */
export function dictList(params) {
  return request({
    url: '/exms/dict/page',
    method: 'get',
    params: params,
  });
}

/**
 * 添加
 * @param {*} obj
 */
export function addObj(obj) {
  return request({
    url: '/exms/dict/',
    method: 'post',
    data: obj,
  });
}

/**
 * 删除
 * @param {*} obj
 */
export function delObj(id) {
  return request({
    url: '/exms/dict/' + id,
    method: 'delete',
  });
}

/**
 * 修改
 * @param {*} obj
 */
export function putObj(obj) {
  return request({
    url: '/exms/dict/',
    method: 'put',
    data: obj,
  });
}

/**
 * 获取子项列表
 * @param {*} id
 */
export function getChild(id) {
  return request({
    url: '/exms/dict/child/' + id,
    method: 'get',
  });
}

/**
 * 新增子项
 * @param {*} params
 */
export function postChild(obj) {
  return request({
    url: '/exms/dict/child/create',
    method: 'post',
    data: obj,
  });
}

/**
 * 修改子项
 * @param {*} obj
 */
export function putChild(obj) {
  return request({
    url: '/exms/dict/child/update',
    method: 'post',
    data: obj,
  });
}

/**
 * 删除子项
 * @param {*} params
 */
export function deleteChildById(id) {
  return request({
    url: `/exms/dict/child/delete/${id}`,
    method: 'post',
  });
}
