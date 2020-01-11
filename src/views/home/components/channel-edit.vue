<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid>
  <van-grid-item  text="文字" />
  <van-grid-item  text="文字" />
  <van-grid-item  text="文字" />
  <van-grid-item  text="文字" />
</van-grid>

<van-cell title="推荐频道" :border="false" />

    <van-grid>
  <van-grid-item text="文字" />
  <van-grid-item text="文字" />
  <van-grid-item text="文字" />
  <van-grid-item text="文字" />
</van-grid>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .channel-edit {
        padding:40px ;
    }

</style>
