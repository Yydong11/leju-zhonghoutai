import request from '@/utils/request'

// 封装获取订单明细接口
function orderDetail(orderId) {
    return request({
        url: `/lejuAdmin/order/orderDetail/${orderId}`
    })
}
// 封装确认发货接口
function sendDone(data) {
    return request({
        url: "/lejuAdmin/order/sendDone",
        method: "post",
        data
    })
}


export {
    orderDetail,
    sendDone
}
