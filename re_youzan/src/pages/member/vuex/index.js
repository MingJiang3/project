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
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let lists = state.lists
            let index = lists.findIndex(item=>{
                return item.id == id
            })
            lists.splice(index,1)
        },
        update(state,instance){
            let lists = JSON.parse(JSON.stringify(state.lists)) //深复制处理，才能监听到
            let index = lists.findIndex(item=>{
                return item.id == instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state,id){
            let lists = state.lists
            lists.forEach(item=>{
                item.isDefault = item.id == id? true:false
            })
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
        },
        addAction({commit},instance){
            Address.add(instance).then(res=>{
                //模拟添加id，最好instance是后台返回,因为模拟id为随机数，选择省市区地址不会显示
                instance.id = parseInt(Math.random()*10000)
                commit('add',instance)
            })
        },
        removeActions({commit},id){
            Address.remove(id).then(res=>{
                commit('remove',id)
            })
        },
        updateAction({commit},instance){
            Address.update(instance).then(res=>{
                commit('update',instance)
            })
        },
        setDefaultAction({commit},id){
            Address.setDefault(id).then(res=>{
                commit('setDefault',id)
            })
        }
    }
})

export default store
