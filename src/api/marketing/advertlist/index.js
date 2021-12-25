import request from '@/utils/request'

// 封装获取广告列表接口
function adsList() {
    return request({
        url: '/lejuAdmin/advertise/adsList'
    })
}
// 封装删除广告接口
function delAds(adsId) {
    return request({
        url: `/lejuAdmin/advertise/delAds/${adsId}`,
        method: "delete"
    })
}
// 封装新增广告接口
function addAds(data) {
    return request({
        url: "/lejuAdmin/advertise/addAds",
        method: "post",
        data
    })
}
// 封装更新广告接口
function updateAds(data) {
    return request({
        url: "/lejuAdmin/advertise/updateAds",
        method: "post",
        data
    })
}


export {
    adsList,
    delAds,
    addAds,
    updateAds
}
