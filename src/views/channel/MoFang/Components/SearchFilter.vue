<template>
  <div class="search-preparation">
    <el-card class="search-box" shadow="always">
      <el-form @submit.native.prevent :model="searchForm" class="classify-item">
        <el-form-item class="input-box">
          <el-input
            prefix-icon="el-icon-search"
            v-model="searchForm.name"
            :placeholder="`搜索${name}名称`"
            @keyup.enter.native="handleSearch"
            :maxlength="50"
          >
            <el-button class="search-btn" type="primary" slot="append" @click="handleSearch">搜索</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="product-classify">
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/channel/mo_fang' }">魔方</el-breadcrumb-item>
          <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
          <el-breadcrumb-item>
            共
            <strong>{{total}}</strong>个结果
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
class ProductSearchDTO {
  type = "";
  category = "";
  name = "";
}
export default {
  mixins: [mixins],
  props: ["name", "total", "categoryOption", "typeName"],
  components: {
    Category,
  },
  data() {
    return {
      isRoute: true,
      searchForm: new ProductSearchDTO(),
    };
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { current, size, ...newForm } = this.$route.query;
    this.searchForm = this.$mergeByFirst(new ProductSearchDTO(), newForm);
    this.$emit("search-page", this.searchForm);
  },
  methods: {
    handleSearch(item, prop) {
      prop && (this.searchForm.category = "");
      prop && (this.searchForm[prop] = String(item.id));
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
.product-classify,
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
.product-classify {
  margin-bottom: 30px;
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
    margin-left: -20px;
    padding: 0;
  }
  .el-input__inner {
    width: 670px;
    height: 40px;
    font-size: 14px;
    text-indent: 10px;
    border-radius: 10px;
    &:focus {
      border-color: $--border-color;
      box-shadow: 12px 0 12px 0 $--background-color;
    }
  }
  i {
    font-size: 18px;
  }
  .search-btn {
    margin-left: 10px;
    width: 80px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    border-radius: 10px;
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
.product-classify ::v-deep .el-form-item {
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
::v-deep .el-input-group__append {
  padding: 0;
  background: #fff;
}
</style>
