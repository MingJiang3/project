<template>
    <div class="pagination">
        <button @click="changeBtn()">首页</button>
        <button @click="changeBtn()">上一页</button>
        <button v-if="jduge" class="pagebtn">......</button>
        <button v-for="btn in pagebtns" @click="changeBtn(btn)" :class="[{currentPage:btn == currentPage},'pagebtn']">
            {{btn}}
        </button>
        <button @click="changeBtn()">下一页</button>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "Pagination",
        data(){
            return{
                pagebtns:[1,2,3,4,5,'......'],
                currentPage:1,
                jduge:false
            }
        },
        methods:{
            changeBtn(page){
                if(typeof page != 'number'){
                    switch (page.target.innerText) {
                        case '上一页':$('button.currentPage').prev().click();
                            break;
                        case '下一页':$('button.currentPage').next().click();
                            break;
                        case '首页':this.pagebtns = [1,2,3,4,5,'......'];
                        this.changeBtn(1)
                            break;
                        default:
                            break;
                    }
                    return;
                }

                this.currentPage = page;
                if (page > 4) {
                    this.jduge = true
                }else{
                    this.jduge = false
                }
                if (page == this.pagebtns[4]) {
                    this.pagebtns.shift();   //移除第一个页码
                    this.pagebtns.splice(4,0,this.pagebtns[3]+1)     //添加下一页码
                }else if(page == this.pagebtns[0] && page !=1){
                    this.pagebtns.unshift(this.pagebtn[0]-1)         //在第一位置加前一页码
                    this.pagebtns.splice(5,1)
                }
                this.$emit('handleList',this.currentPage)
            }
        }
    }
</script>

<style scoped>

</style>
