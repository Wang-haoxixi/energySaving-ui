<template>
  <iep-dialog :dialog-show="dialogShow" title="申请处理" width="520px" @close="dialogShow=false">
    <div class="item">
      <span class="item-opt">申请人：{{form.name}}</span>
      <span class="item-opt">申请时间：{{form.applyTime}}</span>
    </div>
    <div class="item">
      <span class="item-apt">申请理由：{{form.applyReason}}</span>
    </div>
    <IepFooterBar>
      <iep-button type="primary" @click="handleSave()">同意</iep-button>
      <iep-button @click="handleRefalse()">拒绝</iep-button>
    </IepFooterBar>
  </iep-dialog>
</template>
<script>
const initForm = () => {
  return {
    name: "",
    applyTime: "",
    applyReason: "",
  };
};
import { dealApplyPage, getApplyPage } from "@/api/dms/custom_contact.ts";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      fnRequest: () => {},
      contactId: "",
      name: "",
    };
  },
  methods: {
    loadDetail() {
      getApplyPage(this.contactId).then(res => {
        this.form = this.$mergeByFirst(this.form, res.data);
        this.form.name = this.name;
      });
    },
    close() {
      this.$emit("save");
      this.form = initForm();
      this.dialogShow = false;
    },
    handleSave() {
      dealApplyPage(this.contactId, { status: "2" }).then(res => {
        if (res.data) {
          this.$message({
            message: "已同意",
            type: "success",
          });
          this.close();
        }
      });
    },
    handleRefalse() {
      dealApplyPage(this.contactId, { status: "3" }).then(res => {
        if (res.data) {
          this.$message({
            message: "已拒绝",
            type: "success",
          });
          this.close();
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.item {
  padding: 0 15px;
  display: flex;
  margin-bottom: 15px;
  span {
    width: 50%;
    font-size: 14px;
    color: $--color-text-regular;
  }
  .item-apt {
    width: 100%;
  }
}
</style>