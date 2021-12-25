import request from '@/utils/request'

// 封装获取退单列表接口
function findReturnApply(start, limit, data) {
    return request({
        url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
        method: "post",
        data
    })
}



export {
    findReturnApply
}
