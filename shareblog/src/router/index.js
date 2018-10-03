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

// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       component: Index
//     },
//     {
//       path: '/login',
//       component: Login
//     },
//     {
//       path: '/my',
//       component: My,
//       meta:{ requiresAuth:true }
//     },
//     {
//       path: '/user/:userId',
//       component: User
//     },
//     {
//       path: '/edit/:blogId',
//       component: Edit,
//       meta:{ requiresAuth:true }
//     },
//     {
//       path: '/create',
//       component: Create,
//       meta:{ requiresAuth:true }
//     },
//     {
//       path: '/register',
//       component: Register
//     },
//     {
//       path: '/detail/:blogId',
//       component: Detail
//     }
//   ]
// })
// router.beforeEach((to,from,next) => {
  
// })
// export default router
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
      path: '/detail',
      component: Detail
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
      path: '/user',
      component: User
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
