import request from '@/utils/request'

// 封装获取退单明细接口
function orderReturn(id) {
    return request({
        url: `/lejuAdmin/orderReturn/${id}`
    })
}
// 封装同意退货接口
function agreeApply(id, data) {
    return request({
        url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
        method: "post",
        data
    })
}
// 封装拒绝退货接口
function rejectApply(id, data) {
    return request({
        url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
        method: "post",
        data
    })
}
// 封装收到退货接口
function receiveProduct(id, data) {
    return request({
        url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
        method: "post",
        data
    })
}


export {
    orderReturn,
    agreeApply,
    rejectApply,
    receiveProduct
}
