<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
        <van-button
        @click="isEditShow=!isEditShow"
        size="mini"
        round
        type="danger"
         plain>{{isEditShow?'完成':'编辑'}}</van-button>
    </van-cell>
     <van-grid :gutter="10">
  <van-grid-item

    v-for="(channel,index) in userChannels"
    :key="channel.id"
     @click="onUserChannelClick(index)"
  >
  <span class="text" slot="text" :class="{active:value === index}">{{channel.name}}</span>
 <van-icon v-show="isEditShow && index!==0" class="close-icon" slot="icon" name="close" />
  </van-grid-item>
</van-grid>

<van-cell title="推荐频道" :border="false" />

   <van-grid :gutter="10">
  <van-grid-item
    v-for="channel in remainingChannels"
    :key="channel.id"
    :text="channel.name"
    @click="onAdd(channel)"
  />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/untils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false// 编辑的显示状态
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
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，则删除频道
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        // 如果是非编辑状态，则切换频道
        this.$emit('input', index) // 修改激活的标签
        this.$emit('close') // 关闭弹层
      }
    }

  },
  watch: {
    userChannels () {
      setItem('user-channels', this.userChannels)
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
        ::v-deep .van-grid-item__content {
            position: relative;
            background: #f4f5f6;
            .van-grid-item__icon-wrapper {
                position: absolute;
                top:-10px;
                right:0px;
                .close-icon {
                    font-size:12px;
                }
            }
        }
    }
 .text {
    font-size: 14px;
    color: #222;
  }
  .active {
    color: red;
  }
</style>
