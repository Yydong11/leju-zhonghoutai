import request from '@/utils/request'

// 封装获取地址列表接口
function addressList() {
  return request({
    url: '/lejuAdmin/companyAddress/addressList'
  })
}
// 封装新增地址接口
function save(data) {
  return request({
    url: '/lejuAdmin/companyAddress/save',
    method: 'post',
    data
  })
}
// 封装设置默认发货地址接口
function setSendOne(data) {
  return request({
    url: '/lejuAdmin/companyAddress/setSendOne',
    method: 'post',
    data
  })
}
// 封装设置默认收货地址接口
function setReceiveOne(data) {
  return request({
    url: '/lejuAdmin/companyAddress/setReceiveOne',
    method: 'post',
    data
  })
}
// 封装更新收货地址接口
function update(data) {
  return request({
    url: '/lejuAdmin/companyAddress/update',
    method: 'post',
    data
  })
}
// 封装删除收货地址接口
function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete'
  })
}

export {
  addressList,
  save,
  setSendOne,
  setReceiveOne,
  update,
  companyAddress
}
