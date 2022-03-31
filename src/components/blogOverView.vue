<template>
  <div id="blogOverView">

<!--    <div style="position: absolute;right: 25%;width: 10%" @mouseenter="pEnter()" @mouseleave="pLeave()">-->
<!--      <span style="width: 5%" v-if="show&&(getStoreName()==name)" @click="editBlog(id)" title="编辑">-->
<!--          <el-link class="el-icon-edit-outline" :underline="false"></el-link>-->
<!--        </span>-->
<!--      <span style="width: 5%;margin-left: 1%;"-->
<!--            v-if="show&&(getStoreName()==name||getStoreRoles().indexOf('ADMIN')>-1)"-->
<!--            title="删除" @click="deleteBlog(id)">-->
<!--          <el-link class="el-icon-delete" :underline="false"></el-link>-->
<!--        </span>-->
<!--    </div>-->

    <div @mouseenter="pEnter()" @mouseleave="pLeave()">
      <el-link :underline="false" @click="router(id)">
        <h3 id="title">{{title}}</h3>
      </el-link>
    </div>
    <div id="body" @mouseenter="pEnter()" @mouseleave="pLeave()" >
      {{bodyTran(body)}}
    </div>
    <div @mouseenter="pEnter()" @mouseleave="pLeave()" style="color: #999;">
      <span class=" hidden-xs-only spanText">作者:&nbsp;{{name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span class="el-icon-view hidden-xs-only spanText" >&nbsp;{{blogViews}}</span>

        <span class="el-icon-chat-line-square hidden-xs-only spanText" >&nbsp;{{discussCount}}&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <span>
          <span v-for="tag in tags">
            <el-tag size="small" class="spanText" type="success" style="margin-left: 5px ">{{tag}}</el-tag>
          </span>
        </span>

    </div>
    <el-divider ></el-divider>
  </div>
</template>
<script>

  import blog from '@/api/blog'
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'blogOverView',
    props: ['id', 'title', 'body', 'time', 'blogViews', 'discussCount', 'tags', 'name'],
    data() {
      return {
        show: false
      }
    },
    methods: {
      router(roleId) {
        scrollTo(0, 0);
        this.$router.push({ //路由跳转
          path: '/blog/'+roleId
        });
      },
      pEnter() {
        this.show = true;
      },
      pLeave() {
        this.show = false;
      },
      getStoreName() { //获取store中存储的name
        return this.$store.state.name;
      },
      getStoreRoles() { //获取store中存储的roles
        return this.$store.state.roles;
      },
      deleteBlog(id) {

        this.$confirm('是否删除此博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$store.state.roles==='1') {
            //管理员
            blog.adminDeleteBlog(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              window.location.reload()
            })
          } else {
            //普通用户
            blog.userDeleteBlog(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              window.location.reload()
            })
          }
        }).catch(() => {
        });

      },
      bodyTran(body) { //将数据库中带标签的博文转换为纯文本

        var dd = body.replace(new RegExp('#', 'g'), "");
        dd = dd.replace(new RegExp('!\\[.*\\]\\(.*\\)', 'g'), "[图片]");
        dd = dd.replace(new RegExp('\\[.*\\]\\(.*\\)', 'g'), "[链接]");
        dd = dd.replace(new RegExp('-', 'g'), "");
        dd = dd.replace(new RegExp('>', 'g'), "");
        dd = dd.replace(new RegExp('`', 'g'), "");
        return dd;
      },
      editBlog(id) {
        this.$router.push({ //路由跳转
          path: '/editBlog/' + id
        })
      }

    }
  }
</script>
<style scoped>
  #blogOverView {
    text-align: left;
    padding-bottom: 0px;
  }

  #title {
    margin: -10px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;

  }

  #title:hover {
    color: #409EFF;
    transition: all 0.2s linear;
  }

  #body {
    margin: 5px;
    overflow: hidden ;
    display: -webkit-box ;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical ;
    word-break: break-all ;
    font-size: 16px;
    line-height: 24px;
    color: #999;
  }

  a {
    text-decoration: none;
  }

  .spanText{
    line-height: 24px;
    font-size: 12px;
    margin-top: 15px;
  }

  .el-divider--horizontal{
   margin: 10px 0;
  }
</style>
