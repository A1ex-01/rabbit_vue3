<template>
  <div class="centrol">
    <div class="title">个人信息</div>
    <div class="base-info" v-if="userInfo">
      <div class="left">
        <el-form :model="userInfo">
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="userInfo.gender" label="男" size="large" border
              >男</el-radio
            >
            <el-radio v-model="userInfo.gender" label="女" size="large" border
              >女</el-radio
            >
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="userInfo.birthday"
              type="date"
              placeholder="Pick a day"
            />
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="userInfo.profession" />
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <div class="img">
          <el-avatar
            @click="changeImg"
            :size="100"
            fit="fill"
            :src="userInfo.avatar"
          />
          <div style="display: none">
            <input
              type="file"
              @change="handleChange"
              :value="myfile"
              ref="input"
            />
          </div>
        </div>
        <div class="ct">我的头像</div>
      </div>
    </div>
    <div class="confirm">
      <el-button type="primary" @click="save">保存修改</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/runtime-core";
import { ElMessage } from "element-plus/lib/components";
import * as dayjs from "dayjs";
import { useStore } from "vuex";
import { updateUserBaseInfo, updateAll, updateImg } from "../../api/update";
const store = useStore();
const userInfo = computed(() => store.state.login.info);
// 保存修改;
const save = async () => {
  await updateUserBaseInfo({
    nickname: userInfo.value.nickname,
    gender: userInfo.value.gender,
    profession: userInfo.value.profession,
    birthday: dayjs(userInfo.value.birthday).format("YYYY-MM-DD"),
  });
  const result = await updateAll({
    account: userInfo.value.account,
    id: userInfo.value.id,
  });
  store.commit("login/update", result.data.result);
  ElMessage({
    message: "修改成功",
    type: "success",
  });
};
// 更新图片
const handleChange = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  // 发起请求
  await updateImg(formData);
  // 更新状态
  const result = await updateAll({
    account: userInfo.value.account,
    id: userInfo.value.id,
  });
  store.commit("login/update", result.data.result);
  ElMessage({
    message: "修改成功",
    type: "success",
  });
};
const myfile = ref(null);
const input = ref(null);
const changeImg = () => {
  input.value.click();
};
</script>

<style scoped lang="scss">
.centrol {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .base-info {
    width: 100%;
    margin-top: 30px;
    display: flex;
    .right {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        margin-bottom: 20px;
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
    }
    .left {
      flex: 1;
    }
  }
}
.confirm {
  margin-top: 20px;
}
</style>
