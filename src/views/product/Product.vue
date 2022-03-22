<template>
  <div class="product">
    <Curmb></Curmb>
    <ProductShow :goodDetail="goodDetail"></ProductShow>
    <ProductLike></ProductLike>
    <ProductDetail
      :details="goodDetail.details"
      v-if="goodDetail"
    ></ProductDetail>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue";
import ProductShow from "./ProductShow.vue";
import ProductLike from "./ProductLike.vue";
import ProductDetail from "./ProductDetail.vue";
import { getGoodDetailInfo } from "../../api/good.js";
import { ElMessage } from "element-plus";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    // 获取商品详细信息
    const goodDetail = ref(null);
    const route = useRoute();
    const getGoodDetail = async () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      const { data } = await getGoodDetailInfo(route.params);
      if (data.msg === "操作成功") {
        localStorage.setItem(
          "curmb",
          JSON.stringify({
            level1: data.result.categories[1].name,
            level2: data.result.categories[0].name,
            level3: data.result.name,
          })
        );
        goodDetail.value = data.result;
      } else {
        ElMessage({
          message: "获取商品详情失败",
          type: "error",
        });
      }
    };

    // 路由改变更新信息
    watch(
      route,
      () => {
        getGoodDetail();
      },
      { immediate: true }
    );

    const store = useStore();
    onMounted(() => {
      // getGoodDetail();
      store.dispatch("home/getProductionCount");
    });
    return {
      goodDetail,
    };
  },
  components: {
    Curmb,
    ProductShow,
    ProductLike,
    ProductDetail,
  },
};
</script>
<style lang="scss" scoped>
.product {
  width: 100%;
  padding: 0 140px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>