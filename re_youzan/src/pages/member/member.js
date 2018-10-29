import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router =  new Router({
    routes:[{
        path:'/',
        components:require('./components/member.vue')
    },{
        path:'/address',
        components:require('./components/address.vue'),
        children:[{     //嵌套路由
        //     path:'',
        //     redirect:'all'      //重定向
        // },{     
            path:'/all',
            components:require('./components/all.vue')
        // },{
        //     path:'/form',
        //     components:require('./components/form.vue')
        }]
    }]
})

// 根组件的注入
new Vue({
    el:'#app',
    router
})