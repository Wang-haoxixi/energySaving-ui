<template>
  <div class="header-search-box">
    <el-input placeholder="请输入搜索关键词" v-model="name" class="input-with-select">
      <el-select v-model="type" slot="prepend" class="select-type">
        <el-option
          v-for="item in searchTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <el-button slot="append" type="primary" @click="handleSearch()">搜索</el-button>
    </el-input>
  </div>
</template>

<script>
import { searchTypeList } from "../options";
export default {
  inject: ["reload"],
  data() {
    return {
      searchTypeList,
      name: "",
      type: "1",
    };
  },
  watch: {
    "$route.params.type": {
      handler: function (v) {
        if (v) {
          this.type = v;
        } else {
          this.type = "1";
        }
      },
      immediate: true,
    },
    "$route.query.name": {
      handler: function (v) {
        if (v) {
          this.name = v;
        } else {
          this.name = "";
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: `/channel/exam/list/${this.type}`,
        query: {
          name: this.name,
        },
      });
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search-box {
  position: relative;
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: -50px auto 50px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 $--background-color;
  border-radius: $--border-radius-base;
  box-sizing: border-box;
  .select-type {
    width: 90px;
  }
  .select-type ::v-deep .el-input__inner {
    padding-left: 0;
  }
  .input-with-select ::v-deep .el-input-group__prepend {
    background-color: #fff;
  }
  .input-with-select ::v-deep .el-input-group__append {
    background-color: $--color-primary;
  }
  .input-with-select ::v-deep .el-input-group__append button.el-button {
    color: #fff;
    width: 80px;
    background-color: $--color-primary;
    border-color: $--color-primary;
  }
}
</style>
