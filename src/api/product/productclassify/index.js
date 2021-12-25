import request from '@/utils/request'

// 封装获取所有分类接口
function getAllCategory() {
  return request({
    url: '/lejuAdmin/category/getAllCategory'
  })
}

export {
  getAllCategory
}
