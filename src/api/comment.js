/**
 *文章评论接口
 */
import request from '@/untils/request'
/**
 *获取指定文章评论列表
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 *发布评论
 */

export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
