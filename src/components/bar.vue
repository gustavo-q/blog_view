<template>
  <div style="max-height: 340px">
    <el-row>
      <el-menu :default-active="activeIndex" class="el-menu-demo" :router="true" mode="horizontal"
               @select="handleSelect">
        <el-menu-item class="logoLink"><img src="../assets/rabbit.png"></el-menu-item>
        <el-menu-item index="1" route="/" style="margin-left: 4%" class="el-icon-discover">首页</el-menu-item>
        <el-menu-item index="3" style="margin-left: 1%" route="/message" class="el-icon-message">留言板</el-menu-item>
        <el-menu-item index="5" style="margin-left: 1%" route="/announcement" class="el-icon-s-management">本站公告
        </el-menu-item>
        <el-menu-item index="6" style="margin-left: 1%" route="/about" class="el-icon-help">关于本站</el-menu-item>


        <!--          <el-menu-item id="space" index="" @click="egg" class="hidden-xs-only"/>-->
        <!--<el-menu-item/>-->


        <div style="width: 12%;float: left;margin: 10px 2% 0px 2%;" class="hidden-xs-only">
          <el-input placeholder="搜索博客" v-model="searchTxt" suffix-icon="el-icon-search"
                    @keyup.enter.native="searchSubmit" @click="searchSubmit"/>

        </div>
        <el-menu-item class="hidden-xs-only" v-if="this.$store.state.token===''" index=""
                      @click="loginFormVisible = true">
          <el-button type="text">登录</el-button>
        </el-menu-item>

        <el-menu-item class="hidden-xs-only" v-if="this.$store.state.token===''" index=""
                      @click="registerFormVisible = true">
          <el-button type="text">注册</el-button>
        </el-menu-item>

        <div style="float: left;margin: 10px 0% 0px 5%;" class="hidden-xs-only" v-if="this.$store.state.token!==''">
          <img :src="getAvatar" id="avatarImg"/>
        </div>
        <el-submenu class="hidden-xs-only" index="4" v-if="this.$store.state.token!==''" :router="true">
          <template slot="title"><span v-text="getName">[&nbsp;&nbsp;{{ a }}&nbsp;&nbsp;]</span></template>

          <el-menu-item route="/myBlog" index="4-3">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-s-home" style="color: #b797d9"></i>
            我的博客
          </el-menu-item>
          <el-menu-item route="/myLove" index="4-4">&nbsp;&nbsp;&nbsp;
            <img src="../assets/icon/love.png" id="iconImg"/>
            &nbsp;&nbsp;你的喜欢
          </el-menu-item>
          <el-menu-item>&nbsp;&nbsp;&nbsp;
            <i class="el-icon-loading"></i>
            <a href="http://180.163.101.78:8004/" target="_blank" style="text-decoration:none;color:#5b5e5b">管理后台</a>
          </el-menu-item>
          <el-menu-item @click="logout">&nbsp;&nbsp;&nbsp;
            <i class="el-icon-switch-button" style="color: dodgerblue"/>退出登录
          </el-menu-item>
        </el-submenu>


        <!--        登录弹出框-->
        <el-dialog title="登录" :visible.sync="loginFormVisible" width="21%">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.loginName" placeholder="用户名" prefixIcon="el-icon-user-solid"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.loginPwd" placeholder="密码" :show-password="form.loginShowPwd"
                        @keyup.enter.native="userLogin" prefixIcon="el-icon-lock"/>
            </el-form-item>
            <el-button @click="userLogin">登录&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
            <router-link to="/forgetPwd">
              <el-button @click="loginFormVisible = false">忘记密码&nbsp;&nbsp;<i class="el-icon-right"></i></el-button>
            </router-link>
          </el-form>
        </el-dialog>


        <!--        注册弹出框-->
        <el-dialog title="注册" :visible.sync="registerFormVisible" width="30%">

          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.registerName" placeholder="用户名" prefixIcon="el-icon-user-solid"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.registerPwd" placeholder="密码" :show-password="form.loginShowPwd"
                        prefixIcon="el-icon-lock"/>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.registerConfirmPwd" placeholder="确认密码" :show-password="form.loginShowPwd"
                        prefixIcon="el-icon-bell"/>
            </el-form-item>

            <!--              <el-form-item :label-width="formLabelWidth">-->
            <!--                <el-input v-model="form.registerInviteCode" placeholder="邀请码" prefixIcon="el-icon-s-promotion"/>-->
            <!--              </el-form-item>-->
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.registerMail" placeholder="邮箱" prefixIcon="el-icon-message"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-input v-model="form.registerMailCode" placeholder="邮箱验证码" prefixIcon="el-icon-key"/>
            </el-form-item>
            <el-button @click="sendMail">
              发送验证码&nbsp;&nbsp;
              <i class="el-icon-coffee-cup" v-if="!sendMailFlag"/>
              <i class="el-icon-loading" v-if="sendMailFlag"/>
            </el-button>
            <el-button @click="userRegister">注册&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
          </el-form>
        </el-dialog>


      </el-menu>
    </el-row>

  </div>

</template>
<script>
import user from '@/api/user'

import 'element-ui/lib/theme-chalk/display.css';

export default {
  data() {
    return {
      a: this.$store.state.name,
      searchTxt: '',//搜索框
      activeIndex: '1',//默认选中第一项->首页
      loginFormVisible: false,//登录框
      registerFormVisible: false,//注册框
      form: { //表单
        loginName: '',
        loginPwd: '',
        loginShowPwd: true, //登录是否显示密码
        registerName: '',//注册
        registerPwd: '',
        registerConfirmPwd: '',
        registerMail: '',
        registerMailCode: '',
      },
      formLabelWidth: '0px',
      sendMailFlag: false
    }
  },
  watch: {
    // 监控当前页面path，防止刷新页面显示错误
    '$route.path': {
      deep: true,
      immediate: true,
      handler(to, from) {
        if (to === '/') {
          this.activeIndex = '1'
        } else if (to === '/message') {
          this.activeIndex = '3'
        } else if (to === '/announcement') {
          this.activeIndex = '5'
        } else if (to === '/about') {
          this.activeIndex = '6'
        } else {
          this.activeIndex = '4'
        }
      }
    },
  },
  computed: {
//这里需要把store 动态的数据放到computed里面才会同步更新 视图
    getName() {
      return this.$store.state.name
    },
    getAvatar(){
      return this.$store.state.avatar
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key != null && key !== '')
        this.activeIndex = key
    },
    // egg() {
    //   this.$notify({
    //     title: '彩蛋',
    //     message: '耐心等待 十分钟后获得一枚邀请码',
    //     type: 'success',
    //     duration: 120
    //   });
    // },
    userLogin() { //登录方法
      if (this.form.loginName.length <= 0 || this.form.loginPwd.length <= 0) {
        this.$message({
          message: '字段不完整',
          type: 'error'
        });
        return;
      }
      user.login(this.form.loginName, this.form.loginPwd).then(response => {
        this.form.loginPwd = ''
        console.log(response.data)
        this.$store.commit('login', response.data)//存储token
        this.$store.commit('getCurrentUserInfo')
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.loginFormVisible = false
        this.a = this.$store.state.name
      })
    },
    logout() {  //退出登录
      user.logout().then(res => {
        this.$store.commit('logout')//清除token等信息
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        this.$router.push({ //路由跳转
          path: '/'
        })
      })

    },
    sendMail() {//发送邮件

      const reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
      if (!reg.test(this.form.registerMail)) {//检测字符串是否符合正则表达式
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        });
        return;
      }
      this.sendMailFlag = true;
      const mail = this.form.registerMail;
      const _this = this;
      user.sendMail(mail).then(res => {
        if (res.code === 200) {
          _this.$message.success('发送成功');
        } else {
          this.$message.error('发送失败');
        }
      }).catch(() => {
        this.sendMailFlag = false;
        this.$message.error('发送失败');
      })
    },
    userRegister() {//用户注册
      //判断是否输入字段
      if (this.form.registerName.length <= 0 || this.form.registerPwd.length <= 0 || this.form.registerConfirmPwd.length <= 0 ||
        this.form.registerMail.length <= 0 || this.form.registerMailCode.length <= 0) {
        this.$message({
          message: '字段不符合规范',
          type: 'error'
        });
        return;
      }
      if (this.form.registerPwd !== this.form.registerConfirmPwd) {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        });
        return;
      }
      if (this.form.registerPwd.length < 6) {
        this.$message({
          message: '密码长度需大于6位',
          type: 'error'
        });
        return;
      }
      var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);

      if (!reg.test(this.form.registerMail)) {//检测字符串是否符合正则表达式
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        });
        return;
      }

      user.register(this.form.registerName, this.form.registerPwd, this.form.registerMail, this.form.registerMailCode).then(res => {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        this.registerFormVisible = false
      })

    },
    searchSubmit() {
      if (this.searchTxt.length <= 0)
        return;
      this.$router.push({ //路由跳转
        path: '/searchBlog/' + this.searchTxt
      })
      this.searchTxt = '';//清空搜索框
    }

  }
}
</script>
<style scoped>
#bar {
  max-height: 340px;
  margin-top: -30px;
  margin-bottom: 0px;
}


/deep/ .el-input__inner { /*或者 .s2>>>.el-input__inner  */
  border-radius: 17px; /*输入框圆角值*/
}

#avatarImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}

.logoLink {
  margin-left: 20%;
}
.logoLink img {
    height: 28px;
    vertical-align: middle;
    margin-right: 8px;
    position: relative;
    top: -3px;
  }

#iconImg{
  width: 22px;
  height: 22px;
}

/*#space {*/
/*  margin: 0 21% 0 20%;*/
/*}*/


</style>
