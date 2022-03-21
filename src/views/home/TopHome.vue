<template>
  <div class="top">
    <span v-if="userInfo" @click="goMember"
      ><i class="iconfont icon-user"></i
      >{{ userInfo.nickname }}</span
    >
    <span v-else @click="goLogin">请先登录</span>
    <span v-if="userInfo" @click="exitAcciunt">退出登录</span>
    <span v-else>免费注册</span>
    <span @click="goOrder">我的订单</span>
    <span>会员中心</span>
    <span>帮助中心</span>
    <span>关于我们</span>
    <span><i class="iconfont icon-shouji"></i>手机版</span>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { delCookie, getCookie } from "../../utils/cookie";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from 'vue-router';
export default {
  setup() {
    // 如果有token则获取用户信息，否则弹出错误信息
    const userInfo = ref(null);
    onMounted(() => {
      if (getCookie("token")) {
        userInfo.value = JSON.parse(getCookie("info"));
      } else {
        ElMessage({
          message: "获取用户信息失败",
          type: "success",
        });
      }
    });

    // 链接跳转
    const router = useRouter();
    const goMember =() => {
      router.push("/member");
    }
    const goLogin=()=> {
      router.push("/login");
    };
    const goOrder=()=> {
      router.push({ path: "/member/order" });
    }
    const exitAcciunt = () => {
      delCookie("token");
      delCookie("info");
      router.push({ path: "/login" });
    };
    return {
      goMember,
      goLogin,
      goOrder,
      exitAcciunt,
      userInfo
    }
  },
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 53px;
  padding: 0 140px;
  min-width: 1240px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  background-color: #333;
  align-items: center;
  > span {
    font-size: 14px;
    border-right: 1px solid #f5f5f5;
    padding: 0 15px;
    height: 14px;
    color: #cdcdcd;
    line-height: 14px;
    &:last-child {
      border: 0;
    }
    &:hover {
      color: #27ba9b;
    }
  }
}
.el-icon {
  margin-right: 5px;
  font-size: 14px;
  vertical-align: top;
}
</style>