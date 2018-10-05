import marked from 'marked'
import blog from '@/api/blog'

export default{
  data(){
    return{
      title:'',
      rwaContent:'',
      user:{},
      createdAt:''
    }
  },
  created(){
    this.blogId = this.$route.params.blogId
    console.log('1111111111')
    blog.getDetail({blogId: this.blogId}).then( res => {
      console.log('222222222')
      console.log(res)
      this.title = res.data.title
      this.rwaContent = res.data.content
      this.user = res.data.user
      this.createdAt = res.data.createdAt
    })
  },
  computed:{
    markdown(){
      console.log('33333333')

      return marked(this.rwaContent)
    }
  }
}
