<template>
  <el-card id="statisticalBlog">
    <!--<hr/>-->
    <span style="color:#d9ead1;font-size: 25px;  border-bottom: 3px solid #c5a7a7;padding-bottom: 12px;
    line-height: 0.9;">文章归档</span>
    <div style="margin-top: 35px">
      <p style="margin: 10px 0;color:#909399" v-for="count in blogCount" >{{count.year}}年{{count.month}}月&nbsp;&nbsp;{{count.count}}篇</p>
    </div>
    <br/>
  </el-card>
</template>

<script>
  import blog from '@/api/blog'

  export default {
    name: 'statisticalBlog',
    data() {
      return {
        blogCount: []
      }
    },
    created() {
      blog.getStatisticalBlogByMonth().then(responese => {
        this.blogCount = responese.data;
      });
    }
  }
</script>

<style scoped>
  #statisticalBlog {
    /*-moz-box-shadow: 0px 6px 0px #333333;*/
    /*-webkit-box-shadow: 0px 6px 0px #333333;*/
    /*box-shadow: 0px 3px 10px #333333;*/
    text-align: left;

    margin: 20px 0;
  }
</style>
