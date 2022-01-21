<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px" :disabled="disabled">
      <iep-form-item label-name="菜单类型" prop="type">
        <iep-radio-group v-model="form.type" :dict-list="menuTypeList"></iep-radio-group>
      </iep-form-item>
      <iep-form-item label-name="菜单名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入菜单名称"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type==='2'" label-name="授权标识" prop="permission">
        <el-input v-model.trim="form.permission" placeholder="请输入授权标识"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='0'" label-name="上级菜单" prop="parentId">
        <el-select v-model="form.parentId" filterable placeholder="请选择上级菜单">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="菜单路径" prop="path">
        <el-input v-model.trim="form.path" placeholder="请输入菜单路径"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="前端组件" prop="component">
        <el-input v-model.trim="form.component" placeholder="请输入前端组件"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="默认跳转地址" prop="redirect">
        <el-input v-model.trim="form.redirect" placeholder="请输入默认跳转地址"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="菜单图标" prop="icon">
        <el-input v-model.trim="form.icon" placeholder="请输入菜单图标"></el-input>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="排序" prop="sort">
        <iep-input-number v-model="form.sort" placeholder="请输入排序"></iep-input-number>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="隐藏路由" prop="hidden">
        <el-switch v-model="form.hidden" active-color="#13ce66" active-text="隐藏" inactive-text="显示">
        </el-switch>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="是否缓存路由" prop="keepAlive">
        <el-switch v-model="form.keepAlive" active-color="#13ce66" active-text="缓存" inactive-text="不缓存">
        </el-switch>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="聚合路由" prop="alwaysShow">
        <el-switch v-model="form.alwaysShow" active-color="#13ce66" active-text="聚合" inactive-text="不聚合">
        </el-switch>
      </iep-form-item>
      <iep-form-item v-if="form.type!=='2'" label-name="打开方式" prop="internalOrExternal">
        <el-switch v-model="form.internalOrExternal" active-color="#13ce66" active-text="外部" inactive-text="内部">
        </el-switch>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { menuTypeList } from "./options";
import { MenuItemEntity } from "@/types/menu";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      menuTypeList,
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: new MenuItemEntity(),
      options: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new MenuItemEntity();
      this._close();
      this.$emit("load-page");
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
