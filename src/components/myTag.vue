<template>
  <el-card id="myTag">
    <p>
      <span style="color:#67C23A" class="el-icon-collection-tag">个人标签</span>
    </p>
    <hr/>

    <div v-for="tag in tags">
        <el-link type="success" :underline="false">{{tag.tag}}</el-link>
    </div>

  </el-card>
</template>

<script>
  import tag from '@/api/tag'

  export default {
    name: 'myTag',
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
          this.tags = res.data;
        })
      },

    }
  }
</script>
<style scoped>
  #myTag {
    /*-moz-box-shadow: 0px 6px 0px #333333;*/
    /*-webkit-box-shadow: 0px 6px 0px #333333;*/
    /*box-shadow: 0px 3px 10px #333333;*/
    margin: 30px 10px;

  }
</style>
