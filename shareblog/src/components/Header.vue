<template>
  <header :class="{login: isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <div class="bg"></div>
      <p class="blog">Blog</p>
      <p class="bgText1">sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
      <p class="bgText2">doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
      <el-button round class="register">注册</el-button>
      <el-button round class="login">登录</el-button>
    </template>

    <template v-else>
      <h1><router-link to="/">Let's share</router-link></h1>
      <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
      <img class="avatar" src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="">   
    </template>
  </header>
</template>

<script>
export default {
  data(){
    return{
      isLogin:true
    }
  }
}
</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header.no-login {
  .login{
    margin-top: -190px;
    margin-left: 533px;
    position: absolute;
  }
  .register{
    margin-top: -190px;
    margin-left: 722px;
    position: absolute;
  }
  .el-button:hover{
    background-color: #8e554a;
    color: #ffffff;
  }
  .blog {
    color: #ffffff;
    font-size: 26px;
    margin-top: -352px;
    margin-left: 644px;
    position: absolute;
  }
  .bg {
    background: url("https://i.loli.net/2018/09/29/5baf722bbafa4.jpg") no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    width: 1340px;
    height: 400px;
    position: relative;
  }
  .bgText1 {
    color: #bbb6bd;
    margin-top: -300px;
    margin-left: 380px;
    position: absolute;
  }
  .bgText2 {
    color: #bbb6bd;
    margin-top: -280px;
    margin-left: 404px;
    position: absolute;
  }
}

header.login {
  display: flex;
  align-items: center;
  background: #585f6f;
  h1 {
    margin: 0;
    padding: 20px;
    padding-left: 64px;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;
    a{
      color: #fff;
      text-decoration: none;
    }
  }
  .edit {
    color: #fff;
    font-size: 30px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-right: 128px;
  }
  i{
    margin-right: 28px;
  }
}
</style>

