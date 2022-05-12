<template>
  <div class="left">
    <div class="account" v-for="(item, index) in leftNavList" :key="index">
      <h2>{{ item.title }}</h2>
      <span
        v-for="(v, i) in item.children"
        :key="i"
        @click="itemclick(index, i)"
        :class="{ checked: active === `${index}_${i}` }"
        >{{ v }}</span
      >
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    // 侧边栏静态资源
    const leftNavList = ref([
      {
        title: "我的账户",
        children: [
          "个人中心",
          "消息通知",
          "个人信息",
          "安全设置",
          "地址管理",
          "我的积分",
          "我的足迹",
          "邀请有礼",
          "幸运抽奖",
        ],
      },
      {
        title: "交易管理",
        children: ["我的订单", "优惠券", "礼品卡", "评论晒单", "售后服务"],
      },
      {
        title: "我的收藏",
        children: ["收藏的商品", "收藏的专题", "关注的品牌"],
      },
      {
        title: "帮助中心",
        children: ["帮助中心", "在线客服"],
      },
    ]);

    // 侧边栏点击事件
    const active = ref("0_0");
    const changeIndex = (i) => {
      active.value = i;
    };

    // 侧边栏点击跳转
    const router = useRouter();
    const itemclick = (index, i) => {
      active.value = `${index}_${i}`;
      if (active.value == "0_0") {
        router.push("/member/personal");
      }
      if (active.value == "0_4") {
        router.push("/member/addr");
      }
      if (active.value == "1_0") {
        router.push("/member/order");
      }
      if (active.value == "0_2") {
        router.push("/member/mystatus");
      }
    };

    return {
      leftNavList,
      active,
      itemclick,
      changeIndex,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/icon.scss";
.left {
  width: 100%;
  .account {
    padding: 0 52px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f5f5f5;
    .checked {
      color: $base-color;
    }
    &:last-child {
      border: 0;
    }
    > h2 {
      width: 100%;
      font-size: 18px;
      color: #333;
      height: 50px;
      line-height: 50px;
    }
    > span {
      width: 100%;
      height: 45px;
      font-size: 14px;
      color: #666;
      line-height: 45px;
    }
  }
}
</style>
