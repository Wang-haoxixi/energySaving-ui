import request from "@/router/axios";
const prefixUrl = "/qms/exam_exercise";

/**
 * 练习管理表
 */
export function getExamexaminationPage(data: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "post",
    data,
  });
}
export function getExeStatePage(data: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "post",
    data: {
      state:1,
      ...data,
    },
  });
}


export function getExeSectionPageByInfoId(infoId: string, sectionId: number) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/section_exercise_page`,
      method: "get",
      params: {
        infoId,
        sectionId,
        ...params,
      },
    });
  };
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

export function getExerciseAppPage(params: any) {
  return request({
    url: `${prefixUrl}/app_page`,
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
export const getExerciseAppListByName = async (name: string) => {
  const { data } = await getExerciseAppPage({ examName: name });
  const { records, total } = data;
  const list4 = records.slice(0, 4);
  return { list4, total };
};

export function scoreManage(id: string, tabType: string | null = null) {
  return function (params: any) {
    return request({
      url: `/qms/exam_exercise_management/score_manage`,
      method: "get",
      params: {
        exerciseId: id,
        tabType,
        ...params,
      },
    });
  };
}

export function exerciseScoreManage(id: string, tabType: string | null = null) {
  return scoreManage(id, tabType);
}

export const getExerciseChannelPage = (params: any) => {
  return request({
    url: `${prefixUrl}/app_page`,
    method: "get",
    params: {
      ...params,
      source: 2,
    },
  });
};
export const getExerciseSoPage = (params: any) => {
  return request({
    url: `${prefixUrl}/app_page`,
    method: "get",
    params: {
      ...params,
      source: 1,
    },
  });
};

export const getExerciseInfoById = (id: string, params: any = undefined) => {
  return request({
    url: `${prefixUrl}/get_detail_for_app/${id}`,
    method: "get",
    params,
  });
};

export const delExerciseById = (id: string) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};

export const getLatestExercisePage = (params: any) => {
  return request({
    url: `${prefixUrl}/latest_exercise_page`,
    params,
  });
};

export const getLatestExerciseListBySize = async (size: number) => {
  const { data } = await getLatestExercisePage({ size });
  const { records } = data;
  return records;
};

export const getOperatePage = (params: any) => {
  return request({
    url: `${prefixUrl}/operate/page`,
    method: "get",
    params,
  });
};

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
