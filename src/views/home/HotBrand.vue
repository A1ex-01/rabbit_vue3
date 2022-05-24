<template>
  <div class="brand" style="min-width: 1240px">
    <HotTop>
      <template #left>
        <span style="font-size: 26px; margin-right: 16px">热门品牌</span>
        <span style="color: #999">国际经典&nbsp;&nbsp;品质保证</span></template
      >
      <template #right>
        <i
          :class="{ 'el-icon-arrow-left': true, checked: active === 1 }"
          @click="leftBtn"
        ></i>
        <i
          :class="{ 'el-icon-arrow-right': true, checked: active == 0 }"
          @click="rightBtn"
        ></i>
      </template>
    </HotTop>
    <div class="brandList">
      <div
        v-for="(item, index) in brandList"
        :key="item.id"
        :class="{ move: index == 0 && active == 1 }"
        @click="goBrand"
      >
        <el-image lazy :src="item.picture" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import HotTop from "../../components/HotTop.vue";
import { getBrandList } from "../../api/home.js";
import { ElMessage, ElNotification } from "element-plus";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取品牌列表
    const brandList = ref(null);
    const getBrand = async () => {
      const { data } = await getBrandList();
      if (data.msg === "操作成功") {
        brandList.value = data.result;
      } else {
        ElMessage({
          message: "获取品牌列表失败",
          type: "error",
        });
      }
    };
    onMounted(() => {
      getBrand();
    });

    // 消息提示
    const goBrand = () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      ElNotification({
        title: "提示",
        message: "暂未开放该功能！",
      });
    };

    // 左右按钮
    const active = ref(0);
    const leftBtn = () => {
      if (active.value == 1) {
        active.value = 0;
      }
    };
    const rightBtn = () => {
      if (active.value == 0) {
        active.value = 1;
      }
    };
    return {
      brandList,
      leftBtn,
      rightBtn,
      goBrand,
      active,
    };
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.brand {
  padding: 0 140px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .brandList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-width: 1240px;
    overflow: hidden;
    > div {
      flex: 1;
      margin-right: 8px;
      &:nth-child(1) {
        transition: all 0.8s;
      }
      > .el-image {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  margin-left: 5px;
  line-height: 20px;
  text-align: center;
  color: white;
}
.checked {
  background-color: #27ba9b;
}
.move {
  margin-left: -1240px;
  transition: all 0.8s;
}
</style>
