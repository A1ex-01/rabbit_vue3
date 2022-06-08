<template>
  <div class="nav">
    <img
      src="../../assets/img/logo.png"
      @click="$router.push('/home')"
      alt=""
    />
    <ul class="list">
      <li @click="goHome">首页</li>
      <li
        v-for="(item, index) in items"
        :key="index"
        @mouseenter="hoverNav(index)"
        @mouseleave="leaveNav()"
        @click="goLevel1(navList[index])"
      >
        {{ item }}
      </li>
    </ul>
    <div class="search">
      <input type="text" placeholder="搜一搜" />
      <div class="mask">
        <i class="iconfont icon-search" style="font-size: 20px"></i>
      </div>
      <span>{{ count }}</span>
    </div>
    <div class="shop" @click="goCart">
      <i class="iconfont icon-gouwuche" style="font-size: 20px"></i>
    </div>
    <div
      :class="{ slider: true, checked: active == index }"
      v-for="(item, index) in navList"
      :key="index"
      @mouseenter="hoverItem(active)"
      @mouseleave="leaveNav()"
    >
      <div
        class="item"
        v-for="v in item.children"
        :key="v.id"
        @click="goLevel2(v)"
      >
        <img :src="v.picture" alt="" />
        <span>{{ v.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  props: ["navList"],
  setup() {
    // 静态一级菜单
    const items = ref([
      "居家",
      "美食",
      "服饰",
      "母婴",
      "个护",
      "严选",
      "数码",
      "运动",
      "杂项",
    ]);

    // 防抖定时器
    const p1 = ref(null);
    const p2 = ref(null);

    // 一级二级菜单移入移除事件
    const active = ref(-1);
    const hoverNav = (item) => {
      clearTimeout(p1.value);
      clearTimeout(p2.value);
      p1.value = setTimeout(() => {
        active.value = item;
        p1.value = null;
      }, 200);
    };
    const hoverItem = (item) => {
      clearTimeout(p1.value);
      clearTimeout(p2.value);
      active.value = item;
    };
    const leaveNav = () => {
      clearTimeout(p1.value);
      clearTimeout(p2.value);
      p2.value = setTimeout(() => {
        active.value = -1;
        p2.value = null;
      }, 200);
    };

    // 商品总数
    const store = useStore();
    const count = computed(() => store.state.home.cartNum);

    // 一级二级菜单、首页和购物车页面跳转行为
    const router = useRouter();
    const goLevel1 = (item) => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: item.name, level2: "", level3: "" })
      );
      router.push("/category/" + item.id);
    };
    const goLevel2 = (v) => {
      let data = JSON.parse(localStorage.getItem("curmb"));
      data.level2 = v.name;
      localStorage.setItem("curmb", JSON.stringify({ ...data, level3: "" }));
      router.push("/category/sub/" + v.id);
    };
    const goHome = () => {
      router.push("/home");
    };
    const goCart = () => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: "购物车", level2: "", level3: "" })
      );
      router.push("/cart");
    };

    return {
      active,
      items,
      count,
      hoverNav,
      leaveNav,
      hoverItem,
      goCart,
      goHome,
      goLevel1,
      goLevel2,
    };
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 132px;
  min-width: 1520px;
  display: flex;
  padding: 0 140px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .slider {
    width: 1240px;
    height: 0px;
    position: absolute;
    left: 140px;
    top: 100px;
    padding-left: 100px;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    align-items: center;
    opacity: 0;
    .item {
      width: 110px;
      height: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {
        color: #27ba9b;
      }
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
        display: none;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .checked {
    height: 132px;
    opacity: 1;
    transition: all 0.5s;
    .item {
      > img {
        display: block;
      }
    }
    // transition: height 0.5s;
  }
  > img {
    width: 200px;
    height: 80px;
  }
  .list {
    width: 100%;
    display: flex;
    li {
      flex: 1;
      line-height: 132px;
      text-align: center;
      &:hover {
        color: #27ba9b;
      }
    }
  }
  .search {
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    > span {
      position: absolute;
      right: -36px;
      top: -4px;
      border-radius: 10px;
      background-color: #e26237;
      padding: 1px 6px;
      font-size: 10px;
      color: white;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      font-size: 20px;
      > .el-icon {
        vertical-align: middle;
        color: #333;
      }
    }
    input {
      width: 150px;
      height: 24px;
      outline: 0;
      color: #333;
      border: 0;
      padding-left: 24px;
    }
  }
  .shop {
    width: 50px;
    height: 32px;
    .iconfont {
      font-size: 26px;
      text-align: center;
    }
  }
}
</style>
