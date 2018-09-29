import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/template'
import My from '../pages/My/template'
import Edit from '../pages/Edit/template'
import Create from '../pages/Create/template'
import Detail from '../pages/Detail/template'
import Login from '../pages/Login/template'
import User from '../pages/User/template'
import Register from '../pages/Register/template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/uer',
      component: User
    },
    {
      path: '/edit',
      component: Edit
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})
