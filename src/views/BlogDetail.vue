<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title}}</h2>
      <el-button v-show="isLogin" type="info" round>
        <router-link :to="{name: 'BlogEdit',params: {blogId: blog.id}}">
          编辑
        </router-link>
      </el-button>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>


<style scoped>
  .mblog{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
</style>

<script>
import Header from "../components/Header";
import "github-markdown-css/github-markdown.css"
export default {
  name: "BlogDetail",
  components: {Header},
  data(){
    return {
      isLogin : false,
      blog: {
        id: '',
        userId: '',
        title: 'default',
        description: 'default',
        content: 'default'
      }
    }
  },
  created() {
    const blogId=this.$route.params.blogId;
    if(blogId){
      this.$axios.get('/blogs/'+blogId).then(res => {
        const blog =res.data.data;
        this.blog.id=blog.id;
        this.blog.userId=blog.userId;
        this.blog.title=blog.title;
        this.blog.description=blog.description;
        var MarkdownIt=require("markdown-it");
        var md= new MarkdownIt();
        var result=md.render(blog.content)//渲染
        this.blog.content=result;//由于是用markdown编辑，所以内容显示出来的时候需要进行渲染

        this.isLogin=(this.blog.userId==JSON.parse(sessionStorage.getItem("userInfo")).id);//从this.$store.GET_USERINFO.id根本拿不到id

      })
    }
  }
}
</script>