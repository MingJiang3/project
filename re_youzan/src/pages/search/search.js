import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'
import qs from 'qs'
let {keyword,id} = qs.parse(location.search.substr(1))   //把问号截掉
import Velocity from 'velocity-animate'

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        isShow:false
    },
    created(){
        this.getSeasrchList()
    },
    methods:{
        getSeasrchList(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
                this.searchList = res.data.lists
            })
        },
        move(){
            if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200){
               this.isShow = true
            }else{
                this.isShow = false
            }
        },
        toTop(){
            Velocity(document.body,'scroll',{duration:800})
        }
    },
    mixins:[mixin]
})