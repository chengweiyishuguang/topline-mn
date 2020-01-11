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
      <ValidationProvider name="手机号" rules="required|mobile" >
      <van-field label="手机号"
      placeholder="请输入手机号"
      v-model="user.mobile">
      </van-field>
      <!-- errors[0]获取验证失败的错误消息 -->
      <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required|code">
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
import { validate } from 'vee-validate'
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
      // 如果验证失败，提示错误消息，停止表单提交
      if (!success) {
        // 这里加定时器的原因是因为获取验证失败结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach无法停止遍历
          // find 方法遍历数组，对每个元素执行方法中的条件判定
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
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
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
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
      // 参数1：需要校验的数据
      // 参数2：验证规则
      // 参数3：一个可选配置对象，例如配置错误消息字段名称name
      // 返回值：{valid，errors}
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误信息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }

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
