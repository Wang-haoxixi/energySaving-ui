<template>
  <div class="wrapper">
    <iep-dialog
      class="iep-dialog"
      :dialog-show="dialogShow"
      :append-to-body="true"
      :title="dialogTitle"
      width="500px"
      @close="_close()"
    >
      <el-button class="btn-add" v-if="btnDisabled">
        <i class="el-icon-plus" @click.stop="addparent()"></i>
      </el-button>
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        highlight-current
        @node-click="handleNodeClick"
        ref="tree"
        node-key="id"
        :default-expanded-keys="defalutArray"
        auto-expand-parent
        :expand-on-click-node="true"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.$treeNodeId!==id" class="label-tree" :title="data.label">{{ data.label }}</span>
          <el-input v-if="data.$treeNodeId==id" style="width:200px" v-model="data.label">
            <template slot="append">
              <iep-button type="primary" @click.stop="handleSure">确认</iep-button>
            </template>
          </el-input>
          <div v-if="data.$treeNodeId!==id&&btnDisabled && data.label!='默认分类'" class="position">
            <i
              v-if="node.level < 3&&data.id"
              class="el-icon-plus"
              @click.stop="handlePlus(node,data)"
            ></i>
            <i class="el-icon-edit" @click.stop="handleEdit(node,data)"></i>
            <i class="el-icon-delete" @click.stop="handleDelete(node,data)"></i>
          </div>
        </span>
      </el-tree>
      <div style="text-align:center" slot="footer">
        <el-button
          type="primary"
          class="btn iep-btn-m"
          @click.stop="handleSave"
          :disabled="determine"
          v-if="isSure"
        >确定</el-button>
      </div>
    </iep-dialog>
  </div>
</template>
<script>
import {
  deleteTestDictById,
  addTestDict,
  updateTestDict,
  getTestDictPage,
} from "@/api/qms/test_questions_library";
import selfMixins from "../../const/selfMixin";
export default {
  data() {
    return {
      determine: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogShow: false,
      form: {},
      defalutArray: [2],
      id: "",
      dictId: 0,
      parentId: 0,
      nodeClickData: {},
      index: 0,
      type: 1,
      category: 0,
      cn: [],
      btnDisabled: true,
      addNodeClickData: {},
      addDictId: 0,
      isSure: true,
      parnId: 0,
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "试题分类",
    },
  },
  mixins: [selfMixins],
  computed: {
    groupData() {
      return [
        {
          id: 0,
          name: "全部",
          menuIds: [],
          children: [...this.groupTreeData],
        },
      ];
    },
  },
  methods: {
    handleGenXin() {
      const type = this.type;
      const params = {};
      params.category = type;
      getTestDictPage(params).then((res) => {
        this.$nextTick(() => {
          const data = res.data.children;
          data.children ? data.children : [];
          this.data = data;
          this.dictId = res.data.id;
          this.category = type;
          this.defalutArray = [res.data.children[0].id];
          if (this.nodeClickData.value) {
            this.defalutArray = this.nodeClickData.value
              .split(",")
              .map((i) => Number(i));
          } else {
            const value = `${this.addNodeClickData.value},${this.addDictId}`;
            this.defalutArray = value.split(",").map((i) => Number(i));
          }
        });
      });
    },
    handleNodeClick(node) {
      this.nodeClickData = node;
      if (node.$treeNodeId !== this.id) {
        this.id = "";
      }
      if (node.label === "试卷分类" || node.label === "试题分类") {
        this.determine = true;
      } else {
        this.determine = false;
      }
    },
    handlePlus(node, data) {
      this.addNodeClickData = data;
      this.nodeClickData = data;
      // const level = node.level;
      // const newChild = { label: `新建${level}级分类`, children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // const cn = [];
      // function flatten(arr) {
      //   arr.forEach(ele => {
      //     if (ele.children.length) {
      //       flatten(ele.children);
      //       cn.push(ele);
      //     } else {
      //       cn.push(ele);
      //     }
      //   });
      // }
      // flatten(data.children);
      // cn.map(i => {
      //   if (!i.id) {
      //     this.index++;
      //   }
      // });
      // if (this.index < 1) {
      //   data.children.push(newChild);
      // } else {
      //   this.$message.warning("新增一次只能增加一条");
      // }
      // this.parentId = data.id;
      // this.nodeClickData.parentId = data.id;
      // this.nodeClickData.label = "新建分类";
      // this.defalutArray.push(data.id);
      this.handleSure("", true, data.id, "新建分类");
    },
    addparent() {
      this.handleSure("", true, 0, "新建分类", this.parnId);
    },
    handleSure(val, state, id, label, dicId) {
      if (this.label === "默认分类") {
        this.$message.error("不允许输入默认分类！");
        return false;
      }
      this.id = "";
      const params = {
        dictId: dicId || this.dictId,
        label: label || this.nodeClickData.label,
        id: this.nodeClickData.id ? this.nodeClickData.id : null,
        parentId:
          id === 0 ? 0 : id || this.nodeClickData.parentId || this.parentId,
      };
      if (this.nodeClickData.id && !state) {
        // 编辑
        updateTestDict(params)
          .then((res) => {
            if (res.data) {
              this.handleGenXin();
            } else {
              this.handleGenXin();
            }
          })
          .catch((err) => {
            throw err;
          });
      } else {
        // 新增
        addTestDict(params)
          .then((res) => {
            if (res.data) {
              this.index = 0;
              this.addDictId = res.data;
              this.handleGenXin();
            } else {
              this.index = 0;
              this.handleGenXin();
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    },
    handleEdit(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      const id = children[index].$treeNodeId;
      this.nodeClickData = data;
      this.id = id;
    },
    handleDelete(node, data) {
      this.$confirm(`是否删除${data.label}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        if (data.id) {
          const dataFlag = await deleteTestDictById(data.id, this.category);
          if (dataFlag.code === 0) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex((d) => d.label === data.label);
            children.splice(index, 1);
            this.nodeClickData = data;
            this.handleGenXin();
          }
        } else {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.label === data.label);
          children.splice(index, 1);
          this.index = 0;
        }
      });
    },
    check() {},
    handleSave() {
      const selectString =
        this.nodeClickData.value || this.defalutArray.join(",");
      const selectArray = this.nodeClickData.value
        ? this.nodeClickData.value.split(",").map((i) => Number(i))
        : this.defalutArray;
      const cn = this.saveFlatten(this.cn, this.data);
      const selectCn = this.dealCn(cn, selectArray);
      const emitJson = {};
      emitJson.selectString = selectString;
      emitJson.selectArray = selectArray;
      emitJson.selectCn = selectCn;
      this.$emit("save", emitJson);
      this._close();
    },
    _close() {
      this.data = [];
      this.index = 0;
      this.defalutArray = [];
      this.cn = [];
      this.dialogShow = false;
    },
    close() {
      this.content = "";
      this._close();
    },
  },
  watch: {
    defalutArray(val) {
      if (val.length) {
        this.$nextTick(() => {
          this.$refs["tree"].setCurrentKey(val[val.length - 1]);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.label-tree {
  width: 200px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iep-dialog ::v-deep .el-input__inner {
  margin-top: 6px;
  height: 25px;
}
.iep-dialog ::v-deep .el-tree-node__content {
  height: 35px;
}
.title {
  margin-bottom: 15px;
}
.btn {
  margin-top: 20px;
}
.custom-tree-node {
  position: relative;
  .position {
    position: absolute;
    right: -160px;
    top: 0px;
    i {
      width: 25px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
::v-deep .el-tree-node {
  background: none;
  .el-tree-node__content {
    border-radius: 10px;
    background-color: #fff;
    &:hover,
    &:focus,
    &:focus-within,
    &:visited,
    &:active {
      background-color: $--custom-menu-background-color;
      color: $--color-primary;
      .el-tree-node__expand-icon {
        color: $--color-primary;
      }
    }
  }
}
.btn-add {
  margin-bottom: 20px;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}
::v-deep .el-input-group {
  position: relative;
}
::v-deep .el-input-group__append {
  position: absolute;
  top: 0;
  right: 1px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 100%;
  background: none;
  .el-button {
    height: 34px;
  }
}
::v-deep .el-input__inner {
  border-radius: 10px;
}
</style>
