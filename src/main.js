import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './untils/register-vant.js'
import './untils/validation'
import './untils/datetime'
// 加载全局样式
// 注意：该样式文件要放到第三方样式之后
import '@/styles/index.less'
import 'normalize.css'
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
