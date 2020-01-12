<template>
  <div class="home-container">
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
      >
      <!-- 让子组件双向绑定active
      在子组件上使用v-model
      默认传递一个名字叫value的数据给子组件:value="active"
      默认监听名字叫input的自定义事件@input="active=事件参数"
      当子组件内部发布：this.$emit('input',123)-->
      <channel-edit
       :user-channels="userChannels"
        v-model="active"
        @close="isChannelEditShow = false"

       />
      </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/untils/storage'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  methods: {
    async loadUserChannels () {
      // 1. 定义一个变量用来存储频道列表
      let channels = []
      // 2. 获取本地存储的频道列表
      const localUserChannles = getItem('user-channels')
      // 3. 如果本地存储有，就使用本地存储的
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }
      // 5. 最后，把数据赋值到当前组件中
      this.userChannels = channels
    }

    // async loadUserChannels () {
    //   let channel = []
    //   const localUserChannles = getItem('user-channels')
    //   if (localUserChannles) {
    //     channel = localUserChannles
    //   } else {
    //     const { data } = await getUserChannels()
    //     channel = data.data.channels
    //   }
    //   this.userChannels = channel
    // }
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
