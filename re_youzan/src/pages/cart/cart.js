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
        allSelected:{
            get(){
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop=>{
                        return shop.checked
                    })
                }
            },
            set(newVal){

            }
        }
    },
    created(){
        this.getLists()
    },
    methods:{
        getLists(){
            axios.post(url.carLists).then(res=>{
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                    })
                })
                this.lists = lists
            })
        },
        selectGood(shop,good){
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good=>{
                return good.checked
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked
        }
    },
    mixins:[mixin]
})