<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <PostList></PostList>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header,PostList
  }
}
</script>

<style>
  .main{
    width: 80%;
    margin: 0px auto;
  }
</style>
