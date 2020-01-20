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

  <van-cell title="昵称"
  :value="user.name"
  is-link
   @click="isEditNameShow=true"
   />
  <!-- <van-cell title="介绍" value="hell word" is-link/> -->
  <van-cell title="性别" :value="user.gender=== 0 ?'男':'女'" is-link/>
  <van-cell title="生日" :value="user.birthday" is-link/>
</van-cell-group>
<!-- 修改昵称弹层 -->
  <van-popup
  v-model="isEditNameShow"
  position="bottom">
  <!-- 编辑名字 -->
  <edit-name
  :name="user.name"
  @close="isEditNameShow=false"
  @confirm ="onSave"
   />
  </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import EditName from './components/edit-name'
export default {
  components: {
    EditName
  },
  name: 'userProfile',
  data () {
    return {
      user: {},
      isEditNameShow: false
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
    },
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [field]: value
        })

        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.file('更新失败')
      }
    },
    async onSave (name) {
      // console.log(name)

      await this.saveProfile('name', name)
      // 更新成功以后更新试图
      this.user.name = name
      this.isEditNameShow = false
    }
  },
  created () {
    this.loadProfile()
  }

}
</script>

<style>

</style>
