<template>
  <iep-dialog :dialog-show="dialogShow" title="签到核销" width="500px" @close="_close()">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedOrderNoList" @change="handleCheckedOrderNoChange">
      <el-checkbox
        class="checkbox"
        v-for="order in allOrderNoList"
        :label="order"
        :key="order"
        :disabled="disabledOrderNoList.includes(order)"
      >{{order}}</el-checkbox>
    </el-checkbox-group>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import difference from "lodash/difference";
import { writeOffSignInCode } from "@/api/meetting/ticket";
export default {
  name: "CheckDialogForm",
  data() {
    return {
      submitFormLoading: false,
      dialogShow: false,
      checkAll: false,
      checkedOrderNoList: [],
      disabledOrderNoList: [],
      allOrderNoList: [],
      isIndeterminate: true,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    async submitForm() {
      try {
        this.submitFormLoading = true;
        const checkedOrderNoList = difference(
          this.checkedOrderNoList,
          this.disabledOrderNoList,
        );
        const { data } = await writeOffSignInCode(checkedOrderNoList);
        if (data) {
          this.$message("操作成功");
          this._close();
          this.$emit("load-page");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
      }
    },
    handleCheckAllChange(val) {
      this.checkedOrderNoList = val ? this.allOrderNoList : [];
      this.isIndeterminate = false;
    },
    handleCheckedOrderNoChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.allOrderNoList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allOrderNoList.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox {
  display: block;
}
</style>
