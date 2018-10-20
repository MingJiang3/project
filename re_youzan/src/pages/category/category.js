import 'css/common.css'
import './category.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import Foot from 'components/Footer'


new Vue({
    el: '#app',
    data: {
        topLists: null
    },
    methods: {
        getTopList() {
            axios.post(url.topList).then(res => {
                this.topLists = res.data.lists
            }).catch(res => {

            })
        },
        getSubList(id){

        }
    },
    created() {
        this.getTopList()
    },
    components: {
        Foot
    }
})