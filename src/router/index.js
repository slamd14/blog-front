import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Register from '../views/Register'
import EditPersonal from "../views/EditPersonal";

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/editPersonal',
    name: 'EditPersonal',
    component: EditPersonal
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth : true
    }
  },
  {
    path: '/blog/:blogId', //路径  ":blogId"表示blogId为参数
    name: 'BlogDetail',
    component: BlogDetail    //相应页面(组件)
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
