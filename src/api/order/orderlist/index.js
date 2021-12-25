import request from '@/utils/request'

// 封装获取订单列表接口
function findOrdersByPage(start, limit, data) {
    return request({
        url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
        method: "post",
        data
    })
}



export {
    findOrdersByPage
}
