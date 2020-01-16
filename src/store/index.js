import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/untils/storage.js'
// 解析token的包
import decodeJWT from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        // 解析data.token
        data.id = decodeJWT(data.token).user_id
      }
      state.user = data
      // 为了防止刷新数据丢失，这里还需要把数据放到本地储存持久化
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {

  }
})
