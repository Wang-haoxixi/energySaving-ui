import request from "@/router/axios";
const prefixUrl = "/dms/report_so_org_admin";

// 分页查询SO组织管理员组织下员工周报表
export const getWeekMonthReportByOrg = (params: any) => {
  return request({
    url: `${prefixUrl}/person_week_page`,
    method: "get",
    params: params,
  });
};

// 分页查询SO组织管理员组织下员工月报表
export const getPersonMonthPageByOrg = (params: any) => {
  return request({
    url: `${prefixUrl}/person_month_page`,
    method: "get",
    params: params,
  });
};

// 分页查询SO组织管理员组织下SO组织周报表
export const getSoOrgWeekPageByOrg = (params: any) => {
  return request({
    url: `${prefixUrl}/so_org_week_page`,
    method: "get",
    params: params,
  });
};

// 分页查询SO组织管理员组织下SO组织月报表
export const getSoOrgMonthPageByOrg = (params: any) => {
  return request({
    url: `${prefixUrl}/so_org_month_page`,
    method: "get",
    params: params,
  });
};

// 分页查询SO组织管理员组织下员工日报表
export const getPersonDailyPage = (params: any) => {
  return request({
    url: `${prefixUrl}/person_daily_page`,
    method: "get",
    params: params,
  });
};
