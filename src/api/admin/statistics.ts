import request from "@/router/axios";
import moment from 'moment';

const prefixUrl = "/admin/statistics";

/**
 * 新增统计
 */
export const getStatisticsUserAdd = () => {
  return request({
    url: `${prefixUrl}/user/added`,
    method: "get",
  });
};
/**
 * 活跃留存统计
 */
export const getStatisticsRetention = () => {
  return request({
    url: `${prefixUrl}/retention`,
    method: "get",
  });
};

/**
 * 年龄分布
 */
export const getStatisticsUserAge = () => {
  return request({
    url: `${prefixUrl}/user/age`,
    method: "get",
  });
};

/**
 * 用户性别分布
 */
export const getStatisticsUserGender = () => {
  return request({
    url: `${prefixUrl}/user/gender`,
    method: "get",
  });
};

/**
 * 用户所在地域分布
 */
export const getStatisticsUserWorkPlace = () => {
  return request({
    url: `${prefixUrl}/user/work/place`,
    method: "get",
  });
};

/**
 * so红度排名
 */
export const getStatisticsOrgRedness = () => {
  return request({
    url: `${prefixUrl}/org/redness`,
    method: "get",
  });
};

/**
 * so所在地域分布统计
 */
export const getStatisticsOrgRegion = () => {
  return request({
    url: `${prefixUrl}/org/region`,
    method: "get",
  });
};

/**
 * so所在行业分布统计
 */
export const getStatisticsOrgIndustry = () => {
  return request({
    url: `${prefixUrl}/org/industry`,
    method: "get",
  });
};

/**
 * so成员规模统计
 */
export const getStatisticsOrgMembership = () => {
  return request({
    url: `${prefixUrl}/org/membership`,
    method: "get",
  });
};

/**
 * 用户详情
 */
export const getStatisticsUserById = (id: number) => {
  return request({
    url: `${prefixUrl}/user/details/${id}`,
    method: "get",
  });
};

/**
 * 组织详情
 */
export const getStatisticsOrgById = (id: number) => {
  return request({
    url: `${prefixUrl}/org/details/${id}`,
    method: "get",
  });
};

/**
 * 用户
 * @param params
 */
export function getOperateUserPage(params: any) {
  return request({
    url: `${prefixUrl}/user/operate/page`,
    method: "get",
    params,
  });
}

/**
 * 组织
 * @param params
 */
export function getOperateOrgPage(params: any) {
  return request({
    url: `${prefixUrl}/org/operate/page`,
    method: "get",
    params,
  });
}

/**
 * 组织资产图标
 * @param params
 */
export function getOperateOrgBell() {
  return request({
    url: `${prefixUrl}/org/bell`,
    method: "get",
  });
}
/**
 * 活跃留存统计
 * @param data
 */
export function getUserDuration(data: any) {
  return request({
    url: `${prefixUrl}/user/active`,
    method: "post",
    data,
  });
}
/**
 * 下载运营工作台 excel 数据
 * @param type 1 用户 2 组织
 */
const typeName = {
  1: '用户',
  2: "组织",
};
export function downOperateExcelData(type: keyof typeof typeName = 1) {
  request({
    url: `${prefixUrl}/export`,
    method: 'get',
    responseType: "arraybuffer",
    params: {
      type,
    },
  }).then((response: any) => {
    // 处理返回的文件流
    const blob = new Blob([response]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${typeName[type]}运营数据-${moment().format('LLLL')}.xls`;
    document.body.appendChild(link);
    link.style.display = "none";
    link.click();
  });
}
