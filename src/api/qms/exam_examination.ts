import request from "@/router/axios";
const prefixUrl = "/qms/exam_examination";

/**
 * 考试管理表
 */
export function getExamexaminationPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
export function addExamexaminationPage(data: any) {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
}

export function updateExamexaminationPage(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function getExamexaminationPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function getExamexaminationAppPage(params: any) {
  return request({
    url: `${prefixUrl}/app_page`,
    method: "get",
    params: {
      ...params,
      source: 2,
    },
  });
}

export function getExamAppPage(params: any) {
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
 * 获取考试list
 * @param name 关键词
 */
export const getExamAppListByName = async (name: string) => {
  const { data } = await getExamAppPage({ examName: name });
  const { records, total } = data;
  const list4 = records.slice(0, 4);
  return { list4, total };
};

export function getPageForCourse(params: any) {
  return request({
    url: `${prefixUrl}/get_Page_for_course`,
    method: "get",
    params: params,
  });
}

/**
 * 考试运营分页
 * @param params
 */
export function getOperationExamPage(params: any) {
  return request({
    url: `${prefixUrl}/operation_page`,
    method: "get",
    params,
  });
}
/**
 * 推荐不推荐
 */
export function recommend(data: any) {
  return request({
    url: `${prefixUrl}/recommend`,
    method: "post",
    data,
  });
}
/**
 * 上架下架
 */
export function audit(data: any) {
  return request({
    url: `${prefixUrl}/audit`,
    method: "post",
    data,
  });
}
/**
 * 开始学习拆分接口
 * @param id
 */
export function getExamStudyV2ById(id: number) {
  return request({
    url: `${prefixUrl}/start_study_v2/${id}/2`,
    method: "get",
  });
}

/**
 * 开始学习拆分-材料
 * @param id
 */
export function getMaterialById(id: number) {
  return request({
    url: `${prefixUrl}/get_material_by_id/${id}`,
    method: "get",
  });
}

export function getMoreStudyUser(id: string) {
  return request({
    url: `${prefixUrl}/more_study_person`,
    method: "get",
    params: {
      id,
    },
  });
}

/**
 * 发证书按钮是否能用
 * @param id 考试id
 */
export function checkForCertificate(id: number) {
  return request({
    url: `${prefixUrl}/check_for_certificate/${id}`,
    method: "get",
  });
}

/**
 * 能聘用的分页
 */
export function getPageForHire(params: string) {
  return request({
    url: `${prefixUrl}/get_page_for_hire`,
    method: "get",
    params,
  });
}

/**
 * 考试举报处理
 */
export function reportDealById(id: any) {
  return request({
    url: `${prefixUrl}/report/${id}`,
    method: "post",
  });
}

export const getRelationExamListById = (id: string) => {
  return request({
    url: `${prefixUrl}/certification_exam/${id}`,
  });
};

export const getHotExamPage = (params: any) => {
  return request({
    url: `${prefixUrl}/hot_exam_page`,
    params,
  });
};

export const getHotExamListBySize = async (size: number) => {
  const params = { size };
  const { data } = await getHotExamPage(params);
  const { records } = data;
  return records;
};
