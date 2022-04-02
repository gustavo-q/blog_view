<template>
  <div id="blog">
    <el-link :underline="false" @click="back()"><i class="el-icon-back">Back</i></el-link>
    <!--为了blogId值改变事件会被watch到-->
    <p style="display: none">{{ blogId = this.$route.params.blogId }}</p>

    <div id="title">
      <h2 style="text-align: center">{{ title }}</h2>
    </div>
    <div style="float: left">
      <img :src="avatar" class="avatarImg"/>
    </div>
    <div style="float: left;margin-bottom: 9px">
      <div class=" hidden-xs-only spanText us">&nbsp;{{ userName }}</div>
      <div class="ti">
        <span class="el-icon-time hidden-xs-only spanText">&nbsp;{{ getTime(time) }}</span>

        <span class="el-icon-view hidden-xs-only spanText">&nbsp;{{ blogViews }}</span>

        <span class="el-icon-chat-line-square hidden-xs-only spanText"
        >&nbsp;{{ discussCount }}</span>
        <span v-for="tag in catchTagName(tags)">
              <el-tag type="success" style="margin-left: 5px">{{ tag }}</el-tag>
            </span>
      </div>

    </div>


    <mavon-editor v-model="body" id="editor"
                  :toolbarsFlag="false"
                  :boxShadow="false"
                  :subfield="false"
                  previewBackgroud="#ffffff"
                  defaultOpen="preview">

    </mavon-editor>
    <!-- 以下是预览模式配置 -->
    <!--:toolbarsFlag="false"  :subfield="false" defaultOpen="preview"-->

    <div style="margin: 0 auto;width: 50%" class="hidden-xs-only">
      <br/>
      <el-popover placement="bottom" width="300px" height="250px" trigger="hover">
        <img alt="打赏码" :src="userReward" width="250px" height="250px" v-if="userReward!=='1'&&userReward!=='0'"/>
        <span v-if="userReward==='1'">&nbsp;&nbsp;&nbsp;&nbsp;赞赏码未设置</span>
        <span v-if="userReward==='0'">&nbsp;&nbsp;&nbsp;该文章不支持赞赏</span>
        <el-button type="text" slot="reference" icon="el-icon-trophy" round>写的不错，打赏一个</el-button>
      </el-popover>
      <el-button type="text" :class="[like==0?'el-tyson-good':'el-tyson-good-fill']" @click="likeThis">
        &nbsp;{{ this.like == 0 ? '点赞' : '已赞' }}&nbsp;{{ likeCount }}
      </el-button>
    </div>


    <el-divider/>
    <div id="discuss" class="hidden-xs-only" v-if="$store.state.token!==''">


      <div style="width: 100%;margin-left: 2.5%;padding-top: 2%" v-if="getStoreName()!=='' && commentEnabled!==0">
        <div style="float: left">
          <img :src="$store.state.avatar" class="avatarImg"/>
        </div>
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="discussBody" placeholder="请输入评论内容" style="width: 60%;margin-left: 7%;margin-top: 1%"
                  size="mini"></el-input>
        <el-button type="primary" style="width: 10%" size="mini" @click="sendDiscuss(0)">评论</el-button>

      </div>

      <!-- 评论部分 -->
      <div v-for="discuss in discussList" id="discussList" v-if=" commentEnabled!==0" @mouseenter="pEnter()"
           @mouseleave="pLeave()">
        <div class="dT1">
          <img :src="discuss.avatar" class="discussImg"/>
          <el-button type="text">&nbsp;&nbsp;&nbsp;{{ discuss.userName }}&nbsp;&nbsp;:</el-button>
        </div>

        <span class="spanContent">{{ discuss.content }}</span>
        <div class="dT2">
        <span style="color: #909399;  margin-left: 22%;font-size: 10px"
              class="el-icon-time">{{ getTime(discuss.createTime) }}</span>
        <span type="text" style="margin-left: 5%;font-size: 10px;color: #6b6bde"
              v-if="((discuss.userName===getStoreName()||(getStoreRoles()===1)||getStoreName()===userName)&&discuss.isDelete===0)&&replyFlag"
              @click="deleteDiscuss(discuss.id)">删除
          </span>
        <span type="text" style="margin-left: 1%;font-size: 10px;color: #6b6bde" @click="sendReply(discuss.id)"
              v-if="getStoreName()!=''&&discuss.isDelete===0&&replyFlag">回复
          </span>
        </div>
        <!-- 评论下的回复部分 -->
        <div v-if="!(typeof(discuss.child) == 'undefined') && discuss.child.length>0"
           v-for="reply in discuss.child" style="margin-top: 6px">
          <div class="dT3">
          <span style="margin-left: 7%" class="el-icon-arrow-right"></span>
          <img :src="reply.avatar" class="discussImg"/>
          <el-button type="text">{{ reply.userName }}&nbsp;&nbsp;:</el-button>
          </div>
          <!--            <span v-if="reply.reply !== null">回复:</span>-->
          <!--            <el-button type="text" v-if="!(typeof(reply.reply) == 'undefined') && reply.reply !== null">-->
          <!--              {{ reply.reply.userName }}-->
          <!--            </el-button>-->

          <span class="spanContent2">{{ reply.content }}</span>
          <div class="dT4">
          <span style="color: #909399;margin-left:27%;font-size: 10px"
                class="el-icon-time">{{ getTime(reply.createTime) }}</span>

          <span type="text" style="margin-left: 5%;font-size: 10px;color: #6b6bde"
                v-if="(reply.userName===getStoreName()||(getStoreRoles()===1)||getStoreName()===userName)&&replyFlag"
                @click="deleteDiscuss(reply.id)">删除
          </span>
          </div>
          <!--            <el-button type="text" style="margin-left: 1%" @click="sendReply(discuss.id,reply.id)"-->
          <!--                       v-if="getStoreName()!=''&&replyFlag">回复-->
          <!--            </el-button>-->
        </div>

        <el-divider></el-divider>
      </div>

      <div style="text-align: center;line-height: 10px;size: 16px;margin-top: 10%;color:#982828"
           v-if="commentEnabled===0">
        该文章评论已关闭
      </div>

      <div style="padding-bottom: 4%">
        <el-pagination
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
          :current-page="currentPage"
          @prev-click="currentPage=currentPage-1"
          @next-click="currentPage=currentPage+1"
          :hide-on-single-page="true">
        </el-pagination>
      </div>

    </div>
    <div id="discuss1" class="hidden-xs-only" v-if="$store.state.token===''">
      <span>请先登陆</span>
    </div>

  </div>
</template>
<script>
import blog from '@/api/blog'
import discuss from '@/api/discuss'
import reply from '@/api/reply'
import date from '@/utils/date'
import userLike from '@/api/userLike'

import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: 'blog',
  data() {
    return {
      blogId: -1,//博文id
      title: '',//博文标题
      body: '',//博文内容
      discussCount: 0,//评论数
      blogViews: 0,//浏览数
      time: 0, //发布事件
      userName: '',//博客用户名
      avatar: '',
      tags: [],  //博文标签
      userReward: '',//博主打赏码
      commentEnabled: '',//评论权限
      total: 0,        //数据总数
      discussList: [],   //当前页数据
      pageSize: 5,    //每页显示数量
      currentPage: 1,   //当前页数

      discussBody: '',//评论内容
      replyFlag: false,  // 是否显示回复按钮
      replyBody: '',   //回复内容
      like: 0,   //未点赞：0，点赞：1
      likeCount: 0,  //点赞次数
    }
  },
  watch: {
    blogId() {//在此调用接口
      this.loadBlog();
      var w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if (w < 768) {  //对应xs
        document.getElementById('editor').style.margin = '0% -4.5%';
        document.getElementById('blog').style.margin = '20px 0% 0 0%';
        document.getElementById('blog').style.padding = '0';
      }
    }
  },
  methods: {
    getTime(time) {//将时间戳转化为几分钟前，几小时前的格式
      return date.timeago(time);
    },
    catchTagName(tag) { //从tag对象数组中拿到tag.Name属性
      var tagNames = [];
      for (var i = 0; i < tag.length; i++) {
        tagNames.push(tag[i])
      }
      return tagNames;
    },
    currentChange(currentPage) { //页码更改事件处理
      this.currentPage = currentPage;
      this.loadBlog();
    },
    loadBlog() { //加载数据
      // var cookies = this.$cookies.get('history');
      // var isClick = null;
      //存在此cookies key
      // if (this.$cookies.isKey('history')) {
      //   //此cookies key 对应的 value 中有此 博客id
      //   if (cookies.indexOf(this.blogId) > -1) {
      //     //已点击查看
      //     isClick = true;
      //   } else {
      //     isClick = false;
      //   }
      // } else {
      //   isClick = false;
      // }

      userLike.getBlogLikeCount(this.blogId).then(res => {
        this.likeCount = res.data;
        console.log(this.likeCount)
      });


      //登录判断
      if (this.isLogin()) {
        userLike.isUserLike(this.blogId, this.$store.state.id).then(res => {
          this.like = res.data;
        });

        //评论显示
        discuss.getDiscussByBlogId(this.blogId, this.currentPage, this.pageSize).then(responese => {
          this.total = responese.totalCount;
          this.discussList = responese.data;
        });
      }
      ;

      blog.updateViews(this.blogId);

      blog.getBlogById(this.blogId).then(res => {
          this.title = res.data.title;
          this.body = res.data.content;
          this.discussCount = res.data.discussCount;
          this.blogViews = res.data.blogViews;
          this.time = res.data.time;
          this.userName = res.data.userName;
          this.tags = res.data.tags;
          this.userReward = res.data.userReward;
          this.commentEnabled = res.data.commentEnabled;
          this.avatar = res.data.avatar;

          //设置cookies
          // 是否存在history此key
          // if (this.$cookies.isKey('history')) {
          //   var cookies = this.$cookies.get('history');
          //
          //   //不包含此博客的id  追加id
          //   if (cookies.indexOf(this.blogId) <= -1) {
          //     cookies = cookies + ',' + res.data.id;
          //     this.$cookies.set('history', cookies);
          //   }
          //
          // } else {
          //   var cookies = res.data.id;
          //   this.$cookies.set('history', cookies);
          // }
        }
      );


    },


    getStoreName() { //获取store中存储的name
      return this.$store.state.name;
    },
    getStoreId() { //获取store中存储的name
      return this.$store.state.id;
    }
    ,
    getStoreRoles() { //获取store中存储的roles
      return this.$store.state.roles;
    }
    ,
    pEnter() {
      this.replyFlag = true
    }
    ,
    pLeave() {
      this.replyFlag = false
    }
    ,
    sendReply(discussId) {  //发送回复
      this.$prompt('请输入回复内容', '提示', {
        confirmButtonText: '回复',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value == null || value.length <= 0) {
          this.$message({
            type: 'error',
            message: '字段不完整'
          });
          return;
        }
        discuss.sendDiscuss(this.blogId, value, discussId).then(res => {
          this.$message({
            type: 'success',
            message: '回复成功'
          });
          this.loadBlog();
        })
      }).catch(() => {
      });
    }
    ,
    sendDiscuss(num) {  //发送评论
      if (this.discussBody.length <= 0) {
        this.$message({
          type: 'error',
          message: '字段不完整'
        });
        return;
      }

      discuss.sendDiscuss(this.blogId, this.discussBody, num).then(res => {
        this.$message({
          type: 'success',
          message: '评论成功'
        });
        this.discussBody = ''
        this.loadBlog();
      })
    }
    ,
    deleteDiscuss(discussId) {  //删除评论  判断是用户还是管理员 走不一样的api
      this.$confirm('是否删除此评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // if (this.$store.state.roles.indexOf('ADMIN') > -1) {
        //   //管理员
        //   discuss.adminDeleteDiscuss(discussId).then(res => {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功'
        //     });
        //     this.loadBlog();
        //   })
        // } else {
        //普通用户
        discuss.userDeleteDiscuss(discussId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.loadBlog();
        })
        // }


      }).catch(() => {
        this.$message({
          type: 'error',
          message: '删除失败'
        });
      });
    }
    ,
    // deleteReply(replyId) {  //删除回复  判断是用户还是管理员 走不一样的api
    //   this.$confirm('是否删除此回复?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     // if (this.$store.state.roles.indexOf('ADMIN') > -1) {
    //     //   //管理员
    //     //   discuss.adminDeleteReply(replyId).then(res => {
    //     //     this.$message({
    //     //       type: 'success',
    //     //       message: '删除成功'
    //     //     });
    //     //   })
    //     // } else {
    //       //普通用户
    //       discuss.userDeleteReply(replyId).then(res => {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功'
    //         });
    //       })
    //     // }
    //     this.loadBlog();
    //   }).catch(() => {
    //     this.$message({
    //       type: 'error',
    //       message: '删除失败'
    //     });
    //   });
    // }
    // ,
    back() {
      history.back()
    },
    isLogin() {
      if (this.$store.state.token !== '') {
        return true;
      } else {
        return false;
      }
    },
    likeThis() {
      if (this.isLogin()) {
        userLike.saveUserLike(this.blogId, this.like == 0 ? 1 : 0).then(res => {
          this.like = this.like == 0 ? 1 : 0;
          userLike.getBlogLikeCount(this.blogId).then(res => {
            this.likeCount = res.data;
          });
        });
      } else {
        this.$message.error("请先登录")
      }

    }
  }
}
</script>
<style scoped>
#blog {
  margin: auto;
  padding: 20px;
  text-align: left;
  width: 40%;
  background-color: #fff;
}

#editor {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

#discuss {
  margin: 15px 5% 0 5%;
}

#discussList {
  text-align: left;
  padding: 5% 1% 1% 3%;
  width: 100%;
}

/*第三方icon，点赞&取消点赞*/
[class^="el-tyson-good"], [class*="el-tyson-good"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^="el-tyson-good-fill"], [class*="el-tyson-good-fill"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.spanText {

  line-height: 24px;
  font-size: 12px;
  margin-top: 15px;
}

.avatarImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  vertical-align: middle;
  padding-left: 7px;
  padding-right: -5px;
}

.discussImg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  padding-right: -5px;
  padding-top: 5px;
}

.spanContent {
  padding-top: 10px;
  margin-left: 15px;
  max-width: 75%;
  display: inline-block;
  overflow-wrap: break-word; /*  css3属性，当内容超过指定容器的边界时是否断行  */
  text-align: left;
}

.spanContent2{
  padding-top: 10px;
  margin-left: 15px;
  max-width: 66%;
  display: inline-block;
  overflow-wrap: break-word; /*  css3属性，当内容超过指定容器的边界时是否断行  */
  text-align: left;
}

.dT1{
  width: 20%;
  float: left;
}
.dT2{
  padding-top: 13px;
}


.dT3{
  width: 20%;
  float: left;
  margin-left: 7%;
}

.dT4{
  padding-top: 13px;
  margin-left: 15px;
  width: 100%;
}

.us {
  margin: 12px 0px 0px 15px;
  font-size: 17px;
}

.ti {
  margin: -12px 0px 7px 15px;
}

</style>
