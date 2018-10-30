import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
    routes: [{
        path: '/',
        components: require('./components/member.vue')
    }, {
        path: '/all',
        components: require('./components/all.vue'),
        children: [{    //嵌套路由
            path: 'form',
            name: 'form',
            components: require('./components/form.vue')
        }]
    }]
})

// 根组件的注入
new Vue({
    el: '#app',
    router
})