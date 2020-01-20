<template>
<div class="edit-name">
  <van-nav-bar
  title="编辑昵称"
  left-text="取消"
  right-text="确定"
  @click-left="$emit('close')"
  @click-right="$emit('confirm',message)"
/>
<van-field
 :value="name"
 @input="message=$event"
  rows="2"
  autosize
  type="textarea"
  maxlength="20"
  placeholder="请输昵称"
  show-word-limit
/>
</div>
</template>

<script>
export default {
  name: 'EditName',
  props: {
    name: {
      type: String,
      default: ''
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
.van-nav-bar {
    background-color: #fff;
    .van-nav-bar__title {
        color:#333;
    }
}
    // 非根节点要加/deep/
    /deep/.van-cell__value {
        background-color: #f5f5f5;
        padding:10px;
    }

</style>
