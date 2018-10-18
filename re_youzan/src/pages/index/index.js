import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'



let app = new Vue({
    el:'#app',      //Vue实例不能挂载body和html
    data:{
        lists:null
    },
    created(){
        axios.get(url.hostLists,{
            pageName:1,
            pageSize:8
        }).then(res => {
            this.lists = res.data.lists
        })
    }
})