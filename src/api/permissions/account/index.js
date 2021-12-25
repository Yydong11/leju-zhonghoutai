import request from '@/utils/request'

// 封装获取品牌管理接口
function findUsersByPage(start, limit, data) {
    return request({
        url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
        method: "post",
        data
    })
}

export {
    findUsersByPage
}
