<template>
  <div class="hot" style="min-width: 1240px">
    <HotTop>
      <template #left>
        <span style="font-size: 26px; margin-right: 16px">人气推荐</span>
        <span style="color: #999">人气爆款&nbsp;&nbsp;不容错过</span>
      </template>
      <template #right>
        查看全部<i class="iconfont icon-CZ_007" style="margin-left: 4px"></i>
      </template>
    </HotTop>
    <div class="goods">
      <div
        class="goodsitem"
        v-for="item in hotList"
        :key="item.id"
        @click="warning"
      >
        <el-image lazy :src="item.picture" alt="" />
        <p>{{ item.title }}</p>
        <p>{{ item.alt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElNotification } from "element-plus";
import { getHotList } from "@/api/home.js";
import HotTop from "../../components/HotTop.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取推荐列表
    const hotList = ref(null);
    const getHot = async () => {
      const { data } = await getHotList();
      if (data.msg === "操作成功") {
        hotList.value = data.result;
      } else {
        ElMessage({
          message: "获取新鲜好物列表失败",
          type: "error",
        });
      }
    };
    onMounted(() => {
      getHot();
    });
    // 消息提示
    const warning = () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      ElNotification({
        message: "该功能暂未开放！",
        title: "提示",
        type: "info",
      });
    };
    return {
      hotList,
      warning,
    };
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.hot {
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
  min-width: 1240px;
  .goods {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    > .goodsitem {
      width: 306px;
      height: 406px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #fff;
      align-items: center;
      > .el-image {
        width: 306px;
        height: 306px;
      }
      p {
        width: 250px;
        font-size: 22px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        &:last-child {
          color: #999;
          font-size: 18px;
          padding-bottom: 20px;
        }
      }
      &:hover {
        transform: translate3d(0, -3px, 0);
        transition: all 0.5s;
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }
    }
  }
  // .top {
  //   width: 100%;
  //   height: 115px;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   span {
  //     font-size: 32px;
  //     color: #333;
  //     margin-right: 10px;
  //     &:last-child {
  //       font-size: 16px;
  //       color: #999;
  //     }
  //   }
  // }
  .right {
    font-size: 16px;
    color: #999;
  }
}
</style>
