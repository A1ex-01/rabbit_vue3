<template>
  <div class="cate">
    <div class="swiper">
      <el-image
        lazy
        :src="item.imgUrl"
        alt=""
        v-for="(item, index) in banner"
        :key="item.id"
        :class="{ checked: active == index }"
      />
      <span class="swiper_left" @click="left"
        ><el-icon><ArrowLeftBold /></el-icon
      ></span>
      <span class="swiper_right" @click="right"
        ><el-icon><ArrowRightBold /></el-icon
      ></span>
    </div>
    <div class="allcate">
      <p>全部分类</p>
      <div class="allcate_item">
        <div
          v-for="item in cateList.children"
          :key="item.id"
          @click="gogoods(item)"
        >
          <img :src="item.picture" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <CateItem :cateitem="cateList.children[0]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[1]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[2]" v-if="cateList"></CateItem>
    <CateItem :cateitem="cateList.children[3]" v-if="cateList"></CateItem>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getBannerList } from "../api/home.js";
import CateItem from "./CateItem.vue";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
export default {
  setup() {
    // 获取分类列表数据
    const banner = ref(null);
    const active = ref(0);
    const getBanner = async () => {
      const { data } = await getBannerList();
      banner.value = data.result;
    };

    // 点击跳转至商品分类页
    const router = useRouter();
    const gogoods = (i) => {
      let data = JSON.parse(localStorage.getItem("curmb"));
      data.level2 = i.name;
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: data.level1, level2: i.name, level3: "" })
      );
      router.push("/category/sub/" + i.id);
    };

    //左右按钮逻辑
    const left = () => {
      active.value = active.value == 0 ? 4 : active.value - 1;
    };
    const right = () => {
      active.value = active.value == 4 ? 0 : active.value + 1;
    };
    onMounted(() => {
      getBanner();
      setInterval(() => {
        right();
      }, 3000);
    });
    return {
      banner,
      active,
      gogoods,
      left,
      right,
    };
  },
  props: ["cateList"],
  components: {
    CateItem,
    ArrowLeftBold,
    ArrowRightBold,
  },
};
</script>
<style lang="scss" scoped>
.cate {
  width: 100%;
  margin-bottom: 20px;
  .swiper {
    width: 100%;
    height: 500px;
    position: relative;
    > .swiper_left,
    .swiper_right {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 0.5);
      font-size: 20px;
      text-align: center;
      line-height: 45px;
      color: white;
      top: 240px;
    }
    .swiper_left {
      left: 20px;
    }
    .swiper_right {
      right: 20px;
    }
    .el-image {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s;
    }
    .checked {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }
  .allcate {
    width: 100%;
    height: 260px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    p {
      height: 100px;
      font-size: 32px;
      line-height: 130px;
      color: #666;
      text-align: center;
    }
    .allcate_item {
      height: 100%;
      display: flex;
      padding: 0 32px;
      > div {
        width: 168px;
        height: 140px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
        align-items: center;
        &:hover {
          color: #27ba9b;
        }
        img {
          width: 100px;
          height: 100px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
