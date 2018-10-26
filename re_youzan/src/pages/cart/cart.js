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
                this.lists.forEach(shop=>{
                    shop.checked = newVal
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal
                    })
                })
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
                console.log(res.data.cartList)
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
            shop.checked = shop.goodsList.every(good=>{ //一个店铺中的商品全选时，店铺就选中
                return good.checked
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good=>{  //店铺选中商品就全选
                good.checked = shop.checked
            })
        },
        selectAll(){
            this.allSelected = !this.allSelected
        }
    },
    mixins:[mixin]
})