<template>
  <el-card id="hotBlog">
    <!--<hr />-->
    <p style="text-align: center">
      <span style="color:#67C23A" class="el-icon-document">热门文章</span>
    </p>
    <hr />
    <div v-for="blog in hotBlog" >
      <el-link type="info" style="margin: 5px 20px" :underline="true"  @click="router(blog.id)" icon="el-icon-hot-water">
        &nbsp;{{blog.title}}
      </el-link>
    </div>
    <br/>
  </el-card>
</template>

<script>
  import blog from '@/api/blog'

  export default {
    name: 'hotBlog',
    data() {
      return {
        hotBlog: []
      }
    },
    created() {
      blog.getHotBlog().then(responese => {
        this.hotBlog = responese.data;
      });
    },
    methods: {
      router(id) {
        scrollTo(0, 0);
        this.$router.push({ //路由跳转
          path: '/blog/'+id
        })
      }
    }

  }
</script>
<style scoped>
  #hotBlog {
    /*-moz-box-shadow: 0px 6px 0px #333333;*/
    /*-webkit-box-shadow: 0px 6px 0px #333333;*/
    /*box-shadow: 0px 3px 10px #333333;*/
    text-align: left;

    margin: 20px 0;
  }
</style>
