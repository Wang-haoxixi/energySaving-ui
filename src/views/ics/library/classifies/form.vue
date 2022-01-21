<template>
  <div class="iep-basic-scroll">
    <iep-dialog
      :dialog-show="dialogShow"
      :title="`${methodName === 'create' ? '新增' : '修改'}分类`"
      width="40%"
      @close="resetForm"
    >
      <el-form :model="formData" :rules="rules" label-width="150px" ref="form">
        <iep-form-item label-name="分类名称" prop="typeName">
          <el-input v-model="formData.typeName" :maxlength="10"></el-input>
        </iep-form-item>

        <iep-form-item label-name="是否在帮助中心显示" label-width="150px">
          <el-switch
            v-model="formData.showUser"
            :active-value="'1'"
            :inactive-value="'0'"
            active-color="#13ce66"
          ></el-switch>
        </iep-form-item>
      </el-form>

      <template slot="footer">
        <el-button type="primary" @click="submitForm('form')">添加</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { rules, initFormData } from "./options";
import { postQuestionType } from "@/api/ims/questionType";

export default {
  components: {},
  data() {
    return {
      methodName: "create",
      formData: initFormData(),
      dialogShow: false,
      rules,
    };
  },
  methods: {
    open(state = "create", row) {
      this.formData = Object.assign({}, this.formData, row);
      this.methodName = state;
      this.dialogShow = true;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const row = { ...this.formData };
          if (row.parentTypeId === 0) delete row.parentTypeId;
          postQuestionType(row).then(() => {
            this.$message({
              message: "操作成功！",
              type: "success",
            });
            this.$emit("load_page", true);
            this.resetForm();
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.formData = initFormData();
      this.dialogShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>

<style scoped>
.menu-content >>> .el-card__header {
  padding: 8px 20px;
  border: 0;
}
.menu-content >>> .el-submenu__title,
.menu-content >>> .el-menu-item {
  height: 20px;
  line-height: 20px;
}
.menu-content >>> .el-dropdown {
  top: 0;
}
.menu-content >>> .el-menu {
  border-right: 0;
}
</style>
