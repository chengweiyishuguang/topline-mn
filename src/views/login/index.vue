<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!--表单-->
    <!-- vee-vilidate验证插件的具体使用
    1使用 ValidationObserver 把需要校验的整个表单包起来
    2使用 ValidationProvider 把需要校验的表单元素包起来 列入input
    3通过 ValidationProvider 配置具体的校验规则
    name 配置验证字段名称
    rules 验证规则
      rules="requried"单个验证规则
      rules="required|length"多个验证规则使用|分隔
      v-slot ="{errors}"获取错误消息-->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required" >
      <van-field label="手机号"
      placeholder="请输入手机号"
      v-model="user.mobile">
      </van-field>
      <!-- errors[0]获取验证失败的错误消息 -->
      <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required">
      <van-field label="验证码"
       placeholder="请输入验证码"
       v-model="user.code">
        <van-count-down
        v-if="isCountDownShow"
        slot="button"
        :time="1000*60"
        format="ss s"
        @finish="isCountDownShow = false"
        >

        </van-count-down>
          <van-button
          v-else
          slot="button"
          size="small"
          type="primary"
          @click="onSendSmsCode"
          >
          发送验证码
          </van-button>
      </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <!-- /表单 -->
    <!-- 登陆按钮 -->
    <div class="btn-wrap">
        <van-button type="info"
        @click="onLogin">
        登录
        </van-button>
    </div>

  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
// import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      isCountDownShow: false, // 是否显示倒计时
      user: {
        mobile: '',
        code: ''
      }
    }
  },

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
      const success = await this.$refs.form.validate()
      if (!success) {
        console.log('验证失败')
        return
      }
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
    },
    async onSendSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.校验手机号是否有效

      // 3.发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        // 判断如果返回的状态是429说明操作过于频繁给出提示
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
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
