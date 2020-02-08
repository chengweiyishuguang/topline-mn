<template>
  <div class="uesr-articles">
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
    <van-tabs v-model="active">
      <van-tab title="我的收藏">内容 1</van-tab>
      <van-tab title="我的历史">内容 2</van-tab>
      <van-tab title="我的作品">
          <User-ariticle/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserAriticle from './components/article'
export default {
  name: 'UserAriticles',
  components: {
    UserAriticle
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
