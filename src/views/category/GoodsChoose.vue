<template>
  <div class="choose">
    <Curmb></Curmb>
    <ChooseCommon :filterList="filterList"></ChooseCommon>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue";
import ChooseCommon from "./ChooseCommon.vue";

import { ElMessage } from "element-plus";
import { getFilterCategory } from "../../api/category.js";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  setup() {
    const filterList = ref(null);
    const route = useRoute();
    const getFilterList = async () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      const { data } = await getFilterCategory(route.params);
      if (data.msg === "操作成功") {
        filterList.value = data.result;
      } else {
        ElMessage({
          message: "获取过滤列表失败",
          type: "error",
        });
      }
    };
    watch(
      route,
      () => {
        getFilterList();
      },
      { immediate: true }
    );
    return {
      filterList,
    };
  },
  components: {
    Curmb,
    ChooseCommon,
  },
};
</script>
<style lang="scss" scoped>
.choose {
  padding: 0 140px;
  background-color: #f5f5f5;
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>