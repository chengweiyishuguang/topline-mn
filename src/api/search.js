/**
 * 搜索接口模块
 */
import request from '@/untils/request'

/**
 *获取搜索联想建议
 */
export const getSuggestions = q => {
  return request({
    methid: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
