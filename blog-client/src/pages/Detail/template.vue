<template>
  <div class="detail">
    <section class="user-info">
      <img :src="user.avatar" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="`/user/${user.id}`">{{user.username}}</router-link>发布于{{createdAt | formatDate}}</p>
    </section>
    <section class="article" v-html="markdown"></section>
  </div>
</template>
<script src="./template.js"></script>
<style src="./template.less"></style>
