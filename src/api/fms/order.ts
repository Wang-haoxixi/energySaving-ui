import request from "@/router/axios";

const prefixUrl = "/fms/order";

/**
 * 生成订单
 * @param data
 */
export const generateOrder = (data: any) => {
  return request({
    url: `${prefixUrl}/create_order`,
    method: "post",
    data,
  });
};

/**
 * 获取支付页面的订单详情
 * @param orderNumber 订单编号
 */
export const getPayOrderDetail = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/show/${orderNumber}`,
    method: "get",
  });
};

/**
 * 支付接口
 * @param data
 */
export const postPayOrder = (data: any) => {
  return request({
    url: `${prefixUrl}/pay`,
    method: "post",
    data,
  });
};

/**
 * 获取结果页面的订单详情
 * @param orderNumber 订单编号
 */
export const getResultOrderDetail = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/finish/${orderNumber}`,
    method: "get",
  });
};

/**
 * 获取订单审核分页
 * @param type org so审核 operate 运维审核
 */
export const getOrderCenterPageByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page/${type}`,
      method: "get",
      params,
    });
  };
};


/**
 * 获取结算审核分页
 * @param type org so审核 operate 运维审核
 */
export const getOrderCenterSettlePageByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/settle_page/${type}`,
      method: "get",
      params,
    });
  };
};

/**
 * 获取结算审核数据统计
 * @param type org so审核 operate 运维审核
 */
export const getOrderCenterStatisticsByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/statistics/${type}`,
      method: "get",
      params,
    });
  };
};


/**
 * 获取订单审核详情
 * @param type org so审核 operate 运维审核
 */
export const getOrderByIdByType = (type: string) => {
  return function (orderId: number) {
    return request({
      url: `${prefixUrl}/detail/${orderId}/${type}`,
      method: "get",
    });
  };
};



/**
 * 获取订单审核详情
 * @param type org so审核 operate 运维审核
 */
export const updateOrderByIdByType = (type: string) => {
  return function (orderNumber: string, params: any) {
    return request({
      url: `${prefixUrl}/remarks/${orderNumber}/${type}`,
      method: "get",
      params,
    });
  };
};

/**
 * 个人的订单分页
 * @param params
 */
export const getMyOrderPage = (params: any) => {
  return request({
    url: `${prefixUrl}/my/order_page`,
    method: "get",
    params,
  });
};


export const getMyOrderDetail = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/${orderNumber}`,
    method: "get",
  });
};

export const cancelOrder = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/manage/cancel/${orderNumber}`,
    method: "post",
  });
};

export const changeStatusOrder = (orderNumber: string, status: string) => {
  return request({
    url: `${prefixUrl}/status/${orderNumber}`,
    method: "get",
    params: { status },
  });
};

export const confirmStatusOrder = (orderNumber: string) => {
  return changeStatusOrder(orderNumber, '1');
};

export const revertStatusOrder = (orderNumber: string) => {
  return changeStatusOrder(orderNumber, '4');
};

export const cancelMyOrder = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/cancel/${orderNumber}`,
    method: "post",
  });
};

export const deleteMyOrder = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/delete/${orderNumber}`,
    method: "post",
  });
};

export const getWxOrderQRcode = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/wx_pay`,
    method: "get",
    params: {
      orderNumber,
    },
  });
};
/**
 * 微信定时查询
 * @param orderNumber
 */
export const getWxSearch = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/wx_search`,
    method: "get",
    params: {
      orderNumber,
    },
  });
};
/**
 * 获取比例参数值
 */
export const getFmsParamConfig = () => {
  return request({
    url: `${prefixUrl}/rate/show`,
    method: "get",
  });
};
/**
 * 更新比例参数值
 */
export const updateFmsParamConfig = (data: any) => {
  return request({
    url: `${prefixUrl}/rate/change`,
    method: "post",
    data,
  });
};

export const orderAgentCheck = (orderNumber: string) => {
  return request({
    url: `${prefixUrl}/agent/check`,
    method: 'GET',
    params: {
      orderNumber,
    },
  });
};
