<template>
  <div class="black-wrapper" v-loading="loading">
    <template v-if="blackList.length">
      <div class="search-box">
        <el-input v-model="name" placeholder="请输入关键词" clearable @keyup.enter.native="handleSearch"></el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <el-card
        shadow="never"
        v-infinite-scroll="handleLoad"
        style="overflow:auto"
        :body-style="{maxHeight:'350px',minHeight:'70px'}"
        class="iep-basic-scroll"
      >
        <div class="item-box" v-for="item of blackList" :key="item.userId">
          <div class="info">
            <iep-img class="image" :src="item.avatar"></iep-img>
            <div class="txt">
              <div class="name">{{item.realName}}</div>
              <!--<div class="position"></div>-->
            </div>
          </div>
          <el-button @click="handleRemove(item.userId)">删除</el-button>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
import { getBlackList, removeBlackList } from "@/api/admin/block";
class SearchForm {
  size = 10;
  current = 1;
  realName = "";
}
export default {
  data() {
    return {
      blackList: [],
      name: "",
      searchForm: new SearchForm(),
      loading: false,
      isAll: false,
    };
  },
  methods: {
    async loadPage(searchForm = this.searchForm) {
      this.loading = true;
      const { data } = await getBlackList(searchForm);
      if (data) {
        if (data.records.length) {
          this.blackList.push(...data.records);
          this.searchForm.current += 1;
        } else {
          this.isAll = true;
        }
      }
      this.loading = false;
    },
    async handleRemove(id) {
      this.loading = true;
      const data = await removeBlackList(id);
      if (data) {
        const index = this.blackList.findIndex(item => {
          return item.userId === id;
        });
        this.blackList.splice(index, 1);
      }
      this.loading = false;
    },
    handleLoad() {
      if (!this.loading && !this.isAll) {
        this.loadPage();
      }
    },
    handleSearch() {
      this.searchForm = new SearchForm();
      this.searchForm.realName = this.name;
      this.blackList = [];
      this.loadPage();
    },
  },
  mounted() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.black-wrapper {
  padding: 20px 0;
  width: 70%;
  .search-box {
    display: flex;
    margin-bottom: 15px;
    .el-button {
      margin-left: 10px;
      padding: 0 20px;
    }
  }
  .item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .info {
      display: flex;
      .image {
        width: 40px;
        height: 40px;
        border: 1px solid $--border-color;
      }
      .txt {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
        // .name {
        //   font-size: 14px;
        // }
        .position {
          color: $--color-text-secondary;
        }
      }
    }
    .el-button {
      padding: 0 10px;
      height: 28px;
      font-size: 14px;
      text-align: center;
      border-radius: $--small-border-radius;
      border-color: $--color-primary;
      color: $--color-primary;
      &:hover {
        background: $--color-primary;
        color: #ffffff;
      }
    }
  }
}
</style>