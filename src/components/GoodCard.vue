<template>
  <div class="goods">
    <div v-for="item in cateitem" :key="item.id" @click="goProduct(item.id)">
      <el-image lazy :src="item.picture" alt="" />
      <p>{{ item.name }}</p>
      <p>{{ item.desc }}</p>
      <p>￥{{ item.price }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["cateitem"],
  setup() {
    // 点击跳转至商品详情页
    const router = useRouter();
    const goProduct = (id) => {
      router.push("/product/" + id);
    };
    return {
      goProduct,
    };
  },
};
</script>
<style lang="scss" scoped>
.goods {
  height: 100%;
  width: 100%;
  padding: 0 20px;
  padding-bottom: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    width: 220px;
    height: 300px;
    padding: 20px 30px;
    margin-right: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.5s;
    margin-bottom: 20px;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      transition: transform 0.5s;
    }
    .el-image {
      width: 160px;
      height: 160px;
    }
    p {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      &:nth-child(3) {
        color: #999;
        margin: 10px 0;
      }
      &:nth-child(4) {
        color: #cf4444;
        font-size: 20px;
        width: 100px;
        text-align: center;
      }
    }
  }
}
</style>
