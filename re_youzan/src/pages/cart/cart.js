import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import mixin from 'js/mixin.js';
import axios from 'axios'
import url from 'js/api.js'

new Vue({
    el:'.container',
    data:{
        lists:null,

    },
    computed:{

    },
    created(){
        this.getLists()
    },
    methods:{
        getLists(){
            axios.post(url.carLists).then(res=>{
                this.lists = res.data.cartList
            })
        }
    },
    mixins:[mixin]
})