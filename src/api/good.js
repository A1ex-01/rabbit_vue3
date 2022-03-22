import request from "../utils/request"

function getGoodDetailInfo(data) {
  return request({
    url: "/goods",
    data:data,
    method: "get",
  })
}
function getGoodrelevant() {
  return request({
    url: "/goods/relevant",
    data:{
      limit:16
    },
    method: "get",
  })
}
function getHotGood(data) {
  return request({
    url: "/goods/hot",
    data:data,
    method: "get",
  })
}
export {
  getGoodDetailInfo,
  getGoodrelevant,
  getHotGood
}