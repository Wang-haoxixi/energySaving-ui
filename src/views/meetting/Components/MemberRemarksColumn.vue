<template>
  <div>
    <el-link type="info" v-if="!scope.row.soRemarks" @click="handleAdd()">添加</el-link>
    <el-link type="primary" v-else @click="handleEdit()">查看</el-link>
    <iep-dialog
      :dialog-show="dialogShow"
      :title="`${dialogTitle}批注`"
      width="500px"
      @close="_close()"
    >
      <iep-input-area v-model="content" :placeholder="placeholder"></iep-input-area>
      <template slot="footer">
        <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
        <el-button @click="_close()">取消</el-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { updateSoRemarks } from "@/api/meetting/enroll";
class RemarksDTO {
  id = 0;
  soRemarks = "";
}
export default {
  name: "MemberRemarksColumn",
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: new RemarksDTO(),
      submitFormLoading: false,
      dialogShow: false,
      content: "",
      placeholder: "您可以输入对这个报名者的备注，方便您的管理与服务",
    };
  },
  computed: {
    dialogTitle() {
      return !this.scope.row.soRemarks ? "添加" : "查看";
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleAdd() {
      this.dialogShow = true;
    },
    handleEdit() {
      this.content = this.scope.row.soRemarks;
      this.dialogShow = true;
    },
    async submitForm() {
      try {
        this.submitFormLoading = true;
        this.form = this.$mergeByFirst(new RemarksDTO(), {
          id: this.scope.row.id,
          soRemarks: this.content,
        });
        const { data } = await updateSoRemarks(this.form);
        if (data) {
          this.content = "";
          this._close();
          this.$emit("load-page");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
      }
    },
  },
};
</script>
