import request from './upRequest.js'
// 上传图片
export function buffer(data) {
  return request({
    url: '/uploadFile/saveFile]]',
    method: 'post',
    data: data
  })
}
