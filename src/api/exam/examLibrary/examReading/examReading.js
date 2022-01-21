/**
 * 新增阅卷管理API请求接口
 */

import request from '@/router/axios';
/**
 * 获取阅卷管理列表页
 * @param {Object} params 参数
 */
export function getExamReadingList(params) {
  return request({
    url: '/exms/grade/page',
    method: 'get',
    params: params,
  });
}

/**
 * 删除
 */
export function deleteById(id) {
  return request({
    url: 'exms',
    method: 'post',
    data: id,
  });
}

/**
* 批量删除
*/
export function deleteIdAll(ids) {
  return request({
    url: 'exms',
    method: 'post',
    data: ids,
  });
}


/**
 *点击笔试阅卷先判断是否可以进行笔试阅卷
 */
export function judgeWrittenById(id) {
  return request({
    url: '/exms/grade/check',
    method: 'post',
    data: id,
  });
}

/**
 *根据id获取笔试阅卷信息
 */
export function passWrittenById(params) {
  return request({
    url: '/exms/grade/makding',
    method: 'post',
    data: params,
  });
}


/**
 * 提交选择题判分表单
 */
export function passChoiceById(params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  });
}

/**
 * 根据id获取面试信息
 */
export function getInterviewById(id) {
  return request({
    url: `/exms/grade/face/${id}`,
    method: 'get',
  });
}

/**
 * 提交面试表单
 */
export function passInterviewById(params) {
  return request({
    url: '/exms/grade/face/save',
    method: 'post',
    data: params,
  });
}

/**
 * 根据id获取阅卷进度列表信息
 */
export function getPaperProcessById(id) {
  return request({
    url: `/exms/grade/examiner/${id}`,
    method: 'get',
  });
}

/**
 * 列表里的发放证书
 */
export function sendCertificateById(params) {
  return request({
    url: 'exms/iepcertificate/grantone',
    method: 'post',
    params: params,
  });
}

/**
 * 阅卷进度里的发放证书
 */
export function sendCertificateAllById(params) {
  return request({
    url: '/exms/iepcertificate/grantall',
    method: 'post',
    params: params,
  });
}

/**
 * 一键收卷
 */
export function rollingPaperById(params) {
  return request({
    url: '/exms/grade/rolling',
    method: 'post',
    params: params,
  });
}

/**
 * 完成阅卷
 */
export function overPapersById(params) {
  return request({
    url: '/exms/grade/done',
    method: 'post',
    params: params,
  });
}

/**
 * 发送成绩
 */
export function sendResultById(params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  });
}

/**
 * 一键零分
 */
export function setZeroAll(params) {
  return request({
    url: '/exms/grade/tozero',
    method: 'post',
    params: params,
  });
}

/**
 * 纠正阅卷
 */
export function CorrectMarking(params) {
  return request({
    url: '/exms/iepcorrqstn/updateCorrQstn',
    method: 'post',
    params: params,
  });
}
