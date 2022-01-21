<template>
  <iep-dialog :dialog-show="dialogShow" title="组织收费设置" width="500px" @close="_close()">
    <el-alert
      class="title"
      title="开启组织收费后，该组织限外部用户主动申请加入，组织成员及管理员不可定向邀请外部用户加入组织。"
      type="info"
      show-icon
    ></el-alert>
    <el-form class="iep-form-detail" :model="form" :rules="rules" ref="form" label-width="120px">
      <iep-form-item label-name="组织收费门槛" prop="cost">
        <div class="flex-column">
          <div class="flex-box">
            <iep-input-amount
              class="input-item"
              v-model="form.cost"
              placeholder="请输入组织收费门槛"
              unit="宝贝/人"
            ></iep-input-amount>
          </div>
        </div>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { updateOrgChargeCost } from "@/api/admin/org";
import { initOrgChargeForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  name: "IepDialogOrgCharge",
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      form: initOrgChargeForm(),
      rules: {
        cost: [
          { required: true, message: "请输入宝贝", trigger: "change" },
          {
            type: "number",
            min: 0.01,
            max: 3000,
            message: "设置范围大于 0 贝，小于等于 3000 贝",
          },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      const { data } = await updateOrgChargeCost(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initOrgChargeForm();
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-form-detail {
  margin-top: 30px;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input-item {
    flex: 0 0 300px;
  }
}
.title {
  display: flex;
  align-items: flex-start;
  &::v-deep {
    .el-alert__icon {
      margin-top: 2px;
    }
  }
}

.iep-form-detail ::v-deep .el-form-item__error {
  margin-top: 10px;
  color: $--color-text-secondary;
}
</style>
