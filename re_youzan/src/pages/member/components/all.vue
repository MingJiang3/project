<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="lists&&lists.length">
       <a class="block-item js-address-item address-item" v-for="list in lists" @click="toEdit(list)"
      :class="{'address-item-default':list.isDefault}" :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div v-else>
      目前没有地址，请添加~
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
            新增地址
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Address from "js/addressService.js";
export default {
  data() {
    return {
      lists: null
    };
  },
  created() {
    Address.list().then(res => {
      this.lists = res.data.lists;
    });
  },
  methods: {
    toEdit(list) {
      // this.$router.push({ path: "/all/form" });  //编程式路由
      this.$router.push({ name: "form",query:{  //命名路由
        type:'edit',
        instence:list
      } });

    }
  }
};
</script>
<style scoped>
@import "./address.css";
@import "./address_base.css";
</style>


