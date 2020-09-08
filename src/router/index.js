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
import { getToken } from '@/utils/TokenUtil'
import CustomerService from '@/views/CustomerService'
import EmployeeManage from '@/views/EmployeeManage'
import OrderManage from '@/views/OrderManage'
import CustomerManage from '@/views/CustomerManage'

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
        path: '/customerService',
        name: 'CustomerService',
        component: CustomerService
      },
      {
        path: '/systemManage',
        name: 'SystemManage',
        component: SystemManage
      },
      {
        path: '/employeeManage',
        name: 'EmployeeManage',
        component: EmployeeManage
      },
      {
        path: '/orderManage',
        name: 'OrderManage',
        component: OrderManage
      },
      {
        path: '/customerManage',
        name: 'CustomerManage',
        component: CustomerManage
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
// 路由守卫监控是否登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 如果去登录页直接放行到登录页
    next()
  } else {
    // 如果不是去登录页，则判断是否登录
    if (getToken() == null) {
      // 未登录,跳转到登录页
      next('/login')
    } else {
      // 登录，放行
      next()
    }
  }
})

export default router
