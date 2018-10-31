import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from 'js/addressService.js'

const store = new Vuex.Store({  //Store要大写
    state: {        //状态,一般不允许修改
        lists:null
    },
    mutations: {
        init(state,lists){  //第一个参数一定是state
            state.lists = lists
        }
    },
    actions: {
        // getLists(){Address.list().then(res => {  第一种写法
        //     store.commit('init', res.data.lists)
        //  })}
        getLists({commit}){
            Address.list().then(res => {
                commit('init', res.data.lists)
            })
        }
    }
})

export default store
