<template>
  <div class="seach">
    <div class="dropdown">
      <!-- 类型 -->
      <div class="type dropdown-item">
        <el-dropdown class="org-dropdown">
          <span class="el-dropdown-link">
            类型：{{typeName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in dictMaps.type"
              :key="index"
              @click.native="handleSeach(item, 'type')"
            >{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 状态 -->
      <div class="state dropdown-item">
        <el-dropdown class="org-dropdown">
          <span class="el-dropdown-link">
            状态：{{stateName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in dictMaps.state"
              :key="index"
              @click.native="handleSeach(item, 'state')"
            >{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <iep-operation-search
      @search-page="searchPage"
      :paramForm="paramForm"
      advance-search
      prop="name"
    ></iep-operation-search>
  </div>
</template>

<script>
import { initSearchForm, searchDictMaps } from "./options";

export default {
  data() {
    return {
      dictMaps: searchDictMaps,
      paramForm: initSearchForm(),
      typeName: searchDictMaps.type[0].label,
      stateName: searchDictMaps.state[1].label,
    };
  },
  methods: {
    searchPage(val = this.paramForm) {
      const obj = Object.assign({}, this.paramForm, val);
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
    handleSeach(row, type) {
      this[`${type}Name`] = row.label;
      this.paramForm[type] = row.value;
      this.searchPage();
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.seach {
  display: flex;
  justify-content: space-between;
  .dropdown {
    display: flex;
    .dropdown-item {
      line-height: 36px;
      margin-right: 20px;
      .el-dropdown-link {
        cursor: pointer;
      }
    }
  }
}
</style>
