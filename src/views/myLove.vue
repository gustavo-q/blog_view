<template>
  <div id="myLove">
    <el-container  style="width: 60%;margin: auto">
      <el-main style="width: 40%">
          <myLoveList/>
      </el-main>
      <el-aside id="aside" style="width: 25%;margin: 10px 1%">
        <!--          <userNewDiscuss/>-->
        <hotBlog/>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
  import myLoveList from '@/components/myLoveList'
  import hotBlog from '@/components/hotBlog'

  export default {
    name: 'myLove',
    components: {myLoveList,hotBlog}
  }
</script>
<style scoped>
  #myBlog{
    margin: auto 1%;
  }
</style>
