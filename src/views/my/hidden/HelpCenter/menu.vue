<template>
  <el-col class="sub-menu-left" :span="4">
    <div class="head">问题分类</div>
    <el-menu
      :default-active="selectType"
      class="menu-vertical"
      @open="nemuOpen"
      @close="nemuColse"
      unique-opened
    >
      <div v-for="(item, index) in catalogList" :key="index" class="menu-div">
        <el-submenu :index="index+''" v-if="item.subType && item.subType.length > 0">
          <template slot="title">
            <div
              class="item-tpl"
              style="padding-right: 25px;"
              v-on:mouseover="settingIndex=item.id"
              v-on:mouseout="settingIndex=-1"
            >
              <div class="item-name">{{item.typeName}}</div>
            </div>
          </template>
          <el-menu-item :index="child.id + ''" v-for="(child, i) in item.subType" :key="i">
            <div
              class="item-tpl"
              v-on:mouseover="settingIndex=child.id"
              v-on:mouseout="settingIndex=-1"
            >
              <div class="item-name" @click="catalogSelect(child)">{{child.typeName}}</div>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="index+''" v-else @click="nemuOpen(index)">
          <span slot="title">{{item.typeName}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-col>
</template>

<script>
import { getQuestionTypeTree } from "@/api/ims/questionType";

export default {
  components: {},
  data() {
    return {
      bodyStyle: {
        padding: 0,
        minHeight: "400px",
      },
      selectType: "0",
      catalogList: [],
      settingIndex: -1,
    };
  },
  methods: {
    async loadPage() {
      const { data } = await getQuestionTypeTree();
      this.catalogList = data || [];
      if (data.length) this.catalogSelect(data[0]);
    },
    catalogSelect(val) {
      this.$emit("load_page", val);
    },
    nemuOpen(index) {
      this.$emit("load_page", this.catalogList[index]);
    },
    nemuColse(index) {
      this.$emit("load_page", this.catalogList[index]);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.sub-menu-left {
  width: 100%;
  padding-left: 100px;
  .head {
    margin-bottom: 20px;
    padding-left: 20px;
    width: 180px;
    height: 38px;
    font-size: 16px;
    line-height: 38px;
    background: $--background-color;
    color: #313033;
    border-radius: 10px;
  }
  ::v-deep .el-submenu {
    color: $--color-text-regular;
  }
  .sub-card {
    width: 100%;
    .clearfix {
      display: flex;
      align-items: center;
      .title {
        flex: 1;
        font-size: 18px;
      }
      i {
        cursor: pointer;
      }
    }
  }
  .menu-vertical {
    .item-tpl {
      display: flex;
      .item-name {
        flex: 1;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        line-height: 20px;
      }
    }
    .menu-div ::v-deep > .el-menu-item {
      margin: 0;
      padding: 13px 0 !important;
      height: 46px;
      span {
        padding-left: 20px;
        display: block;
        position: relative;
      }
      &:hover {
        span {
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            content: "";
            width: 4px;
            background: none;
            border-radius: 2px;
            background-color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.sub-menu-left ::v-deep .el-card__header {
  padding: 4px 20px;
  height: 20px;
  line-height: 20px;
  border: 0;
}
.sub-menu-left ::v-deep .el-submenu__title,
.sub-menu-left ::v-deep .el-menu-item {
  height: 20px;
  line-height: 20px;
}
.sub-menu-left ::v-deep .el-submenu__title {
  position: relative;
  i {
    margin-top: -9px;
    font-size: 18px;
  }
}
.sub-menu-left ::v-deep .el-submenu__title::after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  content: "";
  width: 4px;
  background: none;
  border-radius: 2px;
}
.sub-menu-left ::v-deep .el-submenu:hover .el-submenu__title::after {
  background-color: $--color-primary;
}
.sub-menu-left ::v-deep .el-submenu:hover > .el-submenu__title .item-name {
  color: $--color-primary;
}
.sub-menu-left ::v-deep .el-dropdown {
  top: 0;
}
.sub-menu-left ::v-deep .el-menu {
  border-right: 0;
}
.sub-menu-left ::v-deep .el-menu-item {
  margin: 20px 0;
}
.sub-menu-left ::v-deep .el-menu-item:last-child {
  margin-bottom: 0;
}
</style>
