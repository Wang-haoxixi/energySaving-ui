<template>
  <iep-dialog :dialog-show="dialogShow" title="定时任务" width="55%" @close="_close()">
    <el-form
      :model="form"
      ref="form"
      class="iep-form-detail"
      label-width="120px"
      :disabled="disabled"
    >
      <iep-form-item class="iep-form-half" label-name="任务名称" prop="jobName">
        <el-input v-model.trim="form.jobName"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="任务组名" prop="jobGroup">
        <el-input v-model.trim="form.jobGroup"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="类型" prop="jobType">
        <IepDictsMapSelect v-model="form.jobType" :dictsMap="dictsMap.jobType"></IepDictsMapSelect>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="执行路径" prop="executePath">
        <el-input v-model.trim="form.executePath"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="cron表达式" prop="cronExpression">
        <el-popover v-model="cronPopover">
          <cron @change="changeCron" @close="cronPopover=false"></cron>
          <el-input
            slot="reference"
            @click="cronPopover=true"
            v-model="form.cronExpression"
            placeholder="请输入定时策略"
            clearable
          ></el-input>
        </el-popover>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="执行文件" prop="className">
        <el-input v-model.trim="form.className"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="执行方法" prop="methodName">
        <el-input v-model.trim="form.methodName"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="执行参数值" prop="methodParamsValue">
        <el-input v-model.trim="form.methodParamsValue"></el-input>
      </iep-form-item>
      <iep-form-item class="iep-form-half" label-name="错失执行策略" prop="misfirePolicy">
        <IepDictsMapSelect v-model="form.misfirePolicy" :dictsMap="dictsMap.misfirePolicy"></IepDictsMapSelect>
      </iep-form-item>
      <iep-form-item label-name="备注信息" prop="remark">
        <iep-input-area v-model.trim="form.remark"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </iep-dialog>
</template>

<script>
import { cron } from "vue-cron";
import { initForm, dictsMap } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  components: {
    cron,
  },
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      disabled: false,
      form: initForm(),
      dialogShow: false,
      cronPopover: false,
      formRequestFn: () => {},
    };
  },
  methods: {
    changeCron(cron) {
      this.form.cronExpression = cron;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
