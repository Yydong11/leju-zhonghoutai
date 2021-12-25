import request from '@/utils/request'

// 封装获取用户列表接口
function findMembersByPage(start, limit) {
    return request({
        url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`
    })
}

export {
    findMembersByPage
}
