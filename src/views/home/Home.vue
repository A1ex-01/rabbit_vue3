<template>
  <div class="home">
    <TopHome></TopHome>
    <NavHome :navList="cateList"></NavHome>
    <router-view></router-view>
    <BottomShow></BottomShow>
    <div :class="{ mask: true, show: show }">
      <NavHome :navList="cateList"></NavHome>
    </div>
  </div>
</template>
<script>
import TopHome from "./TopHome.vue";
import NavHome from "./NavHome.vue";
import BottomShow from "./BottomShow.vue";
import { ElMessage } from "element-plus";
import { getCategoryList } from "../../api/home";
// import { getCookie } from "../../utils/cookie";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { getCookie } from "@/utils/cookie";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取分类列表
    const show = ref(false);
    const getScrollY = () => {
      if (window.pageYOffset > 100) {
        show.value = true;
      } else {
        show.value = false;
      }
    };
    const getCateList = async () => {
      const { data } = await getCategoryList();
      if (data.msg === "操作成功") {
        cateList.value = data.result;
        ElMessage({
          message: "获取列表成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "获取列表失败",
          type: "error",
        });
      }
    };

    // 监听和移除滚动事件
    // 获取猎表数据
    const cateList = ref(null);
    const store = useStore();
    onMounted(() => {
      getCateList();
      store.commit("login/getInfo", JSON.parse(getCookie("info")));
      store.dispatch("home/getProductionCount");
      document.addEventListener("scroll", getScrollY);
    });
    // onUnmounted(() => {
    //   document.removeEventListener(listen);
    // });
    return {
      cateList,
      show,
    };
  },
  components: {
    TopHome,
    NavHome,
    BottomShow,
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 0px;
    background-color: white;
    transition: height 0.5s;
    display: none;
    > .nav {
      height: 80px;
    }
  }
  .show {
    height: 80px;
    display: block;
    transition: height 0.5s;
  }
}
</style>
