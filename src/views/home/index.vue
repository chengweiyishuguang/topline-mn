<template>
  <div clss="home-container">
      <!-- 导航栏 -->
    <van-nav-bar title="登录" />
      <!-- /导航栏 -->

      <!-- 频道列表 -->
        <van-tabs v-model="active">
          <van-tab :title="channel.name"
          v-for ="channel in userChannels"
          :key = "channel.id"
          >
            <article-list :channel="channel" />
          </van-tab>
        </van-tabs>

      <!-- /频道列表 -->

      <!-- 文章列表 -->

      <!-- /文章列表 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,

      userChannels: []// 用户频道列表
    }
  },
  methods: {
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style>

</style>
