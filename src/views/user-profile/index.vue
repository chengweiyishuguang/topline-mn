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
     :src="user.photo"
    />

</van-cell>

  <van-cell title="昵称" :value="user.name" is-link/>
  <!-- <van-cell title="介绍" value="hell word" is-link/> -->
  <van-cell title="性别" :value="user.gender=== 0 ?'男':'女'" is-link/>
  <van-cell title="生日" :value="user.birthday" is-link/>
</van-cell-group>

  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'userProfile',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.file('获取失败')
      }
    }
  },
  created () {
    this.loadProfile()
  }

}
</script>

<style>

</style>
