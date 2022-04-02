<template>
  <el-card id="myTag">
    <span style="color:#d9ead1;font-size: 25px;  border-bottom: 3px solid #c5a7a7;padding-bottom: 12px;
    line-height: 0.9;">标签云</span>

    <div class="tagCss">
      <el-button :underline="false" style="font-size: 14px;margin-top: 5px;color: #f9f9f9" v-for="tag in tags"
                 :style="{'background-color':colorlists[Math.floor(Math.random()*10)]}"
                 @click="router(tag.id)">
        {{ tag.tag }}
      </el-button>
    </div>

    <!--    <keep-alive>-->
    <!--    <echartsWordcloud :datas=this.tags v-if="isReloadData"/>-->
    <!--    </keep-alive>-->
  </el-card>
</template>

<script>
import tag from '@/api/tag'
// import echartsWordcloud from '@/components/echartsWordcloud'

export default {
  name: 'myTag',
  // components: {echartsWordcloud},
  data() {
    return {
      tags: [],
      color: '',
      colorlists: [

        'rgb(229, 0, 19)',

        'rgb(206,194,28)',

        'rgb(0,161,233)',

        'rgb(109,185,45)',

        'rgb(166,0,130)',

        'rgb(237,108,0)',

        'rgb(240, 28, 131)',

        'rgb(84, 21, 226)',

        'rgb( 0,128,0)',

        'rgb( 255,69,0)',

        'rgb( 255,165,0)',

        'rgb( 178,34,34)',

        'rgb( 255,0,255)',

        'rgb(65,105,225)',

        'blueviolet'

      ]
      // isReloadData: true,
    }
  },
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  created() {
    this.load()
  },
  methods: {
    load() {
      tag.getHotTags().then(res => {
        this.tags = res.data
        console.log(this.tags)
      })
    },
    router(id) {
      scrollTo(0, 0);
      this.$router.push({ //路由跳转
        path: '/hotTag/' + id
      })
    },
    // reload() {
    //   this.isReloadData = false;
    //   this.$nextTick(() => {
    //     this.isReloadData = true;
    //   });
    // }

  }
}
</script>
<style scoped>
#myTag {
  /*-moz-box-shadow: 0px 6px 0px #333333;*/
  /*-webkit-box-shadow: 0px 6px 0px #333333;*/
  /*box-shadow: 0px 3px 10px #333333;*/
  margin-top: 30px ;
  height: 300px;
  text-align: left;

}

.tagCss {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

</style>
