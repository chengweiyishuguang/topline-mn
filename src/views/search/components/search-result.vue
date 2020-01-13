<template>
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
  />
  </van-list>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 请求获取数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.q// 搜索关键字
      })
      // 2.将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.设置加载状态结束
      this.loading = false
      // 4.判断数据是否加载成功
      if (results.length) {
        this.page++// 更新获取下一页数据页码
      } else {
        this.finished = true// 没有数据了，将加载状态设置接收不在onload
      }
    }

  }

}
</script>

<style>

</style>
