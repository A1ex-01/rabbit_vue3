import request from "../utils/request"
export default function getUserInfo(payload) {
  return request({
    method: "post",
    url: "/login",
    data: payload
  })
}