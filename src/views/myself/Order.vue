<template>
  <div class="order">
    <div class="tablist">
      <ul>
        <li
          v-for="(item, index) in tabshow"
          @click="tabClick(index)"
          :class="{ checked: active == index }"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="orderlist">
      <OrderCard
        :orderList="item"
        v-for="(item, index) in orderList"
        :key="index"
      ></OrderCard>
    </div>
    <div class="pagenav">
      <PageNav :count="count" @changepage="chpage"></PageNav>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getAllOrderList } from "../../api/order";
import OrderCard from "../../components/OrderCard.vue";
import PageNav from "./PageNav.vue";
import { inject, onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // tabClick侧边栏点击
    const active = ref(0);
    const tabClick = async (index) => {
      active.value = index;
      page.value = 1;
      const {
        data: { result },
      } = await getAllOrderList({ page: page.value, orderState: active.value });
      count.value = result.counts;
      orderList.value = result.items;
    };

    // 展现方式替换
    const tabshow = ref([
      "全部订单",
      "待付款",
      "待发货",
      "待收货",
      "待评价",
      "已完成",
      "已取消",
    ]);

    //获取订单列表
    const orderList = ref(null);
    const page = ref(1);
    const count = ref(0);
    const getOrderList = async () => {
      const {
        data: { result },
      } = await getAllOrderList({ page: page.value, orderState: active.value });
      count.value = result.counts;
      orderList.value = result.items;
    };
    const chpage = (val) => {
      page.value = val;
      getOrderList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    const changeIndex = inject("changeIndex");

    onMounted(() => {
      getOrderList();
      changeIndex("1_0");
    });
    return {
      active,
      tabshow,
      page,
      count,
      orderList,
      tabClick,
      chpage,
    };
  },
  inject: ["changeIndex"],
  components: {
    OrderCard,
    PageNav,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.order {
  background-color: white;
  display: flex;
  flex-direction: column;
  .tablist {
    width: 100%;
    > ul {
      width: 100%;
      display: flex;
      > li {
        height: 58px;
        width: 110px;
        text-align: center;
        line-height: 58px;
        color: #333;
        border: 1px solid #f5f5f5;
        &.checked {
          border-top: 2px solid #27ba9b;
          border-bottom: 0;
        }
      }
    }
  }
  .orderlist {
    width: 100%;
  }
  .pagenav {
    width: 100%;
  }
}
</style>