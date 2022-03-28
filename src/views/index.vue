<template>
  <div>
    <el-container>
      <el-aside id="aside1" style="width: 20%;margin: 10px 1%  " class="hidden-xs-only">
        <div  >
          <introduction/>
          <newDiscuss/>
        </div>
      </el-aside>

      <el-main style="width: 40%">
        <indexBlogList/>
      </el-main>

      <el-aside id="aside2"style="width: 20%;margin: 10px 1%" class="hidden-xs-only">
        <div>
          <hotBlog/>
          <statisticalBlog/>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
  import introduction from '@/components/introduction'
  import newDiscuss from '@/components/newDiscuss'
  import hotBlog from '@/components/hotBlog'
  import statisticalBlog from '@/components/statisticalBlog'
  import indexBlogList from '@/components/indexBlogList'

  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'index',
    components: {introduction, newDiscuss, hotBlog, statisticalBlog, indexBlogList}
  }
</script>
<style scoped>

</style>
