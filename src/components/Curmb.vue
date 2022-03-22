<template>
  <div class="crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level1">{{
        curmb.level1
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level2">{{
        curmb.level2
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="curmb && curmb.level3">{{
        curmb.level3
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  setup() {
    //通过本地取得面包屑
    const curmb = ref(null);
    const route = useRoute();
    const getCurmb = () => {
      setTimeout(() => {
        curmb.value = JSON.parse(localStorage.getItem("curmb"));
      }, 1000);
    };

    //路由改变更新面包屑
    watch(
      route,
      () => {
        getCurmb();
      },
      {
        immediate: true,
      }
    );
    return {
      curmb,
    };
  },
};
</script>
<style lang="scss" scoped>
.crumb {
  padding: 20px 0;
}
</style>