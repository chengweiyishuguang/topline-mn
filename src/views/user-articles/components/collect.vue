<template>
  <div class="article-container">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
  <van-cell
  v-for="(article,index) in list"
  :key="index"
  :title="article.title"
  @click="$router.push({
      //根据name跳转路由的方式
      //传动态参数
      name:'article',
      params:{
          articleId:article.art_id.toString()
      }
  })"
  />
</van-list>
  </div>
</template>

<script>
import { getCollectArticles } from '@/api/article'
export default {
  name: 'UserAticle',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10// 每页大小
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getCollectArticles({
        // 分页参数
        page: this.page,
        per_page: this.perPage
      })

      // 2.将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次loading结束
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.page++// 更新获取下一页数据页码
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
