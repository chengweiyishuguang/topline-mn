<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!--表单-->
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号" v-model="user.mobile"/>

      <van-field label="验证码" placeholder="请输入验证码" v-model="user.code">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- /表单 -->
    <!-- 登陆按钮 -->
    <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  name: 'LoginPage',
  components: {},
  props: {},

  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      // 1获取表单数据
      const user = this.user
      // 2表单验证
      // 表单通过loading转圈圈
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3提交请求
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
      // 4根据接口返回结果执行后续处理
    }
  }
}
</script>

<style scoped lang="less">
    .btn-wrap {
        padding:27px 16px;

        .van-button {
            width: 100%;
            background-color: #6db4fb;
        }
    }
</style>
