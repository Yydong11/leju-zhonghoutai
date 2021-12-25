import request from '@/utils/request'

// 封装获取品牌管理接口
function findBrandByPage(start, limit) {
    return request({
        url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`
    })
}
// 封装新增品牌接口
function addBrand(data) {
    return request({
        url: "/lejuAdmin/brand/addBrand",
        method: 'post',
        data
    })
}
// 封装编辑品牌接口
function updateBrand(data) {
    return request({
        url: "/lejuAdmin/brand/updateBrand",
        method: 'post',
        data
    })
}
// 封装更改是否显示接口
function switchShowStatus(data) {
    return request({
        url: "/lejuAdmin/brand/switchShowStatus",
        method: 'post',
        data
    })
}
// 封装删除品牌接口
function delBrand(id) {
    return request({
        url: `/lejuAdmin/brand/delBrand/${id}`,
        method: 'delete'
    })
}


export {
    findBrandByPage,
    addBrand,
    updateBrand,
    switchShowStatus,
    delBrand
}
