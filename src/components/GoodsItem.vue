<template>
  <div class="goods">
    <div class="title">
      <div class="left">{{ goodList.name }}</div>
      <div class="mid">
        <span
          v-for="item in goodList.children"
          :key="item.id"
          @click="goCate(item)"
          >{{ item.name }}</span
        >
      </div>
      <div class="right">
        <span @click="goAll"
          >查看全部<i class="iconfont icon-CZ_007" style="margin-left: 4px"></i
        ></span>
      </div>
    </div>
    <div class="gooditem">
      <div class="good_left" @click="goAll">
        <img :src="goodList.picture" alt="" />
        <div class="mask">
          <span>{{ goodList.name }}馆</span>
          <span>{{ goodList.saleInfo }}</span>
        </div>
      </div>
      <div class="good_right">
        <div
          :class="{ goods_right_item: true, checked: active == index }"
          v-for="(item, index) in goodList.goods"
          :key="item.id"
          @mouseenter="handleHover(index)"
          @mouseleave="handleLeave"
          @click="goProduct(item.id)"
        >
          <el-image lazy alt="" :src="item.picture" />
          <span>{{ item.name }}</span>
          <span>{{ item.desc }}</span>
          <span>￥{{ item.price }}</span>
          <div :class="{ mask: true, maskChecked: active == index }">
            <span>找相似</span>
            <span>发现更多宝贝<i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  props: ["goodList"],
  setup(props) {
    // 鼠标移入移出事件
    const active = ref(-1);
    const handleHover = (index) => {
      active.value = index;
    };
    const handleLeave = () => {
      active.value = -1;
    };

    // 页面跳转
    const router = useRouter();
    const goCate = (item) => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({
          level1: props.goodList.name,
          level2: item.name,
          level3: "",
        })
      );
      router.push("/category/sub/" + item.id);
    };
    const goAll = () => {
      localStorage.setItem(
        "curmb",
        JSON.stringify({ level1: props.goodList.name, level2: "", level3: "" })
      );
      router.push("/category/" + props.goodList.id);
    };
    const goProduct = (i) => {
      router.push("/product/" + i);
    };
    return {
      active,
      handleHover,
      handleLeave,
      goCate,
      goAll,
      goProduct,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.goods {
  padding: 0 140px;
  box-sizing: border-box;
  width: 100%;
  height: 725px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .gooditem {
    width: 100%;
    min-width: 1240px;
    display: flex;
    .good_left {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      .mask {
        position: absolute;
        left: 0;
        top: 300px;
        width: 188px;
        height: 66px;
        display: flex;
        > span {
          font-size: 18px;
          background-color: rgba($color: #000000, $alpha: 0.9);
          color: white;
          // line-height: 66px;
          width: 76px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:last-child {
            width: 112px;
            background-color: rgba($color: #000000, $alpha: 0.7);
            padding: 5px;
            box-sizing: border-box;
          }
        }
      }
      img {
        width: 240px;
        height: 610px;
        object-fit: cover;
      }
    }
    .good_right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods_right_item {
        width: 240px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid rgba($color: #27ba9b, $alpha: 0);
        transition: all 0.5s;
        position: relative;
        &:nth-child(n + 5) {
          border-bottom: 1px solid #27ba9b;
        }
        .mask {
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 239px;
          height: 0px;
          background-color: #27ba9b;
          transition: height 0.5s;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #fff;
            font-size: 18px;
            color: white;
            &:last-child {
              width: 120px;
              height: 30px;
              border: 0;
              font-size: 14px;
              line-height: 30px;
            }
          }
        }
        .maskChecked {
          height: 86px;
          transition: height 0.5s;
        }
        .el-image {
          width: 160px;
          height: 160px;
        }
        > span {
          font-size: 16px;
          color: #333;
          width: 178px;
          &:nth-child(3) {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #666;
          }
          &:nth-child(4) {
            color: #cf4444;
            font-size: 20px;
            padding-bottom: 20px;
            box-sizing: border-box;
          }
        }
      }
      .checked {
        border: 1px solid rgba($color: #27ba9b, $alpha: 1);
        transition: all 0.5s;
      }
    }
  }
  .title {
    width: 100%;
    height: 115px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 32px;
      color: #333;
    }
    .mid {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      margin-right: 100px;
      span {
        font-size: 16px;
        padding: 2px 12px;
      }
    }
    .right {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
