<template>
  <div class="collect">
    <div class="title">
      <HotTop>
        <template #left>
          <span style="font-size: 26px; color: #000">24小时热销</span></template
        >
        <template #right>
          查看全部<i
            class="iconfont icon-CZ_007"
            style="margin-left: 4px"
          ></i> </template
      ></HotTop>
    </div>
    <GoodCard :cateitem="collectList"></GoodCard>
  </div>
</template>

<script>
import HotTop from "../../components/HotTop.vue";
import GoodCard from "../../components/GoodCard.vue";
import { getHotGood } from "../../api/good";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取收藏列表
    const collectList = ref(null);
    const getNeedList = async () => {
      const {
        data: { result },
      } = await getHotGood();
      collectList.value = result;
    };
    onMounted(() => {
      getNeedList();
    });
    return {
      collectList,
    };
  },
  components: {
    HotTop,
    GoodCard,
  },
};
</script>
<style lang="scss" scoped>
.collect {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  > .goods {
    flex: 1;
  }
}
</style>