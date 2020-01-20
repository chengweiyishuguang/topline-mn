import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'

Vue.use(VueRouter)
// 配置路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('../views/login')
}, {
  path: '/',
  // 不要给有默认子路由的父路由起名字
  // name: 'tab-bar',
  component: () => import('@/views/tab-bar'),
  children: [
    {
      path: '', // 默认子路由
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: 'qa',
      name: 'qa',
      component: () => import('@/views/qa')
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/video')
    },
    {
      path: 'my',
      name: 'my',
      component: () => import('@/views/my')
    }
  ]

},
{
  path: '/search',
  name: 'search',
  component: () => import('@/views/search')

},
{
  path: '/article/:articleId',
  name: 'article',
  component: () => import('@/views/article'),
  // 将路由动态参数映射到组件的 props 中，更推荐这种做法
  // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
  props: true

},
{
  path: '/user/profile',
  name: 'user-profile',
  component: () => import('@/views/user-profile')

}
]

const router = new VueRouter({
  routes
})

export default router
