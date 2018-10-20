import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui'
import Foot from 'components/Footer'
import Swiper from 'components/Swiper'



Vue.use(InfiniteScroll);



let app = new Vue({
    el: '#app',      //Vue实例不能挂载body和html
    data: {
        lists: null,
        pageName:1,
        loading:false,
        allLoaded:false,
        pageSize:6,
        bannerLists:null
    },
    created() {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists() {
            if(this.allLoaded){return}//数据加载完毕直接return
            this.loading = true
            axios.get(url.hostLists, {
                pageName: this.pageName,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                if(curLists.length < this.pageSize){//判断所有数据是否加载完毕
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    this.lists = curLists//第一次请求数据
                }
                this.loading = false
                this.pageName++
            })
        },
        getBanner(){
            axios.get(url.banner).then(res=>{
               this.bannerLists = res.data.lists
            })
        }
    },
    components:{
        Foot,
        Swiper
    }
})