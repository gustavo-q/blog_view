<template>
  <div id="indexBlogList" v-loading="loading">
    <p style="display: none">{{ tagId = this.$route.params.tagId }}</p>
      <blogOverView v-for="blog in blogList" :key="blog.id" :id="blog.id" :title="blog.title"
                    :body="blog.content" :time="getTime(blog.time)" :tags="blog.tags"
                    :blogViews="blog.blogViews"  :name="blog.userName" :discussCount="blog.discussCount"
                 />
    <p style="display: none">{{ categoryId = this.$route.params.categoryId }}</p>
    <div v-if="loading" style="margin: 35% 0">

    </div>


    <div>
      <el-pagination
        :pager-count="5"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        :current-page="currentPage"
        @prev-click="currentPage=currentPage-1"
        @next-click="currentPage=currentPage+1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import blogOverView from '@/components/blogOverView'
  import blog from '@/api/blog'
  import site from '@/api/site'
  import date from '@/utils/date'

  export default {
    name: 'indexBlogList',
    components: {blogOverView},
    data() {
      return {
        total: 0,        //数据总数
        blogList: [],   //当前页数据
        pageSize: 10,    //每页显示数量
        currentPage: 1,   //当前页数
        loading: true,
        categoryId:0,
        tagId:0
      }
    },
    created() {
      this.visitor();
    },
    watch: {
      categoryId() {//在此调用接口
        this.loadBlog();
        console.log(this.categoryId)
        console.log("watch")
      },
      tagId() {//在此调用接口
        this.loadBlog();
        console.log(this.categoryId)
        console.log("watch")
      },

    },
    methods: {
      getTime(time) {//将时间戳转化为几分钟前，几小时前
        return date.timeago(time);
      },
      catchTagName(tag) { //从tag对象数组中拿到tag.Name属性

        var tagNames = [];
        for (var i = 0; i < tag.length; i++) {
          tagNames.push(tag[i].name)
        }
        return tagNames;
      },
      currentChange(currentPage) { //页码更改事件处理
        this.currentPage = currentPage;
        this.loadBlog();
        scrollTo(0, 0);
      },
      loadBlog() { //加载数据
        this.blogList=[]
        console.log(this.categoryId)
        console.log(this.tagId)
        if (this.categoryId===undefined && this.tagId===undefined){
          blog.getBlogHome(this.currentPage, this.pageSize).then(responese => {
            this.total = responese.totalCount;
            this.blogList = responese.data;

            this.loading = false;
          });
        }else {
          if (this.categoryId!==undefined){
            console.log(this.categoryId)
          blog.homeByCategory(this.currentPage, this.pageSize,this.categoryId).then(responese => {
            this.total = responese.totalCount;
            this.blogList = responese.data;

            this.loading = false;
          });
          }
          if (this.tagId!==undefined){
            console.log(this.tagId)
            blog.hotTags(this.currentPage, this.pageSize,this.tagId).then(responese => {
              this.total = responese.totalCount;
              this.blogList = responese.data;

              this.loading = false;
            });
          }
        }


      },
      visitor() {
        site.visitor().then(responese => {
          if (responese.code===200){
            console.log("成功")
          }
        });
      }
    }
  }
</script>
<style scoped>
  #indexBlogList {
    text-align: center;
  }
</style>
