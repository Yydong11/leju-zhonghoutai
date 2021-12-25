import request from '@/utils/request'

// 封装获取素材列表接口
function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`
  })
}
// 封装新增素材接口
function uploadFileOssSave() {
  return request({
    url: '/lejuAdmin/material/uploadFileOssSave',
    method: 'post'
  })
}

export {
  findMaterialByPage,
  uploadFileOssSave
}
