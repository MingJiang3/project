import Address from 'js/addressService.js'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            type: '',
            instance: '',
            addressData: require('js/address.json'),
            cityList:null,
            districtList:null
        }
    },
    //第一种
    // computed: {
    //   lists(){                                  //三种写法
    //       return this.$store.state.lists
    //   }  
    // },
    //第二种    computed:mapState['lists'],
    //第三种
    computed:{
        ...mapState({
            lists: state => state.lists
        })
    },
    created() { 
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance
        if(this.type === 'edit'){
            let ad = this.instance
            this.provinceValue = parseInt(ad.provinceValue)//相应省的编码
            this.name = ad.name
            this.tel = ad.tel
            this.address = ad.address
            this.id = ad.id
        }
    },
    methods:{
        add(){
            let {name,tel,provinceValue,cityValue,districtValue,address} = this
            let data = {name,tel,provinceValue,cityValue,districtValue,address}
            if(this.type === 'add'){
                // Address.add(data).then(res=>{
                //     this.$router.go(-1) //返回上一页
                // })
                this.$store.dispatch('addAction',data)
            }
            if(this.type === 'edit'){
                data.id = this.id
                // Address.update(data).then(res=>{
                //     this.$router.go(-1) //返回上一页
                // })
                this.$store.dispatch('updateAction',data)
            }
        },
        remove(){
            if(window.confirm('您确认删除吗？')){
                // Address.remove(this.id).then(res=>{
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('removeActions',this.id)
            }
        },
        setDefault(){
            // Address.setDefault(this.id).then(res=>{
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('setDefaultAction',this.id)
        }
    },
    watch: {
        lists:{
            handler(){
                this.$router.go(-1)
            },
            deep:true       //深度监听
        },
        provinceValue(val) {
            if (val === -1) return      //不选不做任何操作
            let list = this.addressData.list
            let index = list.findIndex(item =>{
                return item.value === val
            })
            this.cityList = list[index].children
            this.cityValue = -1     //选择省份后还原市、区
            this.districtValue = -1

            if(this.type === 'edit'){   //监听编辑状态省变化后市的值
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val) {
            if (val === -1) return      //不选不做任何操作
            let list = this.cityList
            let index = list.findIndex(item=>{
                return item.value = val
            })
            this.districtList = list[index].children
            this.districtValue = -1     //选择市后还原区

            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    }
}