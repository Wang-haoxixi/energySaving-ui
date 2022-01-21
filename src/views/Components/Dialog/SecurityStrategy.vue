<template>
  <iep-dialog class="dialog" title="安全策略" :dialogShow="dialogShow" @close="_close()" width="400px">
    <div class="security-wrap">
      <div class="title">组织宝贝数值可见范围</div>
      <div class="radio-group">
        <IepRadioGroup :dictList="dictList" v-model="value"></IepRadioGroup>
      </div>
    </div>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">确定</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { setOrgRange } from "@/api/admin/org";
export default {
  name: "IepDialogSecurityStrategy",
  data() {
    return {
      submitFormLoading: false,
      dialogShow: false,
      dictList: [
        {
          label: "负责人可见",
          value: "3",
        },
        {
          label: "组织成员可见",
          value: "2",
        },
        {
          label: "所有人可见",
          value: "1",
        },
      ],
      value: " 1",
    };
  },
  methods: {
    close() {
      this._close();
      this.$emit("load-page");
    },
    _close() {
      this.dialogShow = false;
    },
    async submitForm() {
      const { data } = await setOrgRange(this.value);
      if (data) {
        this.$message("操作成功");
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.security-wrap {
  padding: 0 20px;
  .title {
    margin-bottom: 10px;
  }
}
.radio-group ::v-deep {
  .el-radio-group {
    .el-radio {
      display: block;
    }
  }
}
</style>
