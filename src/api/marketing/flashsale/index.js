import request from '@/utils/request'

// 封装获取限时活动列表接口
function findAllRecommends() {
    return request({
        url: '/lejuAdmin/homeRecommend/findAllRecommends'
    })
}
// 封装删除活动接口
function delRecommend(recommendId) {
    return request({
        url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
        method: "delete"
    })
}
// 封装新增限时活动接口
function addRecommend(data) {
    return request({
        url: "/lejuAdmin/homeRecommend/addRecommend",
        method: "post",
        data
    })
}


export {
    findAllRecommends,
    delRecommend,
    addRecommend
}
