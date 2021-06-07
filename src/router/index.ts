import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import { DashboardName } from '@/utils/constance'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        // 带参数的动态路由正则匹配
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/login-gitee',
    component: () => import('@/views/login/LoginGitee.vue'),
    name: 'LoginGitee'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: DashboardName,
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-eleme',
          affix: true
        }
      }
    ]
  }

]

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout, // 布局组件作为一级路由
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Document',
        component: () => import(/* webpackChunkName: "document" */ '@/views/document/index.vue'),
        meta: {
          title: 'Document',
          icon: 'documentation'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    meta: {
      title: 'Guide父级',
      icon: 'guide',
      alwaysShow: true
    },
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'guide',
          activeMenu: '/documentation/index'

        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock'
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'list'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
        meta: {
          title: 'Role Management',
          icon: 'list'
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/system/user.vue'),
        meta: {
          title: 'User Management',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/guide1',
    component: Layout,
    redirect: '/guide1/index1',
    meta: {
      title: 'Guide父级1',
      icon: 'guide',
      alwaysShow: true
    },
    children: [
      {
        path: 'index1',
        name: 'Guide1',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide1',
          icon: 'guide'

        }
      }
    ]
  },
  {
    path: '/guide2',
    component: Layout,
    redirect: '/guide2/index2',
    meta: {
      title: 'Guide父级2',
      icon: 'guide',
      alwaysShow: true
    },
    children: [
      {
        path: 'index2',
        name: 'Guide2',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide2',
          icon: 'guide',
          activeMenu: '/documentation/index'

        }
      }
    ]
  },
  { // 外链路由
    path: '/github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/qqjay2017/v3-admin/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'github'
        }
      }
    ]
  }
]

export const routes = [
  ...constantRoutes,
  ...asyncRoutes
]

const create = () => createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

const router = create()

export default router
