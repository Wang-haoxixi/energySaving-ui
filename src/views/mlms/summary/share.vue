<template>
  <iep-dialog :dialog-show="dialogShow" title="分享纪要" width="400px" @close="resetForm">
    <div class="content">
      <IepContactsInput
        ref="contacts"
        v-model="formData.shareMemberIds"
        :showFriend="false"
        :orgId="orgId"
      ></IepContactsInput>
    </div>
    <template slot="footer">
      <el-button type="primary" :loading="loadState" @click="handleSubmit">分享</el-button>
      <el-button :loading="loadState" @click="resetForm()">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { shareInSo } from "@/api/dms/meeting_summary";
export default {
  props: {
    orgId: {
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      loadState: false,
      dialogShow: false,
      formData: {
        shareMemberIds: [],
      },
    };
  },
  methods: {
    open(row) {
      this.dialogShow = true;
      this.formData = {
        id: row.id,
        orgId: row.orgId,
        shareMemberIds: [],
      };
      this.$nextTick(() => {
        this.$refs.contacts.handleEdit();
      });
    },
    resetForm() {
      this.dialogShow = false;
      this.formData = {
        shareMemberIds: [],
      };
    },
    handleSubmit() {
      const row = { ...this.formData };
      row.shareMemberIds = row.shareMemberIds.map(m => m.id);
      shareInSo(row).then(({ data }) => {
        if (data) {
          this.$message.success("分享成功！");
          this.resetForm();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  min-height: 100px;
}
</style>
