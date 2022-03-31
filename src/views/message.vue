<template>
  <div id="message" v-loading="loading">

    <div v-if="loading" style="margin: 35% 0"></div>
    <div v-for="message in messageList" style="text-align: left;padding-left: 2%">
      <p style="color:#409EFF" class="el-icon-paperclip">&nbsp;{{message.name}}</p>
      <p style="color: #303133">
        {{message.message}}
      </p>
      <p style="color: #C0C4CC;font-size:12px">
        {{getTime(message.createTime)}}
      </p>

      <el-divider content-position="right">
        <el-link :underline="false" class="el-icon-delete" v-if="getStoreRoles().indexOf(message.name) > -1"
                 @click="deleteMessage(message.id)"/>
      </el-divider>
    </div>


    <div style="padding-bottom: 4%">
      <el-pagination
        :pager-count="5"
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

    <div style="width: 70%;margin-left: 2%;padding-top: 2%" class="hidden-xs-only">
      <el-row>
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入留言内容"
          size="medium"
          style="width: 80%"
          v-model="messageBody">
        </el-input>
        <el-button type="primary" style="width: 15%" size="small" @click="sendMessage">
          留言
        </el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
  import message from '@/api/message'
  import date from '@/utils/date'
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'message',
    data() {
      return {
        total: 0,        //数据总数
        messageList: [],   //当前页数据
        pageSize: 10,    //每页显示数量
        currentPage: 1,   //当前页数
        messageBody: '',
        loading: true //是否加载中
      }
    },
    created() {
      this.loadMessage();

    },
    methods: {
      isLogin() {
        if (this.$store.state.token !== '') {
          return true;
        } else {
          return false;
        }
      },
      loadMessage() {
        message.getMessage(this.currentPage, this.pageSize).then(res => {
          this.total = res.totalCount;
          this.messageList = res.data;
          this.loading = false
        })
      },
      currentChange(currentPage) { //页码更改事件处理
        this.currentPage = currentPage;
        this.loadMessage();
      },
      sendMessage() {
        if (this.messageBody.length <= 0) {
          this.$message({
            type: 'error',
            message: '字段不完整'
          });
          return;
        }
        if (this.isLogin()){
        message.sendMessage(this.messageBody).then(res => {
          this.$message({
            type: 'success',
            message: '留言成功'
          });
          this.messageBody = '';
          this.loadMessage();
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: error.message
          });
        });
        }else {
          this.$message({
            type: 'error',
            message: '请先登录'
          });
        }
      },
      deleteMessage(id) {
        this.$confirm('是否删除此留言?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          message.deleteMessage(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.loadMessage();
          })
        }).catch(() => {
        });
      },
      getStoreRoles() { //获取store中存储的roles
        return this.$store.state.name;
      },
      getTime(time) {//将时间戳转化为几分钟前，几小时前
        return date.timeago(time);
      },
    },
  }
</script>
<style scoped>
  #message {
    width: 40%;
    margin: auto ;
    margin-top: 5px;
    background-color: #ffffff;
  }
</style>
