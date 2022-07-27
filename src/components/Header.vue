<template>
  <div class="m-content">
    <h3>欢迎来到slamd14的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar" />
      <div v-show="!hasLogin">未登录</div>
      <div v-show="hasLogin">{{user.username}}</div>
      <el-button type="info" v-show="hasLogin" @click="editPersonal">编辑个人信息</el-button>
    </div>

    <div class="maction">
      <span><el-link type="success" href="/blogs">主页</el-link></span>
      <el-divider direction="vertical" />
      <span><el-link type="primary" href="/blog/add">发表文章</el-link></span>
      <el-divider v-show="!hasLogin" direction="vertical" border-style="dashed" />
      <span v-show="!hasLogin"><el-link type="info" href="/login">登录</el-link></span>
      <el-divider direction="vertical" border-style="dashed" />
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>
  </div>
</template>


<style scoped>
  .m-content{
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }

  .maction{
    margin: 10px;
  }
</style>

<script>
export default {
  name: "Header.vue",
  data(){
    return {
      user:{
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      },
      hasLogin: false
    }
  },
  methods:{
    logout() {
      this.$axios.get("/logout",{
        headers: {//后端logout要进行登录认证(@RequiresAuthentication)
          "Authorization" : localStorage.getItem("token") //也可以通过store获取
        }
      }).then(res => {
        this.$store.commit("REMOVE_INFO");
        this.$router.push("/login");
      })
    },
    editPersonal(){
      this.$router.push("/editPersonal");
    }
  },
  created() {
    if(this.$store.getters.GET_USERINFO.username){
      this.user.username=this.$store.getters.GET_USERINFO.username;
      this.user.avatar=this.$store.getters.GET_USERINFO.avatar;
      this.hasLogin=true;
    }else{

    }
  }
}
</script>