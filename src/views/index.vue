<template>
  <div style="background: hsla(0,0%,98%,.8);">
    <el-container>

      <el-header style="width: 60%;height:13%;margin:auto;margin-top: 10px;margin-bottom: 10px">
        <categoryList/>
      </el-header>


      <el-container style="width: 60%;margin:auto">

        <!--      <el-aside id="aside1" style="width: 20%;margin: 10px 1%  " class="hidden-xs-only">-->
        <!--        <div  >-->
        <!--        </div>-->
        <!--      </el-aside>-->

        <el-main style="width: 40%">
          <indexBlogList/>
        </el-main>

        <el-aside id="aside2" style="width: 25%;margin: 10px 1%" class="hidden-xs-only">
          <div>
            <introduction/>
            <hotTags/>
            <hotBlog/>
            <statisticalBlog/>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import introduction from '@/components/introduction'
import newDiscuss from '@/components/newDiscuss'
import hotBlog from '@/components/hotBlog'
import statisticalBlog from '@/components/statisticalBlog'
import indexBlogList from '@/components/indexBlogList'
import categoryList from '@/components/categoryList'
import hotTags from '@/components/hotTags'

import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: 'index',
  components: {hotTags, categoryList, introduction, newDiscuss, hotBlog, statisticalBlog, indexBlogList}
}
</script>
<style scoped>

</style>
