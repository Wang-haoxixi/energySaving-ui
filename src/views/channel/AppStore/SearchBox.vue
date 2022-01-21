<template>
  <div>
    <div class="search-box">
      <el-form :model="form">
        <el-form-item class="input-box">
          <el-input placeholder="搜索应用名称" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <iep-operation-wrapper>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </iep-operation-wrapper>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { getUOCount } from "@/api/dms/channel";
// import { GLOBAL_SEARCH_OPTIONS } from "@/const/env";
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleSearch() {},
  },
};
</script>
<style lang="scss" scoped>
.search-box ::v-deep .el-input__inner {
  padding-left: 25px;
}
.search-box ::v-deep .el-input__prefix i {
  margin-top: 2px;
}
.search-box {
  position: relative;
  width: 800px;
  margin: auto;
  box-sizing: border-box;
  z-index: 10;
  .el-form {
    position: absolute;
    display: flex;
    width: 100%;
    height: 80px;
    border-radius: 10px;
    line-height: 40px;
    top: -40px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 $--background-color;
    box-sizing: border-box;
  }
}

.search-box ::v-deep .el-input__prefix {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 10px;
}
.search-box ::v-deep .el-icon-search {
  margin-top: 0;
  font-size: 16px;
}
.search-box ::v-deep .input-box .el-input__inner {
  position: relative;
  margin-left: -1px;
  width: 670px;
  height: 40px;
  font-size: 14px;
  border-radius: 10px;
  text-indent: 20px;
}
.search-box ::v-deep .el-button {
  margin-left: 10px;
  min-width: 80px;
  width: 80px;
  height: 40px;
  background-color: #f74437;
  border-color: #f74437;
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
}
.search-box .el-form-item {
  box-shadow: 0 1px 4px rgba(87, 87, 87, 0.08);
}
</style>
