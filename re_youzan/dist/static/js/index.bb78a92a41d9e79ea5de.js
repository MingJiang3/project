webpackJsonp([3],{"035s":function(t,a){},"97Sy":function(t,a){},NydE:function(t,a,e){"use strict";var s=e("bOdI"),n=e.n(s),i=e("DNVT"),r=(e("v2ns"),{name:"swiper",props:{lists:{type:Array,required:!0},name:{}},mounted:function(){new i.a(".swiper-container",n()({loop:!0,pagination:".swiper-pagination-switch",effect:"flip",autoplay:!0},"pagination",{el:".swiper-pagination"}))}}),o={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"swiper-container"},[a("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return a("div",{staticClass:"swp-page swiper-slide"},[a("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[a("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])})),this._v(" "),a("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var c=e("VU/8")(r,o,!1,function(t){e("rXnH")},"data-v-4970a4d0",null);a.a=c.exports},TFhR:function(t,a,e){"use strict";var s={hostLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",rank:"/category/rank",subList:"/category/subList",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",carLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMrremove:"/cart/mrremove",cartUpdate:"/cart/update",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var n in s)s.hasOwnProperty(n)&&(s[n]="http://rap2api.taobao.org/app/mock/7058"+s[n]);a.a=s},TVmP:function(t,a,e){"use strict";var s=e("mw3O"),n=e.n(s).a.parse(location.search.substr(1)).index,i=[{name:"首页",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我的",icon:"icon-user",href:"member.html"}],r={data:function(){return{navConfig:i,curIndex:parseInt(n)||0}},methods:{changeNav:function(t,a){location.href=t.href+"?index="+a}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bottom-nav"},[e("ul",t._l(t.navConfig,function(a,s){return e("li",{class:{active:s==t.curIndex},on:{click:function(e){t.changeNav(a,s)}}},[e("a",[e("i",{class:a.icon}),t._v(" "),e("div",[t._v(t._s(a.name))])])])}))])},staticRenderFns:[]};var c=e("VU/8")(r,o,!1,function(t){e("xbbR")},"data-v-4b33b6c7",null);a.a=c.exports},U67u:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("97Sy"),n=(e.n(s),e("bCKv")),i=e.n(n),r=e("035s"),o=(e.n(r),e("eChN")),c=(e.n(o),e("7+uW")),d=e("mtWM"),l=e.n(d),u=e("TFhR"),p=e("TVmP"),f=e("NydE");c.default.use(i.a);new c.default({el:"#app",data:{lists:null,pageName:1,loading:!1,allLoaded:!1,pageSize:6,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.get(u.a.hostLists,{pageName:this.pageName,pageSize:this.pageSize}).then(function(a){var e=a.data.lists;e.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(e):t.lists=e,t.loading=!1,t.pageName++}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(a){t.bannerLists=a.data.lists})}},components:{Foot:p.a,Swiper:f.a}})},eChN:function(t,a){},rXnH:function(t,a){},v2ns:function(t,a){},xbbR:function(t,a){}},["U67u"]);
//# sourceMappingURL=index.bb78a92a41d9e79ea5de.js.map