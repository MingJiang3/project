<template>
  <div id="index">
    <section class="blog-posts">
      <!-- <router-link v-for="blog in blogs" :to="`/user/${blog.id}`">> -->
      <router-link class="item" v-for="blog in blogs" :to="`/detail/${blog.id}`">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
      <!-- </router-link> -->
        <h3>{{blog.title}}<span>{{blog.createdAt | formatDate}}</span></h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="onPageChange">
      </el-pagination>
    </section>
  </div>
</template>

<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>
