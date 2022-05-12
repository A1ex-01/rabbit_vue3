import request from "../utils/request";
// 更新用户信息
function updateUserBaseInfo(data) {
  return request({
    method: "PUT",
    url: "/member/profile",
    data: {
      ...data,
      cityCode: "110100",
      provinceCode: "110000",
    },
  });
}
function updateAll(data) {
  return request({
    method: "PUT",
    url: "/login/refresh",
    data,
  });
}
function updateImg(data) {
  return request({
    method: "POST",
    url: "/member/profile/avatar",
    data,
  });
}
export { updateUserBaseInfo, updateAll, updateImg };
