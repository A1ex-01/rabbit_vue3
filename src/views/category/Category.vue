<template>
  <div class="category">
    <Curmb></Curmb>
    <CateCommon :cateList="cateList" v-if="cateList"></CateCommon>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getCategory } from "../../api/category.js";
import CateCommon from "../../components/CateCommon.vue";
import Curmb from "../../components/Curmb.vue";
import { ref } from "@vue/reactivity";
import { useRoute } from 'vue-router';
import { watch } from '@vue/runtime-core';
export default {
  setup() {
    const cateList = ref(null);
    const route = useRoute();
    const getCategoryList = async () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      const { data } = await getCategory(route.params);
      if (data.msg === "操作成功") {
        cateList.value = data.result;
      } else {
        ElMessage({
          message: "获取分类失败",
          type: "warning",
        });
      }
    };
    watch(route, () => {
      getCategoryList();
    },{
      immediate:true
    })
    return {
      cateList
    }
  },
  components: {
    CateCommon,
    Curmb,
  },
};
</script>
<style lang="scss" scoped>
.category {
  padding: 0 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
</style>