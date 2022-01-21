import request from "@/router/axios";
const prefixUrl = "/qms/course_info";
/**
 * 课程列表分页
 * @param params
 */
export function getCourseInfoListPage(params: any) {
  return request({
    url: `${prefixUrl}/list_page`,
    method: "get",
    params: {
      ...params,
      source: 1,
    },
  });
}

/**
 * 频道页课程列表分页
 * @param params
 */
export function getCourseInfoAppPage(params: any) {
  return request({
    url: `${prefixUrl}/list_page`,
    method: "get",
    params: {
      ...params,
      source: 2,
    },
  });
}

/**
 * 获取课程list
 * @param name 关键词
 */
export const getCourseInfoAppListByName = async (name: string) => {
  const { data } = await getCourseInfoAppPage({ courseName: name });
  const { records, total } = data;
  const list4 = records.slice(0, 4);
  return { list4, total };
};

export function getCourseInfoPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

export function getCourseInfoOptPage(params: any) {
  return request({
    url: `${prefixUrl}/operation_page`,
    method: "get",
    params,
  });
}

export const postInfo = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

export const putInfo = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 后台获取简单详情页数据
 * @param id
 */
export const getInfoById = (id: string) => {
  return request({
    url: `${prefixUrl}/${id}`,
  });
};
/**
 * 前台获取详情页面数据
 * @param id
 */
export const getInfoDetailById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_detail_by_id/${id}`,
  });
};
/**
 * 讲师相关课程
 * @param id
 */
export const getInfoLecturerById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_related_lecturer_course/${id}`,
  });
};
/**
 * 课程相关课程
 * @param id
 */
export const getInfoRelatedById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_related_course/${id}`,
  });
};

export const delInfoById = (id: string) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  });
};
/**
 * 0 下架 1 上架
 * @param id
 */
export const setInfoAudit = (data: any) => {
  return request({
    url: `${prefixUrl}/audit`,
    method: 'post',
    data,
  });
};
/**
 * 0 推荐 1 不推荐
 * @param id
 */
export const setInfoRecommend = (id: string) => {
  return request({
    url: `${prefixUrl}/recommend/${id}`,
    method: 'post',
  });
};

export const getStudyInfoById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_info_for_study/${id}`,
  });
};

export const getRecommendCoursePage = (params: any) => {
  return request({
    url: `${prefixUrl}/recommend_page`,
    params,
  });
};

export const getRecommendCourseListBySize = async (size: number) => {
  const params = { size };
  const { data } = await getRecommendCoursePage(params);
  const { records } = data;
  return records;
};

export const getCourseInfoRankList = () => {
  return request({
    url: `${prefixUrl}/course_info_top`,
  });
};
