<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" width="40px" height="40px">               <!-- 加载动画 -->
    </div>
        <!-- 帖子列表 -->
    <div class="posts" v-else>
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
          <router-link :to="{name:'user_info',params:{name:post.author.loginname}}">
            <img :src="post.author.avatar_url" class="headPortrait">
          </router-link>
                <!-- 回复/浏览数 -->
          <span class="all_count">
            <span class="reply_count">{{post.reply_count}}</span><span class="visit_count">/{{post.visit_count}}</span> 
          </span>
                <!-- 帖子分类 -->
          <span :class="[{put_good:(post.good == true), put_top:(post.top == true), 'topiclist-tab':(post.top != true && post.good != true)}]">
                {{post | tabFormatter}}
          </span>
                <!-- 获取标题 -->
                <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
                  <span>{{post.title}}</span>
                </router-link>          
                <!-- 最终回复时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <!-- 分页 -->
          <pagination @handleList="renserList"></pagination><!-- 为PostList子组件 -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination.vue'
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [], //页面的列表数组
      postpage:1
    };
  },
  components:{
    pagination
  },
  methods: {
    getData() {
      this.$http.get("https://cnodejs.org/api/v1/topics", {
        params:{            //get请求要用params
          page: this.postpage,
          limit: 20
        }
      })
        .then(res => {
          this.isLoading = false; //加载成功去除动画
          this.posts = res.data.data;
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    renserList(value){
      this.postpage = value;
      this.getData();
      alert(value)
    }
  },
  beforeMount() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getData(); //在页面加载之前获取数据
  }
};
</script>

<style scoped>
.headPortrait {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}
.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}
ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}
li:not(:first-child):hover {
  background: #f5f5f5;
}
li:last-child:hover {
  background: white;
}
li span {
  line-height: 30px;
}
.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.all_count{
  display: inline-block;
  width: 64px;
  text-align: center;
}
.visit_count {
  color: #b4b4b4;
  font-size: 10px;
}
.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 15px;
  text-align: center;
}
.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}
.toobar {
  height: 40px;
  background-color: #f5f5f5;
}
.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.toobar span:hover {
  color: #9e78c0;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
}
.loading {
  text-align: center;
  padding-top: 100px;
}
</style>
