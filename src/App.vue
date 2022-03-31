<template>
  <div id="app">
    <bar/>
    <router-view/>
    <bottom/>
  </div>
</template>

<script>
  import bar from '@/components/bar'
  import bottom from '@/components/bottom'

  export default {
    components: {bar, bottom},
    name: 'App'
  }
</script>

<style>
  #app {

    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    text-align: center;
    background-color: #f9f9f9;

  }
</style>
