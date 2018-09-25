<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="" alt="">               <!-- 加载动画，还未选取 -->
    </div>
        <!-- 帖子列表 -->
    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="post in posts">
                <!-- 动态绑定获取头像 -->
          <img :src="post.author.avatar_url" alt="">
                <!-- 回复/浏览数 -->
          <span>
            <span class="reply_count">{{post.reply_count}}</span>/{{post.visit_count}}
          </span>
                <!-- 帖子分类 -->
          <span :class="[{put_good:(post.good == true), put_top:(post.top == true), 'topiclist-tab':(post.top != true && post.good != true)}]">
                {{post | tabFormatter}}
          </span>
                <!-- 获取标题 -->
          <span>{{post.title}}</span>
                <!-- 最终回复时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList",
    data(){
      return{
        isLoading: false ,
        posts:[]                             //页面的列表数组
      }
    },
    methods:{
      getData(){
        this.$http.get('https://cnodejs.org/api/v1/topics',{
          page:1,
          limit:20
        })
          .then(res=>{
            this.isLoading = false      //加载成功去除动画
             console.log(res)
          })
          .catch(function(err){
            console.log(err)
          })

      }
    },
      beforeMount(){
        this.isLoading = true       //加载成功之前显示加载动画
        this.getData()                  //在页面加载之前获取数据
      }
  }
</script>

<style scoped>
    img{
        width: 30px;
        height: 30px;
    }
</style>
