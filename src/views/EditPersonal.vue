<template>
  <h2>编辑个人信息:</h2>
  <h2>{{userMes.username}}</h2>

  <el-container>
    <el-header>
      <img class="logo" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp08%2F38041823511047-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661182198&t=a4fb6417216fcd76741e642dea5a65a3">
    </el-header>
    <el-main>
      <el-form :model="userMes" :rules="rules" ref="userMes" label-width="100px" class="demo-ruleForm">
        <el-form-item label="头像链接" prop="avatar">
          <el-input type="avatar" v-model="userMes.avatar"></el-input>
          <el-avatar :size="50" :src="userMes.avatar" />
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="userMes.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="password">
          <el-input type="passwordAgain" v-model="passwordAgain"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱" prop="email">
          <el-input type="email" v-model="userMes.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userMes')">确认</el-button>
          <el-button type="danger" @click="back">返回</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>


<style scoped>

</style>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "EditPersonal.vue",
  data(){
    return {
      passwordAgain : '',
      userMes:{
        id: '',
        username: '',
        email: '',
        avatar: '',
        password: '',
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.userMes.password===this.passwordAgain){
            this.$axios.post("/editPersonalMes",this.userMes,{
              headers: {//后端logout要进行登录认证(@RequiresAuthentication)
                "Authorization" : localStorage.getItem("token") //也可以通过store获取
              }
            }).then(res => {
              this.$store.commit("REMOVE_OnlyINFOINFO");
              this.$store.commit("SET_USERINFO",this.userMes);
              ElMessage.success("编辑成功");
              this.$router.push("/blogs");
            })
          }else{
            ElMessage.error("两次输入密码不一致");
          }
        } else {
          ElMessage.error("编辑失败");
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.userMes.password = '';
      this.userMes.email = '';
    },
    back(){
      this.$router.push("/blogs");//重定向
    }
  },
  created() {
    var jsonUserInfo = sessionStorage.getItem("userInfo");
    var localUserMes = JSON.parse(jsonUserInfo);
    this.userMes={...localUserMes};
    this.userMes.password='';
  },

}
</script>
