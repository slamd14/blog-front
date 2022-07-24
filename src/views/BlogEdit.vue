<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item  label="文章标题" prop="title">
          <el-input  v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="文章概述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>


<style scoped>
 .demo-ruleForm{
   max-width: 600px;
   margin: 0 auto;
 }

 .m-content{
   text-align: center;
 }
</style>

<script>
import Header from "../components/Header";
import {ElMessage} from "element-plus";
export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '文章概述不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章内容不能为空',trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/blogs/edit",this.ruleForm,{
            headers: {
              "Authorization" : localStorage.getItem("token")
            }
          }).then(res => {
            if(res.data.code==1){
              ElMessage.success("提交成功!");
            }else{
              ElMessage.error('提交失败!');
              return Promise.reject(res.data.msg);//就不会直接终止了这次响应，不会再把响应继续传递
            }
            this.$router.push("/blogs");//重定向
          })
        } else {
          console.log('提交失败!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
     const blogId=this.$route.params.blogId;
     if(blogId){
       this.$axios.get('/blogs/'+blogId).then(res => {
         const blog =res.data.data;
         this.ruleForm={...blog};
       })
     }
  }
}
</script>