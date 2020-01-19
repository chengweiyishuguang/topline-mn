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
    <!-- 底部区域 -->
    <div class="footer">
      <van-button
      class="write-btn"
      type="default"
      round
      size="small"
      @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
      color="#e5645f"
      name="good-job"
      />

    </div>
    <!-- /底部区域 -->
    <!-- 发布回复 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
  <post-comment
    v-model="postMessage"
    @click-post="onPost"

  />
    </van-popup>
       <!--/ 发布回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments, addComment } from '@/api/comment'
import PostComment from './post-comment'
export default {
  name: 'commentReply',
  components: {
    CommentItem,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true

    }
  },

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false, // 发布回复的显示状态
      postMessage: ''
    }
  },
  methods: {
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
    },
    async onPost () {
      const postMessage = this.postMessage
      // 非空校验
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 2. 请求提交
        const { data } = await addComment({
          target: this.comment.com_id.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: postMessage, // 评论内容
          art_id: this.articleId.toString() // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // 关闭发布评论的弹层
        this.isPostShow = false
        // 将最新发布的评论展示到列表的顶部
        this.list.unshift(data.data.new_obj)
        // 更新文章评论的回复总数量
        this.comment.reply_count++
        // 清空文本框
        this.postMessage = ''
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    }
  }

}
</script>

<style scoped lang="less">
.comment-reply {
  padding-bottom:44px;
}
.reply-nav-bar {
  background: #fff;
  .van-icon, .van-nav-bar__title, .van-nav-bar__right {
    color: #333;
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 160px;
  }
  .van-icon {
    font-size: 20px;
  }
}

</style>
