<template>
  <div class="pay">
    <div class="curmb">
      <Curmb></Curmb>
    </div>
    <div class="orderinfo">
      <span><i class="iconfont icon-queren"></i></span>
      <span>订单提交成功！请尽快完成支付。</span>
      <span
        >应付金额：<b style="font-size: 20px; color: #cf4444"
          >￥{{ totalMoney }}</b
        ></span
      >
    </div>
    <div class="paytype">
      <span class="title">请选择支付方式付款</span>
      <div class="band">
        <span>支付平台</span>
        <div class="style">
          <a href="javascript:;"></a>
          <a :href="url" target="_blank" @click="pay"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getListById } from "../../api/pay";
import Curmb from "../../components/Curmb.vue";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取订单价格信息
    const totalMoney = ref(null);
    const url = ref(null);
    const route = useRoute();
    const router = useRouter();
    const getinfo = async () => {
      const { data } = await getListById(route.params.id);
      totalMoney.value = data.result.totalMoney;
      url.value = `https://apipc-xiaotuxian-front.itheima.net/pay/aliPay?orderId=${route.params.id}&redirect=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Fpay%2Fcallback`;
    };

    // 跳转付款界面
    const pay = () => {
      ElMessage({
        message: "请完成对应支付流程",
        type: "info",
      });
      router.push({ path: "/cart" });
    };
    onMounted(() => {
      getinfo();
    });
    return {
      totalMoney,
      url,
      pay,
    };
  },
  components: {
    Curmb,
  },
};
</script>
<style lang="scss" scoped>
.pay {
  // width: 100%;
  padding: 20px 140px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .paytype {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-left: 30px;
    box-sizing: border-box;
    > .title {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #f5f5f5;
    }
    .band {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      > span {
        margin-bottom: 20px;
      }
      > .style {
        display: flex;
        > a {
          width: 150px;
          height: 50px;
          margin-right: 16px;
          border: 1px solid #e4e4e4;
          &:hover {
            border-color: #1dc779;
          }
          &:nth-child(1) {
            background: url("../../assets/img/weixin.jpg") no-repeat 50% /
              contain;
          }
          &:nth-child(2) {
            background: url("../../assets/img/alipay.png") no-repeat 50% /
              contain;
          }
        }
      }
    }
  }
  .orderinfo {
    flex: 1;
    height: 240px;
    padding: 80px 80px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    align-items: center;
    > span {
      font-size: 20px;
      > i {
        font-size: 70px;
        color: #1dc779;
      }
      &:nth-child(2) {
        flex: 1;
        margin-left: 16px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
}
</style>