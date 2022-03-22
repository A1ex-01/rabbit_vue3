import request from "../utils/request";

function getCategoryList() {
  return request({
    url: "/home/category/head",
    method: "get",
  })
}
function getBannerList() {
  return request({
    url: "/home/banner",
    method: "get"
  })
}
function getFreshThiing() {
  return request({
    url: "/home/new/simple",
    method: "get"
  })
}
function getHotList() {
  return request({
    url: "/home/hot",
    method: "get"
  })
}
function getBrandList() {
  return request({
    url: "/home/brand",
    method: "get",
    limit: "4"
  })
}
function getGoodsList() {
  return request({
    url: "/home/goods",
    method: "get"
  })
}
function getSpecial() {
  return request({
    url: "/home/special",
    limit: 3,
    method: "get"
  })
}

// 获取我的足迹
function getMyHistory(){
  return request({
    method:"get",
    url:"/member/browseHistory",
    data:{
      page:1,
      pageSize:4
    }
  })
}

export { getCategoryList, getBannerList, getFreshThiing, getHotList, getBrandList, getGoodsList, getSpecial,getMyHistory }