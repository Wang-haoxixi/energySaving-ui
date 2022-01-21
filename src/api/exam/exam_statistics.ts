import request from "@/router/axios";

const prefixUrl = "/qms/exam_statistics";
/**
 * 获取考试HEAD
 */
export function getExamHeader(type = 'org') {
  return request({
    url: `${prefixUrl}/basics`,
    method: 'get',
    params: {
      type,
    },
  });
}
/**
 * 获取考试信息
 */
export function getExamChart(type = 'org') {
  return request({
    url: `${prefixUrl}/ques_statistics`,
    method: 'get',
    params: {
      type,
    },
  });
}
/**
 * 获取考试 RARK 信息
 */
export function getExamTopUser(type = 'org') {
  return request({
    url: `${prefixUrl}/exam_top`,
    method: 'get',
    params: {
      type,
    },
  });
}
/**
 * 获取证书 RARK 信息
 */
export function getCertTopUser(type = 'org') {
  return request({
    url: `${prefixUrl}/certificates_top`,
    method: 'get',
    params: {
      type,
    },
  });
}
/**
 * 获取echart次数
 */
export function getExamTimeChart(type = 'org') {
  return request({
    url: `${prefixUrl}/exam_by_month`,
    method: 'get',
    params: {
      type,
    },
  });
}

export const getExamStatisticsPageByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/exam_basics_page`,
      method: "get",
      params: {
        ...params,
        type,
      },
    });
  };
};
export const getOrgMemberStatisticsPageByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/org_member_page`,
      method: "get",
      params: {
        ...params,
        type,
      },
    });
  };
};

export function getExamStatisticsCount(type = 'org') {
  return request({
    url: `${prefixUrl}/release_total`,
    method: 'get',
    params: {
      type,
    },
  });
}

export const getSoExamStatisticsCount = () => {
  return request({
    url: `${prefixUrl}/release_org_total`,
    method: 'get',
  });
};

export const getSoExamStatisticsPage = (params: any) => {
  return request({
    url: `${prefixUrl}/release_org_page`,
    method: 'get',
    params,
  });
};

export function getExamOrgStatisticsCount(type = 'org') {
  return request({
    url: `${prefixUrl}/member_take_total`,
    method: 'get',
    params: {
      type,
    },
  });
}

export function getExamStatisticsById(id: string) {
  return request({
    url: `${prefixUrl}/exam_basics/${id}`,
    method: 'get',
  });
}

export function getSoExamStatisticsById(orgId: string) {
  return request({
    url: `${prefixUrl}/org_basics/${orgId}`,
    method: 'get',
  });
}

export function getExamUserStatisticsById(id: string, type = 'org') {
  return request({
    url: `${prefixUrl}/${id}/member_basics`,
    method: 'get',
    params: {
      type,
    },
  });
}

export function getScoreAnalyseById(id: string) {
  return request({
    url: `${prefixUrl}/score_analyse/${id}`,
    method: 'get',
  });
}

export function getExamResultPageById(examId: string, type = 'org') {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${examId}/exam_manage_page`,
      method: 'get',
      params: {
        ...params,
        type,
      },
    });
  };
}

export function getExamDetailPageById(userId: string, type = "org") {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${userId}/exam_details`,
      method: 'get',
      params: {
        ...params,
        type,
      },
    });
  };
}

export function getCertificateDetailPageById(userId: string, type = "org") {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${userId}/certificate_details`,
      method: 'get',
      params: {
        ...params,
        type,
      },
    });
  };
}

export function getExamCertificationPageById(examId: string) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${examId}/certification`,
      method: 'get',
      params,
    });
  };
}

export function getExamByOrgId(orgId: string) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${orgId}/org_exam_page`,
      method: 'get',
      params,
    });
  };
}
/**
 * 考试榜
 * exam_for_app
 */
export const getExamRankList = () => {
  return request({
    url: `${prefixUrl}/exam_for_app`,
  });
};
/**
 * 证书榜
 * certificate_for_app
 */
export const getCertificateRankList = () => {
  return request({
    url: `${prefixUrl}/certificate_for_app`,
  });
};
