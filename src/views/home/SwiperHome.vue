<template>
  <div class="swiper">
    <div class="img">
      <img
        :class="{ checked: active == index }"
        :src="item.imgUrl"
        v-for="(item, index) in bannerList"
        :key="item.id"
        alt=""
        @mouseenter="stopPlay"
        @mouseleave="startPlay"
      />
      <div class="left" @click="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="right" @click="right">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="tabList">
        <div
          class="warp"
          v-for="(item, index) in tabList"
          :key="index"
          @mouseenter="setShowGoods(index)"
          @mouseleave="hideShowGoods"
        >
          <span @click="goCategory(item.id, item.name)">{{ item.name }}</span>
          <div class="title" v-for="(v, i) in item.children" :key="i">
            <span
              v-if="i < 2"
              @click="goDetailCategory(v.id, item.name, v.name)"
              >{{ v.name }}</span
            >
          </div>
        </div>
      </div>
      <div
        :class="{ tabRight: true, checkedin: showGoods == index }"
        v-for="(item, index) in tabList"
        :key="index"
        @mouseenter="enterItem(showGoods)"
        @mouseleave="hideShowGoods"
      >
        <div class="top">
          <span>分类推荐</span>
          <span>根据您的购买或浏览记录推荐</span>
        </div>
        <div class="goods">
          <div
            class="item"
            v-for="(v, i) in item.goods"
            :key="i"
            @click="goproduct(v)"
          >
            <img :src="v.picture" alt="" />
            <div class="goodsinfo">
              <span>{{ v.name }}</span>
              <span>{{ v.desc }}</span>
              <span>{{ v.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getBannerList } from "../../api/home";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
// import { ElSkeleton } from "element-plus";
export default {
  props: ["tabList"],
  setup() {
    // 侧边栏选中状态
    const active = ref(0);
    const setActive = (item) => {
      active.value = item;
    };

    // 设置对应蒙层显示
    const showGoods = ref(-1);
    const setShowGoods = (item) => {
      clearTimeout(p1);
      clearTimeout(p2);
      p1 = setTimeout(() => {
        showGoods.value = item;
      }, 200);
    };

    // 移入移出行为
    let p1 = null;
    let p2 = null;
    let autoplay = null;
    const hideShowGoods = () => {
      clearTimeout(p1);
      clearTimeout(p2);
      p2 = setTimeout(() => {
        showGoods.value = -1;
      }, 200);
    };
    const enterItem = (item) => {
      clearTimeout(p1);
      clearTimeout(p2);
      p2 = setTimeout(() => {
        showGoods.value = item;
      }, 200);
    };

    // 链接跳转
    const router = useRouter();
    const goCategory = (i, name) => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: name, level2: "", level3: "" })
      );
      router.push("/category/" + i);
    };
    const goDetailCategory = (id, vname, iname) => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: vname, level2: iname, level3: "" })
      );
      router.push("/category/sub/" + id);
    };
    const goproduct = (j) => {
      router.push("/product/" + j.id);
    };

    // 获取列表
    const bannerList = ref(null);
    const getBanner = async () => {
      const res = await getBannerList();
      bannerList.value = res.data.result;
    };

    // 左右按钮
    const left = () => {
      if (active.value != 4) {
        active.value++;
      } else {
        active.value = 0;
      }
    };
    const right = () => {
      if (active.value != 4) {
        active.value++;
      } else {
        active.value = 0;
      }
    };

    // 自动轮播控制
    const stopPlay = () => {
      clearInterval(autoplay);
    };
    const startPlay = () => {
      autoplay = setInterval(() => {
        right();
      }, 3000);
    };
    onMounted(() => {
      // 获取banner列表
      getBanner();
      // 开启自动播放
      autoplay = setInterval(() => {
        right();
      }, 3000);
    });
    return {
      active,
      setActive,
      goCategory,
      goDetailCategory,
      setShowGoods,
      hideShowGoods,
      enterItem,
      goproduct,
      left,
      right,
      stopPlay,
      startPlay,
      bannerList,
      showGoods,
    };
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
  height: 500px;
  background-color: #ccc;
  .img {
    width: 100%;
    height: 100%;
    position: relative;
    .tabRight {
      position: absolute;
      left: 250px;
      top: 0px;
      background-color: rgba($color: #fff, $alpha: 0.4);
      width: 990px;
      height: 500px;
      padding: 15px;
      box-sizing: border-box;
      display: none;
      .top {
        width: 100%;
        height: 40px;
        span {
          font-size: 20px;
          color: white;
          line-height: 40px;
          &:last-child {
            font-size: 14px;
            margin-left: 16px;
          }
        }
      }
      .goods {
        width: 100%;
        height: 430px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 308px;
          height: 118px;
          padding: 10px;
          box-sizing: border-box;
          background-color: white;
          display: flex;
          > img {
            width: 95px;
            height: 95px;
          }
          .goodsinfo {
            flex: 1;
            width: 180px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            span {
              font-size: 16px;
              color: #666;
              &:nth-child(2) {
                font-size: 14px;
                margin: 8px 0;
                color: #999;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              &:last-child {
                font-size: 20px;
                color: #cf4444;
              }
            }
          }
        }
      }
    }
    .checkedin {
      display: block;
    }
    .tabList {
      width: 250px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba($color: #000000, $alpha: 0.8);
      display: flex;
      flex-direction: column;
      .warp {
        flex: 1;
        color: white;
        display: flex;
        padding-left: 40px;
        box-sizing: border-box;
        align-items: center;
        &:hover {
          background-color: #27ba9b;
        }
        > span {
          font-size: 16px;
          margin-right: 3px;
          vertical-align: top;
        }
        .title {
          display: flex;
          margin-top: 2px;
          > span {
            font-size: 14px;
            &:first-child {
              margin-right: 5px;
            }
          }
        }
      }
    }
    .left,
    .right {
      position: absolute;
      top: 228px;
      width: 44px;
      height: 44px;
      background-color: rgba($color: #fff, $alpha: 0.3);
      font-size: 16px;
      text-align: center;
      line-height: 44px;
      border-radius: 50%;
      color: white;
    }
    .left {
      left: 280px;
    }
    .right {
      right: 40px;
    }
    > img {
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      transition: opacity 1s;
      &.checked {
        opacity: 1;
      }
    }
  }
}
.elskeleton {
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.5em;
  .elskeleton-item2 {
    flex: 1;
  }
}
</style>
