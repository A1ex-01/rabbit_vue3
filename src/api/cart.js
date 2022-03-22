import request from "../utils/request";
// 获取购物车总数
function getCartCount() {
  return request({
    method: "get",
    url: "/member/cart/count"
  })
}

function getCartList() {
  return request({
    method: "get",
    url: "/member/cart"
  })
}
// 修改购物车商品
function goAddCart(data) {
  return request({
    method: "post",
    url: "/member/cart",
    data: data
  })
}

function allChooseBtn(data) {
  return request({
    method: "put",
    url: "/member/cart/selected",
    data: data
  })
}
//修改商品数量
function modifyGoods(data) {
  return request({
    method: "put",
    url: "/member/cart/" + data.id,
    data: data.info
  })
}
//通过skuid获取商品的sku信息
function getTypeBySkuId(id) {
  return request({
    method: "get",
    url: "/goods/sku/" + id,
  })
}
//删除购物车商品
function deleteGoodBySkuId(data) {
  return request({
    method: "delete",
    url: "/member/cart",
    data:data
  })
}
// 获取收藏页面

function getCollectList(data) {
  return request({
    method: "GET",
    url: "/member/collect",
    data:data
  })
}
export {
  getCartCount,
  getCartList,
  goAddCart,
  allChooseBtn,
  modifyGoods,
  getTypeBySkuId,
  deleteGoodBySkuId,
  getCollectList
}