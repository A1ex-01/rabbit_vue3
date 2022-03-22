<template>
  <div class="mine">
    <div class="left">
      <PersonLeft ref="leftDom"></PersonLeft>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted, provide, ref } from "@vue/runtime-core";
import PersonLeft from "./PersonLeft.vue";
import { useStore } from "vuex";
export default {
  setup() {
    // 获取tab栏的changeIndex方法并注入子组件
    const leftDom = ref(null);
    const changeIndex = (i) => {
      leftDom.value.changeIndex(i);
    };
    provide("changeIndex", changeIndex);

    // 挂在后获取用户产品总数
    const store = useStore();
    onMounted(() => {
      store.dispatch("home/getProductionCount");
    });
    return {
      leftDom,
    };
  },
  components: {
    PersonLeft,
  },
};
</script>
<style lang="scss" scoped>
.mine {
  padding: 20px 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start;
  > .left {
    width: 220px;
    background-color: white;
    flex-shrink: 0;
  }
  > .right {
    flex: 1;
    margin-left: 20px;
    background-color: #f5f5f5;
  }
}
</style>