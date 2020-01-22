<template>
  <div class="user-profile">
    <van-nav-bar
  title="编辑资料"
  left-arrow
  @click-left="$router.back()"
/>
<van-cell-group>
  <van-cell title="头像" is-link @click="onSelectFile">
    <van-image
    width="30"
    height="30"
    round
     :src="user.photo"
    />

</van-cell>
<input type="file" hidden ref="file" @change="onFileChange">
  <van-cell title="昵称"
  :value="user.name"
  is-link
   @click="isEditNameShow=true"
   />
  <!-- <van-cell title="介绍" value="hell word" is-link/> -->
  <van-cell
  title="性别"
  @click="isEditGenderShow=true"
  :value="user.gender=== 0 ?'男':'女'"
  is-link/>
  <van-cell title="生日"
  :value="user.birthday"
  is-link
  @click="isEditBirthdayShow=true"
  />
</van-cell-group>
<!-- 修改昵称弹层 -->
  <van-popup
  v-model="isEditNameShow"
  position="bottom">
  <!-- 编辑名字 -->
  <edit-name
  :name="user.name"
  @close="isEditNameShow=false"
  @confirm ="onNameConfrim"
   />
  </van-popup>
  <!-- /修改昵称弹层 -->
  <!-- 修改性别 -->
  <van-action-sheet
  v-model="isEditGenderShow"
  :actions="actions"
  @select="onGenderSelect"
  cancel-text="取消"
   />
  <!-- /修改性别 -->
  <!-- 修改生日 -->
  <van-popup
  v-model=" isEditBirthdayShow"
  position="bottom">

  <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="isEditBirthdayShow=false"
  @confirm="onBirthdayConfirm"
/>
  </van-popup>
  <!--/ 修改生日 -->
  <!-- 头像上传 -->
    <van-image-preview
      v-model="isPreviewPhotoShow"
      :images="pewviewImages"
      @close="file.value=''"
    >
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确认"
        @click-left="isPreviewPhotoShow = false"
        @click-right="onPhotoConfirm"
      />
    </van-image-preview>
  <!-- /头像上传 -->
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, updateUserPhoto } from '@/api/user'
import EditName from './components/edit-name'
import moment from 'moment'
export default {
  components: {
    EditName
  },
  name: 'userProfile',
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isPreviewPhotoShow: false,
      pewviewImages: [],

      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }

      ],
      minDate: new Date(1989, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  computed: {
    file () {
      return this.$refs['file']
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
    async onNameConfrim (name) {
      // console.log(name)

      await this.saveProfile('name', name)
      // 更新成功以后更新试图
      this.user.name = name
      this.isEditNameShow = false
    },
    async onGenderSelect ({ value }) {
      // 请求更新

      // await this.saveProfile('gender', value)
      await this.saveProfile('gender', value)
      this.user.gender = value
      this.isEditGenderShow = false

      // 更新视图
      // this.user.gender = value
      // 关闭上拉菜单
      // this.isEditGenderShow = false
    },
    async  onBirthdayConfirm (value) {
      value = moment(value).format('YYYY-MM-DD')
      // 请求更新
      await this.saveProfile('birthday,value')
      // 更新视图
      this.user.birthday = value
      // 关闭弹层
      this.isEditBirthdayShow = false
    },
    onSelectFile () {
      // 手动触发DOM节点的click事件
      this.file.click()
    },
    onFileChange () {
    // 文件对象
      const fileObj = this.file.files[0]
      // 获取文件数据
      const fileData = URL.createObjectURL(fileObj)
      // 将要预览的图片到数组
      this.pewviewImages = [fileData]
      // 显示图片预览
      this.isPreviewPhotoShow = true
    },
    async onPhotoConfirm () {
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await updateUserPhoto(fd)
        this.user.photo = data.data.photo
        this.$toast.success('更新成功')
        // 关闭图片预览
        this.isPreviewPhotoShow = false
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    }
  },
  created () {
    this.loadProfile()
  }

}
</script>

<style scoped lang="less">
/deep/.van-image-preview__cover {
  top:unset;
  left:0;
  bottom:0;
  right:0;
  .van-nav-bar {
    background-color: #181818;
    .van-nav-bar__text .van-nav-bar__right {
      color:#fff;
    }
  }
}

</style>
