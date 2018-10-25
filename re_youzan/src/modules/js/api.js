let url = {
    hostLists:'/index/hotLists',
    banner:'/index/banner',
    topList:'/category/topList',
    rank:'/category/rank',
    subList:'/category/subList',
    searchList:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    addCart:'/cart/add'
}
let host = 'http://rap2api.taobao.org/app/mock/7058'
for(const key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key];
    }
}

export default url