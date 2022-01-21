<template>
  <iep-dialog :dialog-show="dialogShow" title="菜单组" width="450px" @close="_close()">
    <el-form :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="菜单组名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单组名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="菜单组路径" prop="path">
        <el-input v-model="form.path" placeholder="请输入菜单组路径"></el-input>
      </iep-form-item>
      <iep-form-item label-name="关联角色" prop="permission">
        <el-select v-model="form.permission" filterable placeholder="请选择角色">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="关联菜单" prop="menuIds">
        <IepSelectCommonList
          v-model="form.menuIds"
          prefixUrl="admin/menu"
          :props="{label:'name',value:'menuId'}"
          filterable
          multiple
          placeholder="请选择关联菜单"
        ></IepSelectCommonList>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postMenuGroup, putMenuGroup } from "@/api/admin/menu_group";
import formMixins from "@/mixins/formMixins";
import { IepMenuGroupItemEntity } from "@/types/menu";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      form: new IepMenuGroupItemEntity(),
      options: [
        {
          id: 6,
          name: "平台运维",
        },
        {
          id: 5,
          name: "组织拥有者",
        },
        {
          id: 4,
          name: "组织管理者",
        },
        {
          id: 3,
          name: "组织普通用户",
        },
        {
          id: 2,
          name: "普通用户",
        },
        {
          id: 1,
          name: "超级管理员",
        },
      ],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new IepMenuGroupItemEntity();
      this._close();
      this.$emit("load-page");
    },
    add() {
      this.form = new IepMenuGroupItemEntity();
      this.formRequestFn = postMenuGroup;
      this.dialogShow = true;
    },
    edit(row) {
      this.form = { ...row };
      this.formRequestFn = putMenuGroup;
      this.dialogShow = true;
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
