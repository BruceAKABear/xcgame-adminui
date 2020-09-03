import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import DashBoard from '@/views/DashBoard'
import AppManage from '@/views/AppManage'
import GameManage from '@/views/GameManage'
import ContentManage from '@/views/ContentManage'
import DataManage from '@/views/DataManage'
import SystemManage from '@/views/SystemManage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashBoard',
    children: [
      {
        path: '/dashBoard',
        name: 'DashBoard',
        component: DashBoard
      },
      {
        path: '/appManage',
        name: 'AppManage',
        component: AppManage,
        meta: {
          title: '应用管理'
        }
      },
      {
        path: '/gameManage',
        name: 'GameManage',
        component: GameManage
      },
      {
        path: '/contentManage',
        name: 'ContentManage',
        component: ContentManage
      },
      {
        path: '/dataManage',
        name: 'DataManage',
        component: DataManage
      },
      {
        path: '/systemManage',
        name: 'SystemManage',
        component: SystemManage
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
