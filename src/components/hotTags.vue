<template>
  <el-card id="myTag">
    <p>
      <span style="color:#67C23A" class="el-icon-collection-tag">标签</span>
    </p>
    <hr/>

        <div v-for="tag in tags">
            <el-link type="success" :underline="false" @click="router(tag.id)">{{tag.tag}}</el-link>
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
        // res.data.map(t => {
        //   var jsObj = {};
        //   jsObj.name = t.tag;
        //   jsObj.value = t.id;
        //   this.tags.push(jsObj)
        // })
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
  margin: 30px 10px;
  height: 300px;

}
</style>
