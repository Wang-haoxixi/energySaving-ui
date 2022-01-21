<template>
  <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="600px" @close="close()">
    <slot name="tab"></slot>
    <FormView ref="formView" :disabled="[type.view].includes(status)" :form="form"></FormView>
    <template slot="footer">
      <el-button
        v-if="status!==type.view"
        type="primary"
        :disabled="[type.preview,type.view].includes(status)"
        @click="handleConfirm"
      >确定</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import FormView from "./FormView";
import { isArrRepeat } from "@/util/util";
const type = {
  view: "view",
  edit: "edit",
  preview: "preview",
};
export default {
  props: {
    contactList: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  components: {
    FormView,
  },
  data() {
    return {
      dialogTitle: "预览表单",
      dialogShow: false,
      form: [],
      type,
      status: type.view,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.$emit("close");
      this._close();
    },
    validPhoneRepeat() {
      if (this.contactList.length) {
        const tempArr = this.contactList.map(m => {
          return (m[1] && m[1].value) || "";
        });
        tempArr.splice(this.index, 1, (this.form && this.form[1].value) || "");
        if (isArrRepeat(tempArr)) {
          this.$message.warning("联系人手机号不能重复");
          return true;
        }
      }
      return false;
    },
    handleConfirm() {
      const { validFlag, phoneFlag } = this.$refs["formView"]._validate();
      if (validFlag && phoneFlag) {
        if (this.validPhoneRepeat()) return;
        this.$emit("editForm", this.form);
        this._close();
      }
    },
  },
};
</script>