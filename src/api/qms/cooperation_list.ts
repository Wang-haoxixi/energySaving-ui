import request from "@/router/axios";
import { DateData, gDateData } from '../dms/comprehensive';

const prefixUrl = "/qms/cooperation_list";

// 协作工作台
export function getCooperationTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/task_target`,
    method: "post",
    data: gDateData(dates),
  });
}

// 分页查询任务
export function getCooperationPage(params: any) {
  return request({
    url: `${prefixUrl}/pc/page`,
    method: "get",
    params,
  });
}

// 协作-查询任务详情(taskId:任务id)
export function getDetailById(params: any) {
  return request({
    url: `${prefixUrl}/select_detail`,
    method: "get",
    params,
  });
}

// 协作-日历pc端使用(time 传入所需查询某月的第一日零时零分,state 传入查询状态)
export function getSelectCalendar(params: any) {
  return request({
    url: `${prefixUrl}/pc/select_calendar`,
    method: "get",
    params,
  });
}

// 协作-日历(time 传入所需查询某月的第一日零时零分)
export function getSelectCalendarByWeek(params: any) {
  return request({
    url: `${prefixUrl}/select_calendar`,
    method: "get",
    params,
  });
}

// 协作-日历pc端使用(time 传入所需查询某周的第一日零时零分)
export function getSelectWeekTask(params: any) {
  return request({
    url: `${prefixUrl}/pc/select_week_task`,
    method: "get",
    params,
  });
}

// 任务工场分页
export function getTaskWorkPage(params: any) {
  return request({
    url: `${prefixUrl}/task_work/page`,
    method: "get",
    params,
  });
}

// pc任务工场分页
export function getPcTaskWorkPage(params: any) {
  return request({
    url: `${prefixUrl}/pc/task_work/page`,
    method: "get",
    params,
  });
}

// 分页查询不同状态任务
export function getSelectPage(params: any) {
  return request({
    url: `${prefixUrl}/select_page`,
    method: "get",
    params,
  });
}

// so赋能台任务
export function getSoTaskPage(params: any) {
  return request({
    url: `${prefixUrl}/so_task`,
    method: "get",
    params,
  });
}

/**
 * 在风采页获取组织任务
 * @param orgId ORGID
 * @param size 数量
 */
export const getTaskListByOrgId = (orgId: number, size = 5) => {
  return request({
    url: `${prefixUrl}/pc/so_task/${orgId}`,
    method: "get",
    params: {
      size,
    },
  });
};
/**
 * 在赋能台获取组织本周任务
 * @param orgId ORGID
 * @param size 数量
 */
export const getWeekTaskListByOrgId = (orgId: number, size = 5) => {
  return request({
    url: `${prefixUrl}/pc/so_week_task/${orgId}`,
    method: "get",
    params: {
      size,
    },
  });
};
/**
 * 在个人风采页获取任务
 * @param orgId ORGID
 * @param size 数量
 */
export const getTaskListByUserId = (userId: number, size = 5) => {
  return request({
    url: `${prefixUrl}/pc/user_task/${userId}`,
    method: "get",
    params: {
      size,
    },
  });
};

// 运维工作台分页接口
export const getOperationTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/pc/operation_task`,
    method: "get",
    params,
  });
};
