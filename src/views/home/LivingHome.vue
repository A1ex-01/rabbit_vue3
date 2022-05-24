<template>
  <div class="living" style="min-width: 1240px">
    <GoodsItem :goodList="goodList"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "../../components/GoodsItem.vue";
export default {
  props: ["goodList"],
  components: {
    GoodsItem,
  },
};
</script>

<style></style>
