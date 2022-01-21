<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="900px" @close="_close()">
    <NewTicketItem ref="form" :isEnroll="isEnroll" v-model="form" @submitForm="submitForm"></NewTicketItem>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="_submitValidate">保存</el-button>
      <el-button v-if="!isEnroll" @click="_reset()">重置</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { rules, toDtoForm } from "./options";
import { TicketDTO } from "../options";
import NewTicketItem from "../Components/NewTicketItem";
export default {
  components: { NewTicketItem },
  data() {
    return {
      dialogShow: false,
      form: new TicketDTO(),
      methodName: "创建",
      rules,
      formRequestFn: () => {},
      isEnroll: false,
      submitFormLoading: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new TicketDTO();
      this._close();
      this.$emit("load-page");
    },
    _submitValidate() {
      this.$refs["form"]._formValidate();
    },
    async submitForm() {
      try {
        this.submitFormLoading = true;
        const { data } = await this.formRequestFn(toDtoForm(this.form));
        if (data) {
          this.$message.success("操作成功");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
        this.close();
      }
    },
    _reset() {
      const { conferenceId, id } = this.form;
      this.form = { ...new TicketDTO(), conferenceId, id };
    },
  },
};
</script>
