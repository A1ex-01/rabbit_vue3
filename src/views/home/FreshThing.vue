<template>
  <div class="fresh">
    <HotTop>
      <template #left>
        <span style="font-size:26px;margin-right:16px">新鲜好物</span>
        <span style="color:#999">新鲜出炉&nbsp;&nbsp;品质靠谱</span></template
      >
      <template #right> 查看全部<i class="el-icon-arrow-right"></i> </template>
    </HotTop>
    <div class="goods">
      <div
        class="goodsitem"
        v-for="item in freshShow"
        :key="item.id"
        @click="goGood(item.id)"
      >
        <img :src="item.picture" alt="" />
        <p>{{ item.name }}</p>
        <p>￥{{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getFreshThiing } from "../../api/home.js";
import HotTop from "../../components/HotTop.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  setup() {
    // 获取新鲜好物列表
    const freshList = ref(null);
    const getFresh = async () => {
      const { data } = await getFreshThiing();
      if (data.msg === "操作成功") {
        freshList.value = data.result.newProduct;
      } else {
        ElMessage({
          message: "获取新鲜好物列表失败",
          type: "error",
        });
      }
    };
    onMounted(() => {
      getFresh();
    });
    // 展示前四个
    const freshShow = computed(() => {
      if (freshList.value) {
        return freshList.value.filter((item, index) => index < 4);
      } else {
        return null;
      }
    });

    // 跳转至商品列表
    const router = useRouter();
    const goGood = (i) => {
      router.push("/product/" + i);
    };
    return {
      freshList,
      freshShow,
      goGood,
    };
  },
  components: {
    HotTop,
  },
};
</script>
<style lang="scss" scoped>
.fresh {
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
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
      background-color: #f0f9f4;
      align-items: center;
      > img {
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
        &:last-child {
          color: #cf4444;
          padding-bottom: 20px;
          text-align: center;
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