<template>
  <div id="myBlog">
    <el-container  style="width: 60%;margin: auto">
      <el-main style="width: 40%">
          <myBlogList/>
      </el-main>
      <el-aside id="aside" style="width: 25%;margin: 10px 1%">
<!--          <userNewDiscuss/>-->
          <myTag/>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
  import myBlogList from '@/components/myBlogList'
  import userNewDiscuss from '@/components/userNewDiscuss'
  import myTag from '@/components/myTag'

  export default {
    name: 'myBlog',
    components: {myBlogList,userNewDiscuss,myTag}
  }
</script>
<style scoped>
  #myBlog{
    margin: auto 1%;
  }
</style>
