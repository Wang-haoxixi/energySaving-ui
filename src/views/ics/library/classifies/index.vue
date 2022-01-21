<template>
  <el-col class="sub-menu-left" :span="4">
    <el-card class="sub-card" shadow="never" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <div class="title">分类</div>
        <el-button @click="handleCreate(0)">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
      <el-menu
        :default-active="selectType"
        class="menu-vertical"
        @select="catalogSelect"
        @open="nemuOpen"
        @close="nemuColse"
        unique-opened
      >
        <el-submenu :index="index+''" v-for="(item, index) in catalogList" :key="index">
          <template slot="title">
            <div
              class="item-tpl"
              style="padding-right: 25px;"
              v-on:mouseover="settingIndex=item.id"
              v-on:mouseout="settingIndex=-1"
            >
              <div class="item-name">{{item.typeName}}</div>
              <el-dropdown size="medium" v-show="settingIndex===item.id" slot="reference">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="handleCreate(item.id)">添加子目录</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleUpdate(item)">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleUp(item)" v-if="index !== 0">上移</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleDown(item)" v-if="index !== catalogList.length - 1">下移</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleDelete(item)">删除该分类</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
          <el-menu-item :index="child.id + ''" v-for="(child, i) in item.subType" :key="i">
            <div
              class="item-tpl"
              v-on:mouseover="settingIndex=child.id"
              v-on:mouseout="settingIndex=-1"
            >
              <div class="item-name">{{child.typeName}}</div>
              <el-dropdown size="medium" v-show="settingIndex===child.id" slot="reference">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="handleUpdate(child)">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleUp(child)" v-if="i !== 0">上移</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleDown(child)" v-if="i !== item.subType.length - 1">下移</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleDelete(child)">删除该分类</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-card>

    <formTpl ref="form" @load_page="loadPage"></formTpl>
  </el-col>
</template>

<script>
import {
  getQuestionTypeTree,
  deleteQuestionType,
  questionMoveUp,
  questionMoveDown,
} from "@/api/ims/questionType";
import formTpl from "./form";

export default {
  components: { formTpl },
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
    loadPage() {
      getQuestionTypeTree({ getForAdmin: true }).then(({ data }) => {
        this.catalogList = data || [];
        if (this.catalogList.length > 0) {
          this.$emit("load_list", this.catalogList);
        }
      });
    },
    handleCreate(id = 0) {
      this.$refs["form"].open("create", { parentTypeId: id });
    },
    catalogSelect(val) {
      this.$emit("load_page", true, val);
    },
    nemuOpen(index) {
      this.$emit("load_page", true, this.catalogList[index].id);
    },
    nemuColse(index) {
      this.$emit("load_page", true, this.catalogList[index].id);
    },
    handleUpdate(row) {
      this.$refs["form"].open("update", row);
    },
    handleDelete(row) {
      this.$confirm("是否确认删除该分类？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteQuestionType({
            id: row.id,
          }).then(({ data }) => {
            if (data) {
              this.$message.success("删除成功！");
              this.loadPage();
            } else {
              this.$message.error("删除失败，请重试！");
            }
          });
        })
        .catch(() => {});
    },
    handleUp(row) {
      questionMoveUp({ id: row.id }).then(({ data }) => {
        if (data) {
          this.loadPage();
        }
      });
    },
    handleDown(row) {
      questionMoveDown({ id: row.id }).then(({ data }) => {
        if (data) {
          this.loadPage();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-menu-left {
  width: 100%;
  .sub-card {
    width: 100%;
    .clearfix {
      display: flex;
      align-items: center;
      .title {
        flex: 1;
        font-size: 16px;
      }
      i {
        cursor: pointer;
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
          // width: 100%;
        }
        i {
          line-height: 20px;
        }
      }
    }
  }
}
</style>

<style scoped>
.sub-menu-left >>> .el-card__header {
  padding: 4px 20px;
  height: 42px;
  line-height: 42px;
  border: 0;
}
.sub-menu-left >>> .el-submenu__title,
.sub-menu-left >>> .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.sub-menu-left >>> .el-dropdown {
  top: -5px;
}
.sub-menu-left >>> .el-menu {
  border-right: 0;
}
</style>
