<template>
    <div class="header clearfix">
      <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
      <ul>
        <li><a href="">首页</a></li>
        <li><a href="">入门</a></li>
        <li><a href="">API</a></li>
        <li><a href="">关于</a></li>
        <li><a href="">注册</a></li>
        <li><a href="">登录</a></li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  .header{
    background: #444444;
    height: 50px;
  }
  img{
    max-width: 120px;
    margin-left: 50px;
    margin-top: 10px;
    max-height: 40px;
  }
  ul{
    list-style: none;
    float: right;
    margin-top: 4px;
    margin-bottom: 4px;
    margin-right: 70px;
  }
  li{
    display: inline-block;
    padding: 10px 15px;
  }
  a{
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
  }
</style>
