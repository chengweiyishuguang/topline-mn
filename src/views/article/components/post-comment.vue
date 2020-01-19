<template>
<div class="post-comment">
    <van-field
          class="post-field"
            rows="2"
            autosize
            :value= "value"
            @input="$emit('input',$event)"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
          <van-button
           size="small"
           type="primary"
           :disabled="!value"
           @click="$emit('click-post')"

           >发布</van-button>

</div>
</template>

<script>
export default {
  name: 'PostComment',
  // 声明接收comment-reply传值
  props: {
    value: {
      type: String,
      required: true

    }
  },
  data () {
    return {
      message: ''
    }
  }

}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: flex-end;
  padding:10px;
  .post-field {
    background-color: #f5f7f9;
    margin-right:15px;
  }
}

</style>
