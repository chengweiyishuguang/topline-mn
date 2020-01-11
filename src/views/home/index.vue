<template>
  <div clss="home-container">
      <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
      <!-- /导航栏 -->

      <!-- 频道列表 -->
        <van-tabs v-model="active">
          <van-icon
          slot="nav-right"
          name="wap-nav"
         class="wap-nav"
         @click="isChannelEditShow=true"
          />
          <van-tab :title="channel.name"
          v-for ="channel in userChannels"
          :key = "channel.id"
          >
            <article-list :channel="channel" />
          </van-tab>
        </van-tabs>

      <!-- /频道列表 -->
      <!-- 频道编辑 -->
      <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      />

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

      userChannels: [], // 用户频道列表
      isChannelEditShow: false
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

<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }

/* 在有作用域样式的组件中：默认只能对子组件的根节点样式生效 */
// .vue 文件中有一个专有的特殊语法：让样式作用的更深（主要针对的子组件）
// 使用 >>>、/deep/、::v-deep
::v-deep .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2;
}

</style>
