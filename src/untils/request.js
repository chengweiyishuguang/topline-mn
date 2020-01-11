/**
 * 增装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在javascript 模块中直接import获取容器即可
// 这里得到的store和你在组件中的this.$store是一样的
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置 Token
  const { user } = store.state
  if (user) {
    // 后端要求把 token 放到请求头中，使用名字 Authorization 指定
    // config.headers 用来获取本次的请求头对象，这是 axios 的固定 API
    // 注意，后端要求的 token 数据格式为：Bearer token数据，要注意 Bearer 后面有一个空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
