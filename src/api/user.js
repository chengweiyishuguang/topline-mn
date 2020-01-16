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
export const getSmsCode = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 *
 * 获取当前用户信息
 */
export const getUserInfo = mobile => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
/**
 *获取用户频道列表或默认推荐频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}

/**
 *添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 *取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`

  })
}
