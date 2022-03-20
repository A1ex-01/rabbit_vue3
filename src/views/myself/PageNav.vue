<template>
  <div class="pagenav">
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="count"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  setup(prop, { emit }) {
    const handleCurrentChange = (val) => {
      emit("changepage", val);
    };
    return {
      handleCurrentChange,
    };
  },
  props: ["count"],
};
</script>
<style lang="scss" scoped>
.pagenav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 30px;
}
</style>