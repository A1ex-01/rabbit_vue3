<template>
  <div class="main">
    <div class="warp">
      <div class="tab">
        <span :class="{ checked: active == 0 }" @click="setActive(0)"
          >账户登录</span
        >
        <span :class="{ checked: active == 1 }" @click="setActive(1)"
          >扫码登录</span
        >
      </div>
      <div class="msg" v-if="account">
        <i class="iconfont icon-user"></i>

        <span @click="setAccount">使用短信登录</span>
      </div>
      <div class="msg" v-else>
        <i class="iconfont icon-user"></i>
        <span @click="setAccount">使用账号登录</span>
      </div>
      <div class="formshow" v-if="account">
        <el-form>
          <el-form-item>
            <div class="acid">
              <el-input
                v-model="input1"
                placeholder="请输入账号"
                class="input-with-select"
              >
                <template #prepend>
                  <el-button class="iconfont icon-user" />
                </template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="psw">
              <el-input
                type="password"
                v-model="input2"
                placeholder="请输入密码"
                class="input-with-select"
              >
                <template #prepend>
                  <el-button class="iconfont icon-lock" />
                </template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="formshow" v-else>
        <el-form>
          <el-form-item>
            <div class="acid">
              <el-input
                placeholder="请输入手机号"
                v-model="phoneLoginForm.mobile"
                class="input-with-select"
              >
                <template #prepend>
                  <el-button class="iconfont icon-shouji" />
                </template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="psw">
              <el-input
                placeholder="请输入验证码"
                v-model="phoneLoginForm.code"
                class="input-with-select"
              >
                <template #prepend>
                  <el-button class="iconfont icon-anquan" />
                </template>
                <template #append>
                  <el-button type="info" @click="getFormCode">{{
                    getCodeText
                  }}</el-button>
                </template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="attent">
        <el-checkbox
          label="我已同意《隐私条款》和《服务条款》 "
          checked
        ></el-checkbox>
      </div>
      <div class="send" @click="login">登录</div>
      <div class="bottom">
        <img src="../../assets/img/QQ.png" alt="" />
        <div>
          <span>忘记密码</span>
          <span>免费注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { getCode } from "@/api/login";
import { onBeforeUnmount } from "@vue/runtime-core";
// import { mapActions } from "vuex";
export default {
  setup() {
    // 登录方式切换
    const account = ref(true);
    const setAccount = () => {
      account.value = !account.value;
    };
    const codeStatus = ref(false);
    const getCodeText = ref("获取验证码");
    // 登录
    const active = ref(0);
    const input1 = ref("19170217409");
    const input2 = ref("");
    const setActive = (index) => {
      active.value = index;
      if (index == 1) {
        ElNotification({
          title: "提示",
          type: "warning",
          message: "该功能无法使用",
        });
      }
    };
    // 手机登录
    const phoneLoginForm = ref({
      mobile: "",
      code: "",
    });
    // 定时器
    let inv;
    // 获取手机验证码
    const getFormCode = () => {
      if (!phoneLoginForm.value.mobile) {
        return ElMessage({ message: "手机号为空" });
      } else {
        codeStatus.value = true;
        let time = 59;
        inv = setInterval(() => {
          getCodeText.value = `${time}秒后发送`;
          time--;
          if (time === 0) {
            getCodeText.value = "获取验证码";
            clearInterval(inv);
          }
        }, 1000);
        getCode({ mobile: phoneLoginForm.value.mobile });
      }
    };
    onBeforeUnmount(() => {
      clearInterval(inv);
    });
    // 提交登录
    const store = useStore();
    const login = () => {
      if (account.value) {
        if (!input1.value || !input2.value) {
          ElMessage({
            message: "账号或密码不能为空",
            type: "warning",
          });
        } else {
          store.dispatch("login/sendInfoToIndex", {
            account: input1.value,
            password: input2.value,
          });
        }
      } else {
        // 手机登录
        if (!phoneLoginForm.value.mobile || !phoneLoginForm.value.code)
          return ElMessage({
            message: "手机号或验证码为空",
            type: "warning",
          });
        if (!codeStatus.value)
          return ElMessage({
            message: "请获取验证码",
            type: "warning",
          });
        store.dispatch("login/sendInfoToIndexByCode", phoneLoginForm.value);
      }
    };
    return {
      active,
      account,
      getCodeText,
      input1,
      input2,
      setActive,
      setAccount,
      login,
      getFormCode,
      phoneLoginForm,
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 448px;
  background: url("../../assets/img/banner.png") no-repeat 50% / cover;
  position: relative;
  .warp {
    position: absolute;
    right: 290px;
    top: 0;
    margin: auto 0;
    width: 380px;
    bottom: 0;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .bottom {
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      > img {
        width: 50px;
      }
      span {
        font-size: 14px;
        color: #999;
        &:nth-child(1) {
          margin-right: 5px;
        }
      }
    }
    .send {
      width: calc(100% - 80px);
      text-align: center;
      height: 40px;
      margin: 0 auto;
      font-size: 16px;
      background-color: #27ba9b;
      line-height: 40px;
      color: white;
      border-radius: 5px;
      margin-top: 15px;
    }
    .attent {
      padding: 0 40px;
      box-sizing: border-box;
    }
    .formshow {
      padding: 0px 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .acid,
      .psw {
        display: flex;
        width: 100%;
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
          background-color: #f5f5f5;
          width: 90px;
          text-align: center;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          color: #666;
        }
        span {
          font-size: 18px;
          color: white;
          background-color: #cfcdcd;
          width: 40px;
          flex-shrink: 0;
          margin-right: -3px;
          margin-top: 0.5px;
          z-index: 1;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          text-align: center;
          line-height: 40px;
          height: 40px;
        }
        > div {
          width: 100%;
          .el-input {
            width: 100%;
            margin-bottom: 12px;
          }
        }
      }
    }
    .tab {
      display: flex;
      height: 55px;
      width: 100%;
      padding: 0px 40px;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      span {
        width: 50%;
        height: 18px;
        font-weight: bold;
        font-size: 18px;
        text-align: right;
        &:nth-child(1) {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.checked {
          color: #27ba9b;
        }
      }
    }
    .msg {
      width: 100%;
      margin: 20px 0;
      padding: 0px 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: #27ba9b;
      > span {
        line-height: 18px;
        margin-left: 2px;
      }
    }
  }
}
.iconfont {
  font-size: 20px;
}

::v-deep .el-input__inner {
  height: 40px;
}
</style>
