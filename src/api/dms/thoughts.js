import request from "@/router/axios";
const prefixUrl = "/dms/thoughts";
const commentUrl = "/dms/thoughts_comment";
const replyUrl = "/dms/thoughts_reply";

// 热门说说
export function getHitPage(params) {
  return request({
    url: `${prefixUrl}/hit_page`,
    method: "get",
    params
  });
}

export function thoughtsCreate(obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj
  });
}

export function getThoughtsPage(obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: obj
  });
}

export function getThoughtsById(id) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: {
      id
    }
  });
}

export function thoughtsDelete(obj) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: obj
  });
}

// 分页查询感想
export function getAllPage(obj) {
  return request({
    url: `${prefixUrl}/all_page`,
    method: "get",
    params: obj
  });
}

// 获取我关注的用户的说说
export function getFollowPage(obj) {
  return request({
    url: `${prefixUrl}/follow_page`,
    method: "get",
    params: obj
  });
}

// 说说中@人联想接口
export function getUserNameList(obj) {
  return request({
    url: "/admin/user/realname",
    method: "get",
    params: obj
  });
}

// 说说点赞
export function addThumbsUpByRecord(id) {
  return request({
    url: `${prefixUrl}/add_thumbs_up/${id}`,
    method: "get"
  });
}

// 说说总数榜 - 总
export function getMostThoughts() {
  return request({
    url: `${prefixUrl}/most_thoughts`,
    method: "get"
  });
}

// 本周排行榜 - 总
export function getMostThoughtsWeekly() {
  return request({
    url: `${prefixUrl}/announce_weekly`,
    method: "get"
  });
}

//  本周点赞榜 - 总
export function getMostThumbedThoughtsWeekly() {
  return request({
    url: `${prefixUrl}/thumbed_weekly`,
    method: "get"
  });
}

// 热门话题榜 - 总
export function getHotTopics() {
  return request({
    url: `${prefixUrl}/hot_topics`,
    method: "get"
  });
}

// 热门话题榜 - 分页
export function getHotTopicsPage(params) {
  return request({
    url: `${prefixUrl}/hot_topics/page`,
    method: "get",
    params: params
  });
}

// 说说点赞用户列表
export function getThumbMembers(id) {
  return request({
    url: `${prefixUrl}/thumb_members/${id}`,
    method: "get"
  });
}

// 说说详情
export function getDetailById(id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get"
  });
}

// 获取对应话题的说说列表
export function getTopicThoughts(obj) {
  return request({
    url: `${prefixUrl}/topic_thoughts`,
    method: "get",
    params: obj
  });
}

// 根据id置顶指定说说
export function topUpThoughts(obj) {
  return request({
    url: `${prefixUrl}/top_up`,
    method: "post",
    data: obj
  });
}

// 说说管理页面的说说分页
export function getManagePage(params) {
  return request({
    url: `${prefixUrl}/manage/page`,
    method: "get",
    params: params
  });
}

// 批量修改说说公开状态
export function postStatusBatch(data) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: "post",
    data: data
  });
}

// 说说管理页面的说说下架
export function lowerShelfById(id) {
  return request({
    url: `${prefixUrl}/lower_shelf/${id}`,
    method: "get"
  });
}

// 新增话题表
export function topicCreate(data) {
  return request({
    url: `${prefixUrl}/topic/create`,
    method: "post",
    data
  });
}

// 修改话题表
export function topicUpdate(data) {
  return request({
    url: `${prefixUrl}/topic/update`,
    method: "post",
    data
  });
}

// 通过id查询话题
export function getTopicById(id) {
  return request({
    url: `${prefixUrl}/topic/${id}`,
    method: "get"
  });
}

// 说说管理页面的说说评论屏蔽
export function thoughtCommentShield(id) {
  return request({
    url: `${prefixUrl}/thought_comment_shield/${id}`,
    method: "get"
  });
}

// 说说管理页面的说说评论的回复屏蔽
export function thoughtReplyShield(id) {
  return request({
    url: `${prefixUrl}/thought_reply_shield/${id}`,
    method: "get"
  });
}

// 本周发布说说数用户排名（分页）
export const getAnnounceWeeklyPage = params => {
  return request({
    url: `${prefixUrl}/announce_weekly/page`,
    method: "get",
    params
  });
};

// 上周发布说说的活跃用户信息
export function getMightyOne() {
  return request({
    url: `${prefixUrl}/last_week/mighty_one`,
    method: "get"
  });
}

/******************************************************************* 评论  thoughts_comment */

// 评论
export function CommentThoughts(obj) {
  return request({
    url: `${commentUrl}/create`,
    method: "post",
    data: obj
  });
}

// 评论点赞
export function addcCommentThumbsByRecord(id) {
  return request({
    url: `${commentUrl}/comment_thumbs/${id}`,
    method: "get"
  });
}

// 评论删除
export function deleteCommentThumbsById(id) {
  return request({
    url: `${commentUrl}/${id}`,
    method: "post"
  });
}

// 根据说说id获取评论分页
export function getCommentsByThoughtsId(params) {
  return request({
    url: `${commentUrl}/get_comments`,
    method: "get",
    params: params
  });
}

/******************************************************************* 回复  thoughts_reply */

// 回复评论
export function CommentReply(obj) {
  return request({
    url: `${replyUrl}/create`,
    method: "post",
    data: obj
  });
}

// 回复评论
export function deleteCommentById(id) {
  return request({
    url: `${replyUrl}/${id}`,
    method: "post"
  });
}

// 回复点赞
export function addReplyThumbsByRecord(id) {
  return request({
    url: `${replyUrl}/up_reply/${id}`,
    method: "get"
  });
}

// 猜你喜欢专栏
export function orgActiveDynamic(orgId) {
  return request({
    url: `${prefixUrl}/org_active_dynamic`,
    method: "get",
    params: {
      orgId
    }
  });
}
/**
 * 风采页组织动态
 * @param {*} orgId
 * @param {*} size
 */
export const getThoughtsListByOrgId = (orgId, size = 5) => {
  return request({
    url: `${prefixUrl}/so_thoughts_list/${orgId}`,
    method: "get",
    params: {
      size
    }
  });
};
/**
 * 风采页组个人动态
 * @param {*} orgId
 * @param {*} size
 */
export const getThoughtsListByUserId = (userId, size = 5) => {
  return request({
    url: `${prefixUrl}/person_thoughts_list/${userId}`,
    method: "get",
    params: {
      size
    }
  });
};
