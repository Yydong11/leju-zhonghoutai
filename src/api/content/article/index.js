import request from '@/utils/request'

// 封装获取文章列表接口
function findArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 封装更新文章状态接口
function changeShowStatus(data) {
  return request({
    url: '/lejuAdmin/productArticle/changeShowStatus',
    method: 'post',
    data
  })
}
// 封装通用素材图片上传接口
function uploadFileOss(data) {
  return request({
    url: '/lejuAdmin/material/uploadFileOss',
    method: 'post',
    data
  })
}
// 封装上传文章接口
function addArticle(data) {
  return request({
    url: '/lejuAdmin/productArticle/addArticle',
    method: 'post',
    data
  })
}
// 封装上传文章接口
function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`
  })
}
// 封装更新文章接口
function updateArticle(data) {
  return request({
    url: '/lejuAdmin/productArticle/updateArticle',
    method: 'post',
    data
  })
}
// 封装删除文章接口
function del(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}

export {
  findArticles,
  changeShowStatus,
  uploadFileOss,
  addArticle,
  productArticle,
  updateArticle,
  del
}
