import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'
import Velocity from 'velocity-animate'

new Vue({
    el: '.container',
    data: {
        lists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopout: false,
        removeData: null,
        removeMsg:'',
    },
    computed: {
        allSelected: {
            get() {
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
            },
            set(newVal) {
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if (this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }
                return false
            }
        },
        selectLists() {
            let arr = []
            let total = 0
            if (this.lists && this, this.lists.length) {
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            axios.post(url.carLists).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = false
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = false
                        good.removeChecked = false
                    })
                })
                this.lists = lists
            })
        },
        selectGood(shop, good) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => { //一个店铺中的商品全选时，店铺就选中
                return good[attr]
            })
        },
        selectShop(shop) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {  //店铺选中商品就全选
                good[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1

        },
        reduce(good) {
            axios.post(url.cartReduce, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number--
            })
        },
        add(good) {
            axios.post(url.addCart, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number++
            })
        },
        remove(shop, shopIndex, good, goodIndex) {
            this.removePopout = true
            this.removeData = { shop, shopIndex, good, goodIndex }
            this.removeMsg = '确定要删除该商品吗？'
        },
        removeList(){
            this.removePopout = true
            this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除吗？`
        },
        removeConfirm() {
            if (this.removeMsg === '确定要删除该商品吗？') {
                let { shop, shopIndex, good, goodIndex } = this.removeData
                axios.post(url.cartRemove, {
                    id: good.id
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if (!shop.goodsList.length) {
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopout = false
                })
            }else{
                let ids = []
                this.removeLists.forEach(good=>{
                    ids.push(good.id)
                })
                axios.post(url.cartMrremove,{ids}).then(res=>{
                    let arr = []
                    this.editingShop.goodsList.forEach(good=>{
                        let index = this.removeLists.findIndex(iteme=>{
                            return item.id == good.id
                        })
                        if(index === -1){
                            arr.push(good)
                        }
                    })
                    if(arr.length){
                        this.editingShop.goodsList = arr
                    }else{
                        this.lists.splice(this.editingShopIndex,1)
                        this.removeShop()
                    }
                    this.removePopout = false
                })
            }
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        star(e,good){
            good.starX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex){
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if(good.starX - endX > 100){left = '-60px'}
            if(endX - good.starX > 100){left = '0px'}
            Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{    //Velocity动画
                left
            })
            
        }
    },
    mixins: [mixin]
    })