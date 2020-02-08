<template>
  <div class="uesr-articles">
    <van-nav-bar title="我的收藏/历史/作品"
    left-arrow
    @click-left="$router.back()"
    fixed
     />
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
          <collect-article/>
      </van-tab>
      <van-tab title="我的历史">
           <history-article/>
      </van-tab>
      <van-tab title="我的作品">
          <User-article/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
import CollectArticle from './components/collect'
import HistoryArticle from './components/history'
export default {
  name: 'UserAriticles',
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2// 默认我的作品
    }
    return {
      active// 控制激活标签选项
    }
  },
  methods: {
    // 当前页面路由跳转的时候触发这个钩子函数
    beforeRouteLeave (to, from, next) {
      // 如果跳转的的文章详情页则把当前页面缓存起来
      if (to.name === 'article') {
        this.$store.commit('addCachePage', 'UserArticles')
      } else {
        this.$store.commit('removeCachePage', 'UserArticles')
      }
      next()
    }
  }
}
</script>

<style scoped lang="less">
.user-articles{
    padding-top:90px;
    padding-bottom:50px;
}
::v-deep .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2;
}

</style>
