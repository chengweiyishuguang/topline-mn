/**
 * 增装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在javascript 模块中直接import获取容器即可
// 这里得到的store和你在组件中的this.$store是一样的
import store from '@/store'
import router from '@/router'
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
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 1如果没有refresh_token,则直接跳转登录页
    const user = store.state.user
    // 如果用户不存在或者用户的refrsh_token也不存在
    if (!user || !user.refresh_token) {
      // 直接跳转登录页
      redirectLogin()
      return
    }
    // 2 如果有则请求更新token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 3 如果刷新token成功了则把新的token更新到容器中
      store.commit('setUser', {
        ...user, // 原来的数据不变
        token: data.data.token// 更新token
      })
      // 4.把之前失败的请求发出去
      // error.config获取的是本次请求相关的配置对象其中包括method,url等信息
      return request(error.config)
    } catch (err) {
      console.log('刷新 token失败', err)
      this.redirectLogin()
    }
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.push({
    name: '/login',
    query: {
      // 这里使用查询参数把要转回来的路由地址传递给登录页
      // router.currentRoute 就是当前路由对象，好比我们在组件中的this.$route
      // 当前路由对象的fullpath就是当前路由路径
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
