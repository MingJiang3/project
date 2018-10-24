import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin'
import qs from 'qs'
import Swiper from 'components/Swiper.vue'


let { id } = qs.parse(location.search.substr(1))
let detailTab = ['商品详情', '本店成交']
new Vue({
    el: '#app',
    data: {
        details: null,
        detailTab,
        tabIndex: 0,
        dealList: null,
        bannerLists:null
    },
    created() {
        this.getDetails()
    },
    methods: {
        getDetails() {
            axios.post(url.details, { id }).then(res => {
                this.details = res.data.data
                console.log(res.data.data)
                this.bannerLists = []
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        clickUrl:'',
                        img:item
                    })
                });
            })
        },
        changeTab(index) {
            this.tabIndex = index
            if (index) {
                this.getDeal()
            }
        },
        getDeal() {
            axios.post(url.deal, { id }).then(res => {
                this.dealList = res.data.data.lists
            })
        }
    },
    components:{Swiper},
    mixins: [mixin]
})