<template>
  <iep-dialog :dialog-show="dialogShow" title="重命名" width="440px" @close="dialogShow=false">
    <el-form ref="form" :model="form" label-width="120px" class="iep-form-detail">
      <iep-form-item label-name="重命名">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
    </el-form>
    <IepFooterBar>
      <el-button @click="handleSave">保存</el-button>
    </IepFooterBar>
  </iep-dialog>
</template>
<script>
const initForm = () => {
  return {
    name: "",
  };
};
import { reNamePageById } from "@/api/dms/custom_plan.ts";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      id: 0,
    };
  },
  methods: {
    async handleSave() {
      const data = await reNamePageById(this.id, this.form);
      if (data.data) {
        this.$emit("save");
        this.dialogShow = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
