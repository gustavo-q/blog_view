<template>
  <el-card id="myTag">
    <p>
      <span style="color:#67C23A" class="el-icon-collection-tag">个人标签</span>
    </p>
    <hr/>

<!--    <div>-->
<!--      <echartsWordcloud :datas=this.tags />-->
<!--    </div>-->
    <div v-for="tag in tags">
      <el-link type="success" :underline="false" @click="router(tag.id)">{{tag.tag}}</el-link>
    </div>

  </el-card>
</template>

<script>
  import tag from '@/api/tag'
  import echartsWordcloud from '@/components/echartsWordcloud'

  export default {
    name: 'myTag',
    components: {echartsWordcloud},
    data() {
      return {
        tags: []
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        tag.getTag().then(res => {
          this.tags = res.data
            // res.data.map(t => {
            //   var jsObj = {};
            //   jsObj.name = t.tag;
            //   jsObj.value = t.id;
            //   this.tags.push(jsObj)
            // })
        })
      },
      router(id) {
        scrollTo(0, 0);
        this.$router.push({ //路由跳转
          path: '/myTag/'+id
        })
      }

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
