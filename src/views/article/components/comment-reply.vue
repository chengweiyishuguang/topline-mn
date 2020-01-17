<template>
<!-- 导航栏 -->
  <div class="comment-reply">
      <van-nav-bar
        title="0条回复"
    >
    <van-icon
    slot="left"
    name="cross"
    @click="$emit('click-close')"

    />
    </van-nav-bar>
    <!-- /导航栏 -->
  <!-- 当前评论项 -->
    <comment-item :comment="comment"/>
    <!-- /当前评论项 -->

    <van-cell title="所有回复"/>

    <!-- 评论的回复列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment-item
         v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        />
    </van-list>
    <!-- /评论的回复列表 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'commentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
    }
  },
  methods: {
    // async onLoad () {
    //   // 1请求获取当前数据
    //   const { data } = await getComments({
    //     type: 'c',
    //     source: this.comment.com_id.toString(),
    //     offset: this.offset,
    //     limit: this.limit
    //   })
    //   // 2将数据添加到列表中
    //   const { results } = data.data
    //   this.list.push(...results)
    //   // 3关闭loading
    //   this.loading = false
    //   // 4判断数据是否加载完成
    //   if (results.length) {
    //     this.offset = data.data.last_id
    //   } else {
    //     this.finished = true
    //   }
    // }
    async onLoad () {
      console.log('onLoad')
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.comment.com_id.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 关闭 loading
      this.loading = false
      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }

}
</script>

<style>

</style>
