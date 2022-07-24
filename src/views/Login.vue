<template>
  <div>
    <h2>login</h2>
    <br>
  </div>

  <el-container>
    <el-header>
      <img class="logo" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp08%2F38041823511047-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661182198&t=a4fb6417216fcd76741e642dea5a65a3">
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
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<style>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

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
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'markerhub',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
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
          this.$axios.post('http://localhost:8081/login',this.ruleForm).then(res => {
            // console.log("res.data: "+res.data);
            // console.log("res.header: "+res.headers)
            if(res.data.code==1){
              alert("登录成功!");
            }else{
              alert("登陆失败");
            }
            const jwt=res.headers['authorization'];
            const userInfo=res.data.data;
            //把数据共享给其他请求(数据存在客户端浏览器本地)
            this.$store.commit("SET_TOKEN",jwt);
            this.$store.commit("SET_USERINFO",userInfo);
            this.$router.push("/blogs");
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

