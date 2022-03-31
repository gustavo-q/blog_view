<template>
  <el-card id="categoryList" shadow="never" style='line-height:30px;'>
    <div style="display: flex;flex-direction:row;flex-wrap: wrap;">
      <el-link :underline="false" :type="checkIn===0?'primary':'info'"
               style="font-size: 16px;margin-right: 35px" @click="router(0)">推荐
      </el-link>
      <el-link :underline="false" style="font-size: 16px;margin-right: 35px" @click="router(category.id)"
               v-for="category in categoryList" :type="checkIn===category.id?'primary':'info'"
                v-if="category.articleNum>0?'disabled':''">
        {{ category.type }}
      </el-link>
    </div>
  </el-card>
</template>


<script>
import category from '@/api/category'


export default {
  data() {
    return {
      categoryList: [],
      checkIn: 0
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      category.getAllCategory().then(res => {
        this.categoryList = res.data;
      })
    },
    router(roleId) {
      scrollTo(0, 0);
      this.checkIn = roleId

      this.$router.push({ //路由跳转
        path: '/category/' + roleId
      });

    },

  }
}
</script>
<style scoped>
#categoryList {
  height: 100%;
  background-color: #ffffff;
}


</style>
