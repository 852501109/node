/*
 * @Author: your name
 * @Date: 2021-12-16 09:01:58
 * @LastEditTime: 2022-01-14 15:35:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gw\pubHealth_front\src\utils\request.js
 */
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'multipart/form-data;' },
  // transformRequest: [(data) => {
  //   return JSON.stringify(data)
  // }]
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

})
// axios.defaults.withCredentials = false
// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
    // if the custom code is not 200, it is judged as an error.
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
