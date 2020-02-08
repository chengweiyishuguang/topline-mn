<template>
  <div class="uesr-articles">
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
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
  data () {
    return {
      active: 0// 控制标签激活的选项卡
    }
  }
}
</script>

<style>
</style>
