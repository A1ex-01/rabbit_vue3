<template>
  <div class="likes">
    <div class="top">
      <span
        ><i class="iconfont icon-lingxing" style="color: #bcf1e6"></i
        ><i class="iconfont icon-xiangyou" style="color: #27ba9b"></i
        >同类商品推荐</span
      >
    </div>
    <div class="bottom">
      <span @click="left"><i class="iconfont icon-xiangyou"></i></span>
      <div class="container">
        <div
          class="move"
          :style="{ transform: `translateX(${-(scrollPage - 1) * 1070}px)` }"
        >
          <div
            class="item"
            v-for="item in likesList"
            :key="item.id"
            @click="goProduct(item.id)"
          >
            <img :src="item.picture" alt="" />
            <p style="color: #666">{{ item.name }}</p>
            <p style="text-align: center; margin: 10px 0">￥{{ item.price }}</p>
          </div>
        </div>
      </div>
      <span @click="right"><i class="iconfont icon-xiangyou"></i></span>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getGoodrelevant } from "../../api/good";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const likesList = ref(null);
    const scrollPage = ref(1);
    const getRelevant = async () => {
      const { data } = await getGoodrelevant();
      if (data.msg === "操作成功") {
        likesList.value = data.result;
      } else {
        ElMessage({
          message: "获取同类喜欢失败",
          type: "error",
        });
      }
    };
    const router = useRouter();
    const goProduct = (id) => {
      router.push({ path: "/product/" + id });
    };
    const left = () => {
      scrollPage.value =
        scrollPage.value == 1 ? scrollPage.value : scrollPage.value - 1;
    };
    const right = () => {
      scrollPage.value =
        scrollPage.value == 4 ? scrollPage.value : scrollPage.value + 1;
    };
    onMounted(() => {
      getRelevant();
    });
    return {
      likesList,
      scrollPage,
      goProduct,
      left,
      right,
    };
  },
};
</script>
<style lang="scss" scoped>
.likes {
  width: 100%;
  height: 400px;
  margin: 20px 0;
  background-color: white;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .top {
    height: 80px;
    > span {
      line-height: 80px;
      font-size: 20px;
      color: #333;
      > .iconfont {
        font-size: 20px;
      }
      > .icon-xiangyou {
        margin-left: -11px;
        font-weight: bold;
      }
    }
  }
  .bottom {
    flex: 1;
    display: flex;
    > span {
      width: 75px;
      height: 100%;
      color: #666;
      text-align: center;
      line-height: 315px;
      &:first-child {
        transform: rotate(180deg);
      }
      > .iconfont {
        font-size: 30px;
        color: #999;
      }
    }
    .container {
      flex: 1;
      display: flex;
      overflow: hidden;
      .move {
        display: flex;
        transition: all 0.5s;
        .item {
          width: 240px;
          height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-right: 30px;
          transition: all 0.5s;
          p {
            width: 200px;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:last-child {
              color: #cf4444;
            }
          }
          > img {
            width: 190px;
            height: 190px;
            padding: 20px;
          }
        }
      }
    }
  }
}
</style>