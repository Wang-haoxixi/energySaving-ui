<template>
  <div class="search-preparation">
    <el-card class="search-box" shadow="always">
      <el-form @submit.native.prevent :model="searchForm" class="classify-item">
        <el-form-item class="input-box">
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchForm.name"
            :placeholder="`搜索关键词`"
            @keyup.enter.native="handleSearch"
            :maxlength="50"
          >
            <el-button class="search-btn" type="primary" slot="append" @click="handleSearch">搜索</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="activity-classify">
      <Category
        @handleSearch="handleSearch"
        :categoryOption="categoryOption"
        :searchForm="searchForm"
        :typeName="typeName"
      ></Category>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import Category from "./Category";
class ActivitySearchDTO {
  type = null;
  category = null;
  cityId = null;
  name = "";
}
export default {
  name: "SearchFilter",
  mixins: [mixins],
  props: ["name", "total", "categoryOption", "typeName"],
  components: {
    Category,
  },
  data() {
    return {
      isRoute: true,
      searchForm: new ActivitySearchDTO(),
    };
  },
  created() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { current, size, ...newForm } = this.$route.query;
    this.searchForm = this.$mergeByFirst(new ActivitySearchDTO(), newForm);
    this.$emit("search-page", this.searchForm);
  },
  methods: {
    handleSearch(item, prop) {
      prop && (this.searchForm.category = null);
      prop && (this.searchForm[prop] = item.id);
      this.$emit("search-page", this.searchForm);
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb-wrapper {
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  display: flex;
  align-items: center;
  font-size: 14px;
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
.el-breadcrumb__inner strong {
  font-weight: 400;
  color: $--color-primary;
}
.activity-classify,
.search-box {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  font-size: 14px;
  background: none;
  border-radius: 10px;
  z-index: 100;
  box-sizing: border-box;
}
.search-box {
  width: 800px;
}
.activity-classify {
  border: 0;
  & > div {
    margin-bottom: 20px;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    color: $--color-text-regular;
  }
  .classify-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .classify-con {
    display: inline-block;
    vertical-align: top;
    margin-left: 15px;
    max-width: 95%;
    & > span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
      padding: 0 20px;
      height: 28px;
      line-height: 28px;
      border-radius: 5px;
      color: $--color-text-secondary;
      cursor: pointer;
      i {
        font-size: 12px;
        color: $--color-text-secondary;
      }
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
    .active {
      border-color: $--color-primary;
      background-color: $--color-primary;
      color: #fff;
    }
    .tag {
      padding: 6px 10px;
      background-color: #fff;
      border: 1px solid $--border-color;
      border-radius: 4px;
      i {
        margin-left: 5px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
.search-box {
  margin: -40px auto 20px;
  background-color: #fff;
  .classify-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}

.search-box ::v-deep {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-card__body {
    margin: 0 auto;
    padding: 0;
    width: 760px;
  }
  .el-input__inner {
    width: 690px;
    height: 40px;
    font-size: 16px;
    text-indent: 30px;
    border-radius: 10px 0 0 10px;
    &:focus {
      border-color: $--border-color;
      box-shadow: 12px 0 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  i {
    margin-left: 5px;
    font-size: 22px;
  }
  .search-btn {
    width: 70px;
    height: 40px;
    font-size: 16px;
    border-radius: 0 10px 10px 0;
  }
  .el-button--primary {
    border-color: $--color-primary;
    background-color: $--color-primary;
    color: #fff;
    &:hover {
      opacity: 0.7;
    }
  }
}
.activity-classify ::v-deep .el-form-item {
  margin-left: 20px;
  margin-bottom: 0;
  .line {
    text-align: center;
  }
}
.el-card {
  padding: 20px;
  width: 800px;
  height: 80px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
