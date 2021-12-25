import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  // 权限管理
  {
    path: '/permissions',
    component: Layout,
    redirect: '/permissions/account',
    name: 'Permissions',
    meta: { title: '权限管理', icon: 'permissions' },
    children: [
      {
        path: 'account',
        name: 'PermissionsAccount',
        component: () => import('@/views/permissions/account/index'),
        meta: { title: '账号管理', icon: 'account' }
      },
      {
        path: 'role',
        name: 'PermissionsRole',
        component: () => import('@/views/permissions/role/index'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'resources',
        name: 'PermissionsResources',
        component: () => import('@/views/permissions/resources/index'),
        meta: { title: '资源管理', icon: 'resources' }
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: Layout,
    redirect: '/product/productlist',
    name: 'Product',
    meta: { title: '商品管理', icon: 'product' },
    children: [
      {
        path: 'productlist',
        name: 'ProductProductList',
        component: () => import('@/views/product/productlist/index'),
        meta: { title: '商品列表', icon: 'productlist' }
      },
      {
        path: 'addProduct',
        name: 'ProductAddProduct',
        hidden: true,
        component: () => import('@/views/product/addProduct/index'),
        meta: { title: '新增商品', icon: 'productlist', activeMenu: "/product/productlist" }
      },
      {
        path: 'editProduct',
        name: 'ProductEditProduct',
        hidden: true,
        component: () => import('@/views/product/addProduct/index'),
        meta: { title: '编辑商品', icon: 'productlist', activeMenu: "/product/productlist" }
      },
      {
        path: 'productclassify',
        name: 'ProductProductClassify',
        component: () => import('@/views/product/productclassify/index'),
        meta: { title: '商品分类', icon: 'productclassify' }
      },
      {
        path: 'productbrand',
        name: 'ProductProductBrand',
        component: () => import('@/views/product/productbrand/index'),
        meta: { title: '品牌管理', icon: 'productbrand' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderlist',
    name: 'Order',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'orderlist',
        name: 'OrderOrderlist',
        component: () => import('@/views/order/orderlist/index'),
        meta: { title: '订单列表', icon: 'orderlist' }
      },
      {
        path: 'orderlist/orderinfo',
        name: 'orderlistOrderInfo',
        component: () => import('@/views/order/orderlist/orderinfo/index'),
        hidden: true,
        meta: { title: '订单详情', icon: 'orderlist', activeMenu: "/order/orderlist" }
      },
      {
        path: 'refund',
        name: 'OrderRefund',
        component: () => import('@/views/order/refund/index'),
        meta: { title: '退单列表', icon: 'refund' }
      },
      {
        path: 'refund/refundinfo',
        name: 'refundRefundInfo',
        component: () => import('@/views/order/refund/refundinfo/index'),
        hidden: true,
        meta: { title: '退单详情', icon: 'refund', activeMenu: "/order/refund" }
      },
      {
        path: 'address',
        name: 'OrderAddress',
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'address' }
      }
    ]
  },
  // 注册用户管理
  {
    path: '/register',
    component: Layout,
    redirect: '/register/user',
    alwaysShow: true,
    name: 'Register',
    meta: { title: '注册用户管理', icon: 'register' },
    children: [
      {
        path: 'user',
        name: 'RegisterUser',
        component: () => import('@/views/register/user/index'),
        meta: { title: '用户列表', icon: 'user2' }
      }
    ]
  },

  // 营销管理
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/flashsale',
    name: 'Marketing',
    meta: { title: '营销管理', icon: 'marketing' },
    children: [
      {
        path: 'flashsale',
        name: 'MarketingFlashsale',
        component: () => import('@/views/marketing/flashsale/index'),
        meta: { title: '限时活动', icon: 'flashsale' }
      },
      {
        path: 'advertlist',
        name: 'MarketingAdvertlist',
        component: () => import('@/views/marketing/advertlist/index'),
        meta: { title: '广告列表', icon: 'advertlist' }
      }
    ]
  },
  // 内容管理
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'content' },
    children: [
      {
        path: 'article',
        name: 'ContentArticle',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'article' }
      },
      {
        path: 'addArticle',
        name: 'ContentAddArticle',
        hidden: true,
        component: () => import('@/views/content/addArticle/index'),
        meta: { title: '新增文章', icon: 'article', activeMenu: "/content/article" }
      },
      {
        path: 'editArticle',
        name: 'ContentEditArticle',
        hidden: true,
        component: () => import('@/views/content/addArticle/index'),
        meta: { title: '修改文章', icon: 'article', activeMenu: "/content/article" }
      },
      {
        path: 'material',
        name: 'ContentMaterial',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'material' }
      }
    ]
  },
  // 个人中心
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/mypage',
    name: 'Mine',
    meta: { title: '个人中心', icon: 'mine' },
    children: [
      {
        path: 'mypage',
        name: 'MineMypage',
        component: () => import('@/views/mine/mypage/index'),
        meta: { title: '个人主页', icon: 'mypage' }
      },
      {
        path: 'myset',
        name: 'MineMyset',
        component: () => import('@/views/mine/myset/index'),
        meta: { title: '个人设置', icon: 'myset' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
