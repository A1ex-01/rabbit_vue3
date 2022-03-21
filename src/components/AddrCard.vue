<template>
  <div class="addr">
    <div>
      <span
        >收&nbsp;&nbsp;货&nbsp;&nbsp;人：<b>{{ useraddr.receiver }}</b></span
      >
      <span
        >联系方式：<b>{{ filterTelephone(useraddr.contact) }}</b></span
      >
      <span
        >收货地址：<b>{{ useraddr.fullLocation + useraddr.address }}</b></span
      >
      <div class="mask">
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          icon-color="red"
          title="Are you sure to delete this?"
          @confirm="confirmEvent"
          @cancel="cancelEvent"
        >
        <template #reference>
          <i class="iconfont icon-shanchu"></i>
        </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAddr } from "../api/order";
import { ElMessage } from "element-plus";
export default {
  setup(props, { emit }) {
    const filterTelephone = (val) =>
      val.slice(0, 3) + "****" + val.slice(7, 11);
    const confirmEvent = () => {
      deleteAddr(props.useraddr.id);
      ElMessage({
        message: "删除地址成功",
        type: "success",
      });
      emit("deleteAddrAction");
    };
    const cancelEvent = () => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    };
    // const deleteInfo = () => {
    //  $confirm("此操作将永久删除该地址, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       deleteAddr(this.useraddr.id);
    //       ElMessage({
    //         message: "删除地址成功",
    //         type: "success",
    //       });
    //       emit("deleteAddrAction");
    //     })
    //     .catch(() => {
    //       ElMessage({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // };
    return {
      filterTelephone,
      confirmEvent,
      cancelEvent
    };
  },
  props: ["useraddr"],
};
</script>
<style lang="scss" scoped>
@import "../assets/style/icon.scss";
.addr {
  width: 100%;
  height: 150px;
  padding: 12px;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid #f5f5f5;
    position: relative;
    > .mask {
      position: absolute;
      opacity: 0;
      right: 18px;
      top: 50px;
      font-size: 22px;
      color: $base-color;
    }
    &:hover {
      > .mask {
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
    > span {
      flex: 1;
      color: #999;
      > b {
        color: #333;
      }
    }
  }
}
</style>