import request from "@/router/axios";

const prefixUrl = "/qms/questionnaire";

// 获取问卷频道页接口
export function getChannelPage(params: any) {
  return request({
    url: `${prefixUrl}/channel_page`,
    method: "get",
    params: params
  });
}
// 问卷模板
export function getTemplatePage(params: any) {
  if (params.tagName && params.tagName.length) {
    params.tagName = params.tagName.join(",");
  }
  return request({
    url: `${prefixUrl}/template_page`,
    method: "get",
    params: params
  });
}
// 获取问卷管理分页
export function getManagePage(params: any) {
  return request({
    url: `${prefixUrl}/manage_page`,
    method: "get",
    params: params
  });
}
// 获取so问卷管理分页
// export function getPageByParams (params: any) {
//   return request({
//     url: `${prefixUrl}/page`,
//     method: "get",
//     params: params,
//   });
// }
// 获取so问卷管理分页
export function getPage(create: [string, number]) {
  return function(params: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "get",
      params: {
        create,
        ...params
      }
    });
  };
}
// 获取so问卷分页
export function getSoPage(params: any) {
  return request({
    url: `${prefixUrl}/page_so`,
    method: "get",
    params: params
  });
}
//新增
export function createPage(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: data
  });
}
//编辑
export function updatePage(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data
  });
}
//结束
export function endPage(id: number) {
  return request({
    url: `${prefixUrl}/end`,
    method: "post",
    data: { id: id }
  });
}
//提交
export function submitPage(id: number, value: string) {
  return request({
    url: `${prefixUrl}/submit`,
    method: "post",
    data: { id: id, safePassword: value }
  });
}
//发布
export function passPage(id: number, value: string) {
  return request({
    url: `${prefixUrl}/pass`,
    method: "post",
    data: { id: id, safePassword: value }
  });
}
//通过
export function adoptPage(id: number) {
  return request({
    url: `${prefixUrl}/adopt`,
    method: "post",
    data: { id: id }
  });
}
//驳回
export function rejectPage(id: number, value: string) {
  return request({
    url: `${prefixUrl}/un_pass/${id}`,
    method: "post",
    params: { content: value }
  });
}
//单个删除
export function deleteDataById(id: number, delReason = "") {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
    params: { delReason }
  });
}
// 结束，恢复，撤回，发布
export function changeByState(data: any) {
  return request({
    url: `${prefixUrl}/update_status`,
    method: "post",
    data: data
  });
}

// 根据id获取详情
export function getDataById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get"
  });
}
// 根据id获取详情 无token
export function getOuterDataById(id: number) {
  return request({
    url: `${prefixUrl}/outer_info/${id}`,
    method: "get"
  });
}
// 改变置顶状态
export function setTopStatus(data: number) {
  return request({
    url: `${prefixUrl}/top`,
    method: "post",
    data: data
  });
}

// 获取标签
export function getTagName(params: any) {
  return request({
    url: "/tms/tag/page",
    method: "get",
    params
  });
}

// 获得每一题的统计
export function statistic(questionId: any) {
  return request({
    url: `/qms/statistic/${questionId}`,
    method: "get"
  });
}

// 工作台我参与的
export function getParticipatePage(params: any) {
  return request({
    url: `${prefixUrl}/participate_page`,
    method: "get",
    params: params
  });
}

// 问卷举报-根据问卷id更新相关信息
export function questionDismount(id: any) {
  return request({
    url: `${prefixUrl}/dismount`,
    method: "post",
    params: { questionnaireId: id }
  });
}
/**
 * 运营工作台-问卷管理
 */
export function getScopeManagePage(params: any) {
  return request({
    url: `${prefixUrl}/scope_manage`,
    method: "get",
    params
  });
}

/**
 * 问卷推荐
 */
export function getQuesRecommendList() {
  return request({
    url: `${prefixUrl}/recommend`,
    method: "get"
  });
}

/**
 * 组织风采页问卷
 * @params size 数量
 */
export function getFactoryList({
  orgId,
  size
}: {
  orgId: number;
  size: number;
}) {
  return request({
    url: `${prefixUrl}/factory_list/${orgId}`,
    method: "get",
    params: { size }
  });
}

/**
 * 更改问卷时间
 * @param data
 */

export function quesTimeSetting(data: any) {
  return request({
    url: `${prefixUrl}/time_setting`,
    method: "post",
    data
  });
}

/**
 * 我的发布-问卷
 * @param params
 */
export function questionnaireMyPublish(params: any) {
  return request({
    url: `${prefixUrl}/my_publish`,
    method: "get",
    params
  });
}
