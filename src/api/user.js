/**
 *用户相关请求
 */
import request from '@/untils/request'
export const login = data => {
  return request({
    // 请求方法
    method: 'post',
    // 请求路径
    url: '/app/v1_0/authorizations',
    // // 请求头
    // headers: {},
    // // query查询参数
    // params: {},

    // data: {}
    data
  })
}
