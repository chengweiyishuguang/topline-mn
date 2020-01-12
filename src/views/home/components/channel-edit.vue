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
    v-for="channel in remainingChannels"
    :key="channel.id"
    :text="channel.name"
  />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []// 所有频道
    }
  },
  computed: {
    remainingChannels () {
      const { allChannels, userChannels } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        // 如果我的频道中不包含被遍历的频道，则要添加到推荐频道
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  created () {
    this.loadAllChannels()
  }

}
</script>

<style scoped lang="less">
    .channel-edit {
        padding:40px ;
    }

</style>
