<template>
  <iep-dialog :dialog-show="dialogShow" title="系统名称" width="800px" @close="_close()">
    <el-form ref="form" :model="form" label-width="95px" class="iep-form-detail">
      <iep-form-item v-if="step == 1" label-name="系统名称" prop="name">
        <el-input :maxlength="110" v-model="form.name" placeholder="请输入名称"></el-input>
      </iep-form-item>
      <iep-form-item v-if="step == 1" label-name="系统地址" :disabled="true" prop="link">
        <el-link :href="currentLink" target="_blank" type="primary">{{currentLink}}</el-link>
      </iep-form-item>
      <iep-form-item v-if="step == 1" label-name="选择模块" prop="modal">
        <div style="text-align: center">
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
      <iep-form-item v-if="step == 2" label-name="模块编辑" prop="modal">
        <div class="block">
          <el-tree :data="transModalList" node-key="id" default-expand-all draggable>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <!-- <el-input v-else v-model="data.label"></el-input> -->
              <span>
                <el-button type="text" size="mini" @click="() => editData(data)">编辑</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button v-if="step == 1" type="primary" @click="createTransModal">下一步</el-button>
      <el-button v-if="step == 2" type="primary" @click="goFirst">上一步</el-button>
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
        const json = data.menuJson;
        if (json) {
          this.modalList = data.menuJson.detailJson.modalList;
          this.toList = data.menuJson.detailJson.toList;
          this.$set(this.form, "name", data.menuJson.name);
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
    createTransModal() {
      this.transModalList = Object.assign([], this.toList);
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
      data.menuJson = {
        name: this.form.name,
        transModalList: this.transModalList,
        detailJson: {
          modalList: this.modalList,
          toList: this.toList,
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
<style scoped>
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
}
</style>
