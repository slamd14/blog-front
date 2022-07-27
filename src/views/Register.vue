<template>
  <h2>Register</h2>
  <el-container>
    <el-header>
      <img class="logo" src="https://ts1.cn.mm.bing.net/th/id/R-C.d892403adeafb879aed875c8089a7a62?rik=wgAM%2bYFvWWGrAw&riu=http%3a%2f%2fpic.22520.cn%2fup%2f200801%2f1596267860100530.jpg&ehk=vjrL0E1rbNjbyixm2ZabkRIaPnHY1iaj9QavHMhF3sU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1">
    </el-header>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button type="danger" @click="back">返回</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<style scoped>
  .logo{
  height: 200%;
  margin-top: -50px;
}

  .demo-ruleForm{
  max-width: fit-content;
  margin: 0 auto;
}
</style>

<script>

import {ElMessage} from "element-plus";

export default {
  name: "Register.vue",
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/register',this.ruleForm).then(res => {
            if(res.data.code==1){
              ElMessage.success("注册成功");
            }else{
              ElMessage.error('注册失败');
              return Promise.reject(res.data.msg);//就不会直接终止了这次响应，不会再把响应继续传递
            }
            this.$router.push("/login");//重定向
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm.username=this.ruleForm.password='';
    },
    back(){
      this.$router.push("/login");//重定向
    }
  }
}
</script>

