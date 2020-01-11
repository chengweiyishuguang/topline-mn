<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
     <van-grid square>
  <van-grid-item
    v-for=" channel in userChannels"
    :key="channel.id"
    :text="channel.name"
  />
</van-grid>

<van-cell title="推荐频道" :border="false" />

   <van-grid square>
  <van-grid-item
    v-for="value in 8"
    :key="value"
    text="文字"
  />
</van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  }

}
</script>

<style scoped lang="less">
    .channel-edit {
        padding:40px ;
    }

</style>
