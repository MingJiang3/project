<template>
  <div id="app">
    <Header id="header"></Header>
    <main id="main">
    <!-- <router-view/> -->
    我的页面
    </main>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,Footer
  }
}
</script>


<style lang="less">
#app{
  height: 100vh;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header header header"
                       ".      main  ."
                       "footer footer footer";
  #header {
    grid-area: header;
  }

  #main {
    grid-area: main;
  }

  #footer {
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
  }
}  
</style>
