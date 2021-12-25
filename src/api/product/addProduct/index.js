import request from '@/utils/request'

// 封装获取所有分类接口
function getAllCategory() {
    return request({
        url: '/lejuAdmin/category/getAllCategory'
    })
}
// 封装获取品牌接口
function findAllBrand() {
    return request({
        url: '/lejuAdmin/brand/findAllBrand'
    })
}
// 封装提交新增商品接口
function addProductAndSkus(data) {
    return request({
        url: '/lejuAdmin/product/addProductAndSkus',
        method: "post",
        data
    })
}
// 封装编辑商品查询详细信息接口
function productSkusDetail(productId) {
    return request({
        url: `/lejuAdmin/product/productSkusDetail/${productId}`
    })
}
// 封装更新商品信息接口
function updateProductAndSkus(data) {
    return request({
        url: "/lejuAdmin/product/updateProductAndSkus",
        method: "post",
        data
    })
}


export {
    getAllCategory,
    findAllBrand,
    addProductAndSkus,
    productSkusDetail,
    updateProductAndSkus
}
