import 'css/common.css'
import './category.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin'

new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex:0,
        subData:null,
        rankData:null
    },
    methods: {
        getTopList() {
            axios.post(url.topList).then(res => {
                this.topLists = res.data.lists
            }).catch(res => {

            })
        },
        getSubList(index,id){
            this.topIndex = index
            if(index == 0){
                this.getRank()
            }else{
                axios.post(url.subList,{id}).then(res => {
                    this.subData = res.data.data
                })
            }
        },
        getRank(){
            axios.post(url.rank).then(res => {
                this.rankData = res.data.data
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    created() {
        this.getTopList()
        this.getSubList(0)
    },
    mixins:[mixin]
})