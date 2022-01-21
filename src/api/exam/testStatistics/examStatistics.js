/**
 * 新增考试统计中总体统计接口
 */

import request from '@/router/axios';
/**
 * 获取考卷管理列表页
 * @param {Object} params 参数
 */
export function getPage(params) {
  return request({
    url: 'exms/iepexaminationstatistics/selectByTotal',
    method: 'get',
    params: params,
  });
}

/**
 *根据本场考试的id成绩分析信息
 */
export function getScoreAnalysisById(params) {
  return request({
    url: '/exms/iepexaminationstatistics/achievement',
    method: 'get',
    params: params,
  });
}

/**
 *根据本场考试的id成绩分析信息
 */
export function getStatisticsById(params) {
  return request({
    url: '/exms/iepexaminationstatistics/fraction',
    method: 'get',
    params: params,
  });
}
