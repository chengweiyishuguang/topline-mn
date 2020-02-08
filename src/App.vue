<template>
<div id="app">
  <!-- router-view就是一个动态组件 -->
  <!-- 默认路由在跳转新的页面时会销毁当前页面渲染新的页面 -->
  <!-- 用keep alive可以缓存页面 -->
  <!-- 缓存完以后不在触发生命周期了 ，点击第一个详情页有变化，其它都不会变-->
 <!--默认缓存所有组件
 include 可以配置哪些组件缓存
 exclude 胚珠哪些 组件不缓存
  -->
  <keep-alive :include="$store.state.cachePages">
    <router-view></router-view>
  </keep-alive>

</div>
</template>

<script>
export default {
  // 最好给每个组件取一个名字
  name: 'App',
  data () {
    return {
      //
      cachePages: ['TabBar']
    }
  }

}
</script>

<style scoped>

</style>
