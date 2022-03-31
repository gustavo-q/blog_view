<template>
  <div id="echartsWordcloud" style="width:100%;height:200px;"></div>
</template>
<script>

export default{
  props:{
    datas: {
      type: Array,
      default: []
    },
  },
  // inject:['reload'],
  data(){
    return{
    }
  },
  mounted(){
    this.initEcharts(this.datas)
  },
  methods:{
    initEcharts(datas){
      let echartsWordcloud=this.$echarts.init(document.getElementById("echartsWordcloud"));
      let option = {
        title: {
          text: "",
          x: "center"
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 20,
            //用来调整字的大小范围
            sizeRange: [17, 30],
            rotationRange: [0, 0],
            //随机生成字体颜色
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                }
              }
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: datas
          }
        ]
      };
      echartsWordcloud.setOption(option);

      //点击事件
      echartsWordcloud.on("click",function(e){
        // console.log(e.data.value)
        // this.$router.push({ //路由跳转
        //   path: '/tag/' + e.data.value
        // })
      })

    },
    // //点击刷新
    // refresh(){
    //   // 刷新单页面
    //   this.reload();
    // }
  }
}
</script>
