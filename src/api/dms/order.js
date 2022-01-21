import request from "@/router/axios";

const prefixUrl = "/dms/order";

export const getPreBuildInfo = (query) => {
  return request({
    url: `${prefixUrl}/pre_build`,
    method: "get",
    params: query,
  });
};

export const postOrder = (data) => {
  return request({
    url: `${prefixUrl}/create_order`,
    method: "post",
    data,
  });
};

export const getOrderById = (id) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const cancelOrderById = (id) => {
  return request({
    url: `${prefixUrl}/cancel/${id}`,
    method: "get",
  });
};

export const optOrderById = (id, status = 1) => {
  return request({
    url: `${prefixUrl}/change_status/${id}`,
    method: "get",
    params: {
      status,
    },
  });
};

export const passOrderById = (id) => {
  return optOrderById(id, 1);
};
export const rejectOrderById = (id) => {
  return optOrderById(id, 2);
};

export const postOrderPay = (data) => {
  return request({
    url: `${prefixUrl}/pay`,
    method: "post",
    data,
  });
};

export const getMyOrderPage = (query) => {
  return request({
    url: `${prefixUrl}/my/order_page`,
    method: "get",
    params: query,
  });
};

export const getOrgOrderPage = (query) => {
  return request({
    url: `${prefixUrl}/orgOrder_page`,
    method: "get",
    params: query,
  });
};

export const getAllOrderPage = (query) => {
  return request({
    url: `${prefixUrl}/order_page`,
    method: "get",
    params: query,
  });
};

export const updateRemarks = (id, query) => {
  return request({
    url: `${prefixUrl}/update_remarks/${id}`,
    method: "get",
    params: query,
  });
};

export const getRemarksById = (id) => {
  return request({
    url: `${prefixUrl}/remarks/${id}`,
    method: "get",
  });
};

export const updateStatus = (id, query) => {
  return request({
    url: `${prefixUrl}/status/${id}`,
    method: "get",
    params: query,
  });
};

export const getWxOrderQRcode = (orderNumber) => {
  return request({
    url: `${prefixUrl}/wx_pay`,
    method: "get",
    params: {
      orderNumber,
    },
  });
};
export const getWxSearch = (orderNumber) => {
  return request({
    url: `${prefixUrl}/wx_search`,
    method: "get",
    params: {
      orderNumber,
    },
  });
};
