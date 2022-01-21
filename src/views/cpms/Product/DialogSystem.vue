<template>
  <iep-dialog :dialog-show="dialogShow" title="系统名称" width="800px" @close="_close()">
    <el-form ref="form" :model="form" label-width="80px" class="iep-form-detail">
      <iep-form-item v-if="step == 1" label-name="系统名称" prop="name">
        <el-input :maxlength="110" v-model="form.name" placeholder="请输入名称"></el-input>
      </iep-form-item>
      <iep-form-item v-if="showUrl && step == 1" label-name="系统地址" :disabled="true" prop="link">
        <el-link :href="currentLink" target="_blank" type="primary">{{currentLink}}</el-link>
      </iep-form-item>
      <iep-form-item v-if="step == 1" label-name="选择模块" prop="modal">
        <div style="text-align: center;">
          <tree-transfer
            :title="['备选菜单','系统菜单']"
            :from_data="modalList"
            :to_data="toList"
            :defaultProps="{label:'label'}"
            :mode="'transfer'"
            height="540px"
            @addBtn="add"
            @removeBtn="back"
            width="650px"
            filter
            openAll
          ></tree-transfer>
        </div>
      </iep-form-item>
      <!-- <iep-form-item v-if="step == 1 && showUrl" label-name="已选择模块" prop="modal">
        <div style="text-align: center;">
          <el-tree :data="toList" node-key="id" default-expand-all draggable>
            <span class="custom-tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </iep-form-item>-->
      <iep-form-item v-if="step == 2" label-name="模块编辑" prop="modal">
        <div class="block">
          <el-tree :data="transModalList" node-key="id" default-expand-all draggable>
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <!-- <el-input v-else v-model="data.label"></el-input> -->
              <span>
                <iep-button
                  class="iep-btn-xs"
                  style="margin-right:5px"
                  type="text"
                  @click="() => editData(data)"
                >编辑</iep-button>
                <iep-button class="iep-btn-xs" @click="() => remove(node, data)">删除</iep-button>
              </span>
            </div>
          </el-tree>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button v-if="step == 1" type="default" @click="resetData">重置</el-button>
      <el-button v-if="step == 1" type="primary" @click="createTransModal">下一步</el-button>
      <!-- <el-button v-if="step == 2" type="primary" @click="goFirst">上一步</el-button> -->
      <el-button v-if="step == 2" type="primary" @click="handleSumit()" style="margin-right:10px">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
    <el-dialog title="提示" :visible.sync="dialogEdit" :append-to-body="true" width="30%">
      <el-form ref="form" :model="formEditForShow" label-width="120px" class="iep-form-detail">
        <iep-form-item label-name="系统名称" prop="label">
          <el-input :maxlength="110" v-model="formEditForShow.label" placeholder="请输入名称"></el-input>
        </iep-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="handleEditSumit()" style="margin-right:10px">保存</el-button>
        <el-button @click="dialogEdit = false">取消</el-button>
      </template>
    </el-dialog>
  </iep-dialog>
</template>
<script>
import { mockMenuData } from "@/views/ods/components/Aside/const/base";
import treeTransfer from "el-tree-transfer";
import { createMenu, getDetailById } from "@/api/dms/plan";
export default {
  components: {
    treeTransfer,
  },
  data() {
    return {
      step: 1,
      dialogShow: false,
      form: {
        modal: [],
      },
      modalList: [],
      toList: [],
      transModalList: [],
      dialogEdit: false,
      formEdit: {},
      formEditForShow: {},
      planId: 0,
      currentLink: "",
      showUrl: false,
    };
  },
  computed: {},
  methods: {
    open(planId) {
      this.step = 1;
      this.modalList = JSON.parse(JSON.stringify(mockMenuData));
      this.toList = [];
      this.transModalList = [];
      this.dialogShow = true;
      this.planId = planId;
      this.currentLink = window.location.origin + "/ods/wel/" + planId;
      getDetailById(planId).then(({ data }) => {
        if (data) {
          const json = data.menuJson || {};
          if (json) {
            this.showUrl = true;
            this.modalList = (json.detailJson.firstObj || {}).from;
            this.toList = (json.detailJson.firstObj || {}).to;
            this.$set(this.form, "name", data.menuJson.name);
          }
        } else {
          this.showUrl = false;
        }
      });
    },
    _close() {
      this.dialogShow = false;
    },
    goFirst() {
      this.step = 1;
      // this.modalList = JSON.parse(JSON.stringify(mockMenuData));
      // this.toList = [];
      // this.transModalList = [];
    },
    resetData() {
      this.modalList = JSON.parse(JSON.stringify(mockMenuData));
      this.toList = [];
      this.transModalList = [];
      this.showUrl = false;
    },
    createTransModal() {
      this.transModalList = Object.assign([], this.toList);
      this.form.firstObj = {
        from: [...this.modalList],
        to: [...this.toList],
      };
      this.step = 2;
    },
    add(fromData, toData) {
      this.modalList = fromData;
      this.toList = toData;
    },
    back(fromData, toData) {
      this.modalList = fromData;
      this.toList = toData;
    },
    handleSumit() {
      const data = {};
      this.form.firstObj.to = this.toList;
      data.menuJson = {
        name: this.form.name,
        transModalList: this.transModalList,
        detailJson: {
          modalList: this.modalList,
          toList: this.toList,
          firstObj: this.form.firstObj,
        },
      };
      data.planId = this.planId;
      data.link = this.currentLink;
      createMenu(data);
      this.$message({
        type: "success",
        message: "保存成功！",
      });
      this._close();
    },
    handleEditSumit() {
      this.formEdit.label = this.formEditForShow.label;
      this.dialogEdit = false;
    },
    editData(data) {
      this.formEdit = data;
      this.formEditForShow = Object.assign({}, data);
      this.dialogEdit = true;
      // const newChild = { id: Math.random(), label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.block {
  width: 700px;
  height: 400px;
  padding: 6px;
  overflow: auto;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  height: 36px;
  .iep-btn-xs {
    padding: 0 10px !important;
    height: 28px !important;
    line-height: 28px !important;
    border-radius: 5px;
  }
}
::v-deep {
  .el-tree-node__content {
    height: 36px;
    border-radius: 10px;
    &:hover,
    &:focus,
    &:visited,
    &:focus-within,
    &:active {
      background-color: $--custom-menu-background-color;
      color: $--color-primary;
    }
    &:hover .expand-icon,
    &:focus .expand-icon {
      color: $--color-primary;
    }
  }
}
</style>
