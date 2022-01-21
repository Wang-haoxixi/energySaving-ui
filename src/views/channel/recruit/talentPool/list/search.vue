<template>
  <div class="search">
    <div class="search-input">
      <el-input
        v-model="searchForm.name"
        class="input"
        @keyup.enter.native="handleSubmit"
        placeholder="请输入行业关键字进行搜索"
      ></el-input>
      <el-button class="button" type="primary" @click="handleSubmit">搜索</el-button>
    </div>
    <div class="select-list">
      <div class="select-content">
        <div class="select-item">
          <CascaderCity v-model="searchForm.workPlace"></CascaderCity>
        </div>
        <div class="select-item" v-for="item in conditionList" :key="item.attribute">
          <PopoverTpl :option="item" v-model="searchForm[item.attribute]"></PopoverTpl>
        </div>
      </div>
      <div class="select-delete">
        <i class="el-icon-delete" @click="handleClear"></i>
      </div>
    </div>
  </div>
</template>

<script>
import CascaderCity from "./components/CascaderCity/index";
import PopoverTpl from "./components/popover/index";
import { getTalentPoolCondition } from "@/api/dms/recruit_query";
import { initSearchForm } from "./options";

export default {
  components: { CascaderCity, PopoverTpl },
  data() {
    return {
      conditionList: [],
      searchForm: initSearchForm(),
    };
  },
  methods: {
    getTalentPoolCondition() {
      getTalentPoolCondition().then(({ data }) => {
        this.conditionList = [...data];
      });
    },
    handleSubmit() {
      this.$emit("search", this.searchForm);
    },
    handleClear() {
      this.searchForm = initSearchForm();
    },
  },
  created() {
    this.getTalentPoolCondition();
  },
};
</script>

<style lang="scss" scoped>
.search {
  border-radius: $--border-radius-base;
  padding: 20px;
  background-color: #fff;
  .search-input {
    display: flex;
    justify-content: space-between;
    .input {
      width: calc(100% - 90px);
    }
    .button {
      width: 80px;
      text-align: center;
    }
  }
  .select-list {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    .select-content {
      width: calc(100% - 40px);
      display: flex;
      justify-content: space-between;
      .select-item {
        width: calc(100% / 3);
      }
    }
    .select-delete {
      i {
        color: $--color-text-secondary;
        cursor: pointer;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
