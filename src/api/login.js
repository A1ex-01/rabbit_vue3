import request from "../utils/request";
// 账号登录
function getUserInfo(payload) {
  return request({
    method: "post",
    url: "/login",
    data: payload,
  });
}
// 获取验证码
function getCode(payload) {
  return request({
    method: "get",
    url: "/login/code",
    data: payload,
  });
}
// 验证码登录
function getUserInfoByCode(payload) {
  return request({
    method: "post",
    url: "/login/code",
    data: payload,
  });
}
export { getUserInfo, getUserInfoByCode, getCode };
