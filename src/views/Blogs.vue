<template>
  <div class="mcontainer">
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail',params: {blogId: blog.id}}">
              {{blog.title}}
              </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination class="mpage"
          background
          layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change="page"
      />
    </div>
  </div>
</template>

<style scoped>
 .mpage{
   max-width: 50%;
   margin: 0 auto;
   text-align: center;
 }
</style>

<script>
import Header from "../components/Header";

export default {
  name: "Blogs",
  components: {Header},
  data(){
    return{
      blogs: {},
      currentPage: 1,
      total : 0,
      pageSize :5
    }
  },
  methods: {
    page(currentPage){
      this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
        this.blogs=res.data.data.records;
        this.currentPage=res.data.data.current;
        this.total=res.data.data.total;
        this.pageSize=res.data.data.size;
      })
    },
  },
  created(){ //TODO 特别注意:这个不能写在methods里面
    this.page(1);
  }
}
</script>

