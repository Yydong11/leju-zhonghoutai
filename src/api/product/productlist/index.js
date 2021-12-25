import request from '@/utils/request'

// 封装获取商品列表接口
function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 封装更改是否最新接口
function switchNewStatus(data) {
  return request({
    url: "/lejuAdmin/product/switchNewStatus",
    method: 'post',
    data
  })
}
// 封装更改是否推荐接口
function switchRecommandStatus(data) {
  return request({
    url: "/lejuAdmin/product/switchRecommandStatus",
    method: 'post',
    data
  })
}
// 封装更改是否发布接口
function switchPublishStatus(data) {
  return request({
    url: "/lejuAdmin/product/switchPublishStatus",
    method: 'post',
    data
  })
}
// 封装更改是否审核接口
function switchVerifyStatus(data) {
  return request({
    url: "/lejuAdmin/product/switchVerifyStatus",
    method: 'post',
    data
  })
}
// 封装删除商品接口
function del(productId) {
  return request({
    url: `/lejuAdmin/product/del/${productId}`,
    method: 'delete'
  })
}
// 封装编辑sku信息接口
function getSkusByProductId(productId) {
  return request({
    url: `/lejuAdmin/sku/getSkusByProductId/${productId}`
  })
}
// 封装删除sku信息接口
function delSku(skuId) {
  return request({
    url: `/lejuAdmin/sku/delSku/${skuId}`,
    method: "delete"
  })
}
// 封装提交sku确认信息接口
function updateSkuInfo(data) {
  return request({
    url: "/lejuAdmin/sku/updateSkuInfo",
    method: "post",
    data
  })
}
// 封装新增sku接口
function addProductSkus(data) {
  return request({
    url: "/lejuAdmin/sku/addProductSkus",
    method: "post",
    data
  })
}




export {
  productsByPage,
  switchNewStatus,
  switchRecommandStatus,
  switchPublishStatus,
  switchVerifyStatus,
  del,
  getSkusByProductId,
  delSku,
  updateSkuInfo,
  addProductSkus
}
