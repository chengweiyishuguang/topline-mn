
/**
 *获取频道的文章列表
 */
import request from '@/untils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取文章详情列表
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏指定文章
 */
export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消收藏
 */
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`

  })
}
