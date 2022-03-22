<template>
  <div class="show">
    <div class="title">收货地址</div>
    <div class="addr">
      <div class="left">
        <div
          class="info"
          v-if="orderInfo && orderInfo.userAddresses.length != 0"
        >
          <span
            >收 货 人：<b style="color: black">{{
              orderInfo.userAddresses[index].receiver
            }}</b></span
          >
          <span
            >联系方式：<b style="color: black">{{
              filterTelephone(orderInfo.userAddresses[index].contact)
            }}</b></span
          >
          <span
            >收货地址：<b style="color: black">{{
              orderInfo.userAddresses[index].fullLocation
            }}</b></span
          >
        </div>
        <div class="info" v-else>请添加收货地址</div>
        <div class="changeaddr">
          <span>修改地址</span>
        </div>
      </div>
      <div class="right">
        <span @click="tabAddr">切换地址</span>
        <span @click="$router.push({ path: '/member/addr' })">添加地址</span>
      </div>
    </div>
    <div class="title">商品信息</div>
    <div class="orderinfo" v-if="orderInfo">
      <OrderPorductInfo :goods="orderInfo.goods"></OrderPorductInfo>
    </div>
    <div class="title">配送时间</div>
    <div class="time">
      <span :class="{ checked: type_1 == 0 }" @click="type_1 = 0"
        >不限时送货时间：周一至周日</span
      >
      <span :class="{ checked: type_1 == 1 }" @click="type_1 = 1"
        >工作日送货：周一至周五</span
      >
      <span :class="{ checked: type_1 == 2 }" @click="type_1 = 2"
        >双休日、假日送货：周六或周日</span
      >
    </div>
    <div class="title">支付方式</div>
    <div class="paytype">
      <span :class="{ checked: type_2 == 0 }" @click="type_2 = 0"
        >在线支付</span
      >
      <span :class="{ checked: type_2 == 1 }" @click="type_2 = 1"
        >货到付款</span
      >
      <span>货到付款需付五元手续费</span>
    </div>
    <div class="title">金额明细</div>
    <div class="allpriceshow" v-if="orderInfo">
      <div class="allpriceinfo">
        <div
          class="priceitem"
          v-for="(item, index) in allPriceTitle"
          :key="index"
        >
          <span>{{ item.title }}：</span>
          <span :class="{ redprice: index == allPriceTitle.length - 1 }"
            ><b v-if="index != 0">￥</b>{{ orderInfo.summary[item.name]
            }}<b v-if="index == 0">件</b></span
          >
        </div>
      </div>
    </div>
    <div class="confirmorder">
      <span @click="sendOrderBtn">提交订单</span>
    </div>
    <div class="tabaddr">
      <el-dialog
        title="提示"
        v-model="tabAddrDialog"
        width="50%"
        v-if="orderInfo"
      >
        <div
          v-for="(item, i) in orderInfo.userAddresses"
          :key="item.id"
          @click="preIndex = i"
          :class="{ checked: preIndex == i }"
        >
          <AddrCard :useraddr="item"></AddrCard>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="tabAddrDialog = false">取 消</el-button>
            <el-button
              type="primary"
              @click="(tabAddrDialog = false), (index = preIndex)"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { createOrder, sendOrder } from "../../api/pay";
import OrderPorductInfo from "./OrderPorductInfo.vue";
import AddrCard from "../../components/AddrCard.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 过滤手机号中间四位隐藏
    const filterTelephone = (val) =>
      val.slice(0, 3) + "****" + val.slice(val.length - 4, val.length);

    // 获取列表详细信息
    const orderInfo = ref(null);
    const getOrderInfo = async () => {
      const { data } = await createOrder();
      if (data.msg === "操作成功") {
        orderInfo.value = data.result;
      } else {
        ElMessage({
          message: "生成订单失败",
          type: "error",
        });
      }
    };

    // 提交订单
    const tabAddrDialog = ref(false);
    const index = ref(0);
    const preIndex = ref(0);
    const allPriceTitle = ref([
      {
        title: "商品件数",
        name: "goodsCount",
      },
      {
        title: "商品总价",
        name: "totalPrice",
      },
      {
        title: "运费",
        name: "postFee",
      },
      {
        title: "应付金额",
        name: "totalPayPrice",
      },
    ]);
    const type_1 = ref(0);
    const type_2 = ref(0);
    const type_3 = ref(1);
    const router = useRouter();
    const sendOrderBtn = async () => {
      let obj = {};
      let good = [];
      orderInfo.value.goods.map((item) =>
        good.push({ skuId: item.skuId, count: item.count })
      );
      obj.goods = good;
      obj.addressId = orderInfo.value.userAddresses[index.value].id;
      obj.deliveryTimeType = type_1.value + 1;
      obj.payType = type_2.value + 1;
      obj.payChannel = type_3.value;
      obj.buyerMessage = "a1ex";
      const { data } = await sendOrder(obj);
      router.push({ path: "/pay/" + data.result.id });
      if (data.msg === "操作成功") {
        ElMessage({
          message: "提交订单成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "提交订单失败",
          type: "error",
        });
      }
    };

    // 打开dialog
    const tabAddr = () => {
      tabAddrDialog.value = true;
    };

    onMounted(() => {
      getOrderInfo();
    });
    return {
      filterTelephone,
      orderInfo,
      tabAddrDialog,
      index,
      preIndex,
      allPriceTitle,
      type_1,
      type_2,
      type_3,
      sendOrderBtn,
      tabAddr,
    };
  },
  components: {
    OrderPorductInfo,
    AddrCard,
  },
};
</script>
<style lang="scss" scoped>
.show {
  background-color: white;
  padding: 0 20px;
  box-sizing: border-box;
  .confirmorder {
    width: 100%;
    padding: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    > span {
      background-color: #27ba9b;
      color: white;
      width: 180px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
  .orderinfo {
    width: 100%;
  }
  .allpriceshow {
    width: 100%;
    height: 200px;
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #f5f5f5;
    > .allpriceinfo {
      width: 310px;
      height: 100%;
      padding-right: 100px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      > .priceitem {
        height: 50px;
        display: flex;
        justify-content: space-between;
        > .redprice {
          font-size: 18px;
          color: #cf4444;
        }
      }
    }
  }
  .paytype {
    width: 100%;
    height: 50px;
    padding: 20px 0;
    display: flex;
    > span {
      width: 226px;
      height: 48px;
      border: 1px solid #e4e4e4;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      margin-right: 20px;
      &:last-child {
        border: 0;
        color: #999;
      }
    }
  }
  .time {
    width: 100%;
    height: 50px;
    padding: 20px 0;
    display: flex;
    > span {
      width: 226px;
      height: 48px;
      border: 1px solid #e4e4e4;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      margin-right: 20px;
    }
  }
  .title {
    width: 100%;
    height: 70px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
  }
  .addr {
    width: 100%;
    height: 132px;
    margin: 20px 0;
    border: 1px solid #f5f5f5;
    display: flex;
    font-size: 14px;
    .left {
      height: 100%;
      width: 778px;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      > .info {
        width: 618px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > span {
          color: #999;
        }
      }
      .changeaddr {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #27ba9b;
        border-right: 1px solid #f5f5f5;
      }
    }
    .right {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        width: 140px;
        height: 44px;
        border: 1px solid #e4e4e4;
        color: #666;
        font-size: 14px;
        text-align: center;
        line-height: 44px;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
  }
}
.checked {
  border: 1px solid #27ba9b !important;
}
</style>