<template>
  <el-card id="introduction">
    <!--<hr />-->
    <span style="color:#d9ead1;font-size: 25px">名片</span>
    <h1> 作者信息：Gustavo</h1>
    <h1> 文章总数:&nbsp;&nbsp;&nbsp;{{ introduction.article }}</h1>
    <h1> 访问量:&nbsp;&nbsp;&nbsp;{{ introduction.visitor }}</h1>
    <div class="imgs">
      <el-tooltip class="item" effect="dark" :content="introduction.qq+''" placement="top-start">
        <img src="../assets/icon/QQ.png">
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="introduction.wechat" placement="top-start">
        <img src="../assets/icon/wechat-fill.png">
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="introduction.email" placement="top-start">
        <img src="../assets/icon/email-fill.png">
      </el-tooltip>

    </div>

  </el-card>
</template>

<script>
import site from '@/api/site'

export default {
  name: 'introduction',
  data() {
    return {
      introduction: ''
    }
  },
  created() {
    site.getSite().then(responese => {
      this.introduction = responese.data;
    });
  }

}
</script>
<style scoped>
#introduction {
  /*-moz-box-shadow: 0px 6px 0px #333333;*/
  /*-webkit-box-shadow: 0px 6px 0px #333333;*/
  /*box-shadow: 0px 3px 10px #333333;*/
  text-align: left;
  background: #5b5e5b;

}

#introduction h1 {
  width: 100%;
  font-size: 16px;
  color: #ebeee9;
  line-height: 10px;

}

.imgs img{
  width: 40px;
  height: 40px;
  margin: 5px;
  margin-left: 23px;
}

</style>
