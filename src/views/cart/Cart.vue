<template>
  <div class="cart">
    <Curmb></Curmb>
    <GoodsCart></GoodsCart>
    <ProductLike></ProductLike>
  </div>
</template>

<script>
import Curmb from "../../components/Curmb.vue"
import GoodsCart from "./GoodsCart.vue"
import ProductLike from "../product/ProductLike.vue"
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  setup(){
    const store = useStore();
    onMounted(() => {
    store.dispatch("home/getProductionCount")
    })
  },
  components:{
    Curmb,
    GoodsCart,
    ProductLike
  }
}
</script>
<style lang="scss" scoped>
.cart{
  padding: 0 140px;
  padding-bottom: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>