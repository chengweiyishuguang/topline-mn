<template>
  <div class="user-profile">
    <van-nav-bar
  title="编辑资料"
  left-arrow
  @click-left="$router.back()"
/>
<van-cell-group>
  <van-cell title="头像" is-link>
    <van-image
    width="30"
    height="30"
    round
     src="https://img.yzcdn.cn/vant/cat.jpeg"
    />

</van-cell>

  <van-cell title="昵称" value="黑马头条号" is-link/>
  <van-cell title="介绍" value="hell word" is-link/>
  <van-cell title="性别" value="男" is-link/>
  <van-cell title="生日" value="2015-1-15" is-link/>
</van-cell-group>

  </div>
</template>

<script>
export default {
  name: 'userProfile'
}
</script>

<style>

</style>
