import request from "@/router/axios";

const prefixUrl = "/cms/info_article";
// @/api/conm/index
//文章管理控制器

export function getPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function getPageByIndexId(id: number) {
  return request({
    url: `${prefixUrl}/index/${id}`,
    method: "get",
  });
}
//文章迁移
export function postTransferNode(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/transfer_node`,
    method: "post",
    data: obj,
  });
}

//添加文章
export function addObj(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
//文章分页
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}
//文章全局搜索分页
export function getSearchPage(params: any) {
  return request({
    url: `${prefixUrl}/channel_page`,
    method: "get",
    params,
  });
}
//删除
export function logicDeleteNodeById(id: number) {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "post",
  });
}
export function updateObj(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}

// 前台分页查询文章
export function getIndexPage(params: any) {
  return request({
    url: `${prefixUrl}/index_page`,
    method: "get",
    params: params,
  });
}

// 前台查询推荐文章
export function getListBySiteId(params: any) {
  return request({
    url: `${prefixUrl}/${params.siteId}/list`,
    method: "get",
    params: params,
  });
}

//推荐位选择
// export function getInfoAttributePage (siteId) {
//   return request({
//     url: `${prefixUrl}/${siteId}/list`,
//     method: 'get',
//   })
// }
