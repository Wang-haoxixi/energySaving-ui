<template>
  <div>
    <h1>
      <span>你要的</span>
      <span class="iep-red">资源与机会</span>&nbsp;尽在眼前
    </h1>
    <div class="search-box">
      <div class="category-box">
        <div
          v-for="item in typeList"
          :key="item.value"
          class="category"
          :class="{active:type===item.value,[item.name]:true}"
          @click="type=item.value"
        >
          <i class="top"></i>
          <span>{{item.label}}搜索</span>
        </div>
      </div>
      <div class="search-inner">
        <div class="input-box">
          <el-input
            v-show="type==='1'"
            ref="input"
            @keyup.native.enter="handleSearch()"
            placeholder="请输入你要查找的内容"
            v-model="keyword"
            :maxlength="50"
          ></el-input>
          <el-autocomplete
            v-show="type==='2'"
            ref="input"
            v-model="keyword"
            placeholder="请输入你要查找的内容"
            @keyup.native.enter="handleSearch()"
            @select="handleSearch()"
            :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="false"
            :maxlength="8"
          ></el-autocomplete>
          <!-- <div class="hot-keywords"></div> -->
        </div>
        <div class="btn-box">
          <ican-button type="primary" @click="handleSearch()">搜索</ican-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTagPage } from "@/api/tms/tag";

export default {
  data() {
    return {
      keyword: "",
      type: "1",
      typeList: [
        {
          label: "关键词",
          value: "1",
          name: "keyword",
        },
        {
          label: "标签",
          value: "2",
          name: "tag",
        },
      ],
    };
  },
  methods: {
    focus() {
      this.$refs["input"].focus();
      this.keyword = "";
    },
    handleSearch() {
      const form = {
        type: this.type,
        keyword: this.keyword,
      };
      this.$emit("search", form);
    },
    async querySearchAsync(queryString, cb) {
      const results = await getTagPage({ name: queryString });
      const tagList = results.data.records.map(m => {
        return {
          value: m.name,
        };
      });
      cb(tagList);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  width: 800px;
  margin: 0 auto;
  flex-direction: column;
  .category-box {
    margin-left: 30px;
    display: flex;
    align-items: center;
    .category {
      position: relative;
      margin: 0 15px;
      height: 44px;
      font-size: 14px;
      line-height: 44px;
      box-sizing: border-box;
      cursor: pointer;
      color: $--color-text-secondary;
      .top {
        position: absolute;
        left: 50%;
        margin-left: -3px;
        bottom: 20px;
        background: #fff;
        z-index: 1;
        opacity: 0;
        &::after,
        &::before {
          position: absolute;
          content: "";
          border-top: 12px transparent dashed;
          border-left: 6px transparent dashed;
          border-right: 6px transparent dashed;
          border-bottom: 8px #fff solid;
        }
        &::before {
          border-bottom: 8px #eff0f1 solid;
        }
        &::after {
          top: 2px;
          border-bottom: 8px #fff solid;
        }
        span {
          font-size: 14px;
          cursor: pointer;
        }
      }
      &.active {
        font-family: "微软雅黑";
        color: $--color-text-primary;
        .top {
          opacity: 1;
        }
      }
    }
  }
  .search-inner {
    display: flex;
    justify-content: space-between;
  }
  .input-box {
    flex: 1;
    margin: 0 10px 0 30px;
    ::v-deep .el-input-group__prepend {
      width: 80px;
    }
    ::v-deep .el-input input {
      &:hover,
      &:focus,
      &:visited,
      &:active,
      :focus-within {
        border-color: #eff0f1;
      }
    }
    .el-autocomplete {
      width: 100%;
    }
  }
  .btn-box {
    flex: 0 0 80px;
    button {
      width: 80px;
      height: 40px;
    }
  }
}
h1 {
  font-size: 22px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
input::-webkit-input-placeholder {
  color: #babec0;
}
.el-input__inner:focus {
  border-color: #eff0f1;
}
</style>
