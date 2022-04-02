<template>
  <el-card id="hotBlog">
    <!--<hr />-->
    <span style="color:#d9ead1;font-size: 25px;  border-bottom: 3px solid #c5a7a7;padding-bottom: 12px;
    line-height: 0.9;">热门文章</span>


    <div style="margin-top: 35px">
      <p type="info" v-for="blog in hotBlog"  @click="router(blog.id)"
               class="blogCss">
        <el-icon class="el-icon-hot-water"/>
        {{ blog.title }}

        <span class="el-icon-view " style="float: right" >&nbsp;{{blog.views}}</span>

      </p>

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
        path: '/blog/' + id
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

.blogCss {
  margin-top: 10px;
  font-size: 16px;
  color: #32362f;
  line-height: 5px;
}
</style>
