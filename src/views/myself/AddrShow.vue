<template>
  <div class="addr">
    <div class="head">地址管理</div>
    <div class="title">我的地址</div>
    <div class="myaddr">
      <div class="add" @click="addAddrr">添加地址</div>
      <AddrCard
        :useraddr="useraddr[index]"
        v-for="(item, index) in useraddr"
        :key="index"
        @deleteAddrAction="getaddr"
      ></AddrCard>
    </div>
    <div class="dialog">
      <el-dialog title="提示" v-model="dialogVisible" width="50%">
        <div class="main">
          <div class="item" v-for="(item, index) in formData" :key="index">
            <span>{{ item.title }}：</span>
            <el-input v-if="item.title !== '地区'" v-model="item.value">
            </el-input>
            <div class="case" v-else style="width: 300px">
              <el-cascader
                :options="addrList"
                :show-all-levels="false"
                v-model="formData[2].value"
                :props="{ value: 'code', label: 'name', children: 'areaList' }"
              ></el-cascader>
            </div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { createOrder } from "../../api/pay";
import { addAddr } from "@/api/order";
import { addrList } from "../../api/staticData";
import { ElMessage } from "element-plus";
import AddrCard from "../../components/AddrCard.vue";
import { ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
export default {
  setup() {
    // 获取用户地址数据
    const useraddr = ref(null);
    const getaddr = async () => {
      const { data } = await createOrder();
      useraddr.value = data.result.userAddresses;
    };

    //

    // 获取父组件注入的方法
    const changeIndex = inject("changeIndex");

    // 增加地址
    const addAddrr = () => {
      dialogVisible.value = true;
    };
    const confirm = async () => {
      const data = formData.value.filter((item) => {
        if (item.title == "地址标签") {
          return true;
        }
        if (item.title == "手机号") {
          if (item.value.length == 11) {
            return true;
          } else {
            ElMessage({
              message: "手机号不合法",
              type: "warning",
            });
            return false;
          }
        } else {
          return item.value;
        }
      });
      if (data.length === 6) {
        const info = {
          receiver: formData.value[0].value,
          contact: formData.value[1].value,
          provinceCode: formData.value[2].value[0],
          cityCode: formData.value[2].value[1],
          countyCode: formData.value[2].value[2],
          address: formData.value[3].value,
          postalCode: formData.value[4].value,
          addressTags: formData.value[5].value,
          isDefault: 0,
        };
        await addAddr(info);
        await getaddr();
        formData.value.map((item) => {
          item.value = "";
        });
        ElMessage({
          message: "添加地址成功",
          type: "success",
        });
        dialogVisible.value = false;
      } else {
        ElMessage({
          message: "内容不能为空",
          type: "warning",
        });
      }
    };

    // 控制dialog显示隐藏
    const dialogVisible = ref(false);
    const formData = ref([
      { value: "", title: "收货人" },
      { value: "", title: "手机号" },
      { value: "", title: "地区" },
      { value: "", title: "地址" },
      { value: "", title: "邮政编码" },
      { value: "", title: "地址标签" },
    ]);

    onMounted(() => {
      getaddr();
      changeIndex("0_4");
    });
    return {
      useraddr,
      dialogVisible,
      formData,
      addrList,
      changeIndex,
      confirm,
      addAddrr,
      getaddr,
    };
  },
  components: {
    AddrCard,
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/icon.scss";
.addr {
  background-color: white;
  > .myaddr {
    width: 100%;
    > .add {
      display: block;
      width: 140px;
      margin-top: 16px;
      margin-bottom: 20px;
      margin-left: 16px;
      height: 50px;
      border-radius: 5px;
      font-size: 17px;
      color: white;
      text-align: center;
      line-height: 50px;
      background-color: $base-color;
    }
  }
  .title {
    font-size: 18px;
    color: #333;
    width: 100%;
    height: 60px;
    padding: 0 30px;
    box-sizing: border-box;
    line-height: 60px;
    border-bottom: 1px solid #f5f5f5;
  }
  .head {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    padding-left: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
    color: $base-color;
  }
}
.dialog {
  display: flex;
  flex-direction: column;
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    > .item {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        flex-shrink: 0;
        font-size: 16px;
        width: 80px;
        vertical-align: bottom;
        text-align: right;
      }
      > .el-input {
        width: 300px;
      }
      .el-cascader {
        width: 300px;
      }
    }
  }
}
</style>