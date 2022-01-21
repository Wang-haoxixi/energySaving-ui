<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="methodName" :backOption="backOption"></iep-page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="iep-form-detail">
        <iep-form-item label-name="任务名称" prop="name">
          <el-input :maxlength="30" v-model="form.name" placeholder="请输入任务名称"></el-input>
        </iep-form-item>
        <iep-form-item label-name="任务描述" prop="description">
          <el-input :maxlength="100" v-model="form.description" placeholder="请输入任务描述"></el-input>
        </iep-form-item>
        <iep-form-item label-name="编码" prop="code" class="iep-form-half">
          <el-input :maxlength="100" v-model="form.code" placeholder="请输入编码"></el-input>
        </iep-form-item>
        <iep-form-item label-name="未完成按钮名称" prop="buttonName" class="iep-form-half">
          <el-input :maxlength="30" v-model="form.buttonName" placeholder="请输入按钮名称"></el-input>
        </iep-form-item>
        <iep-form-item label-name="排序" prop="sort" class="iep-form-half">
          <iep-input-number v-model="form.sort" placeholder="请输入排序"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="修改时间" prop="updateTime" class="iep-form-half">
          <iep-date-picker v-model="form.updateTime" disabled></iep-date-picker>
        </iep-form-item>
        <iep-form-item label-name="对应宝贝规则" prop="ruleId" class="iep-form-half">
          <IepSelectCommonList
            v-model="form.ruleId"
            prefixUrl="fms/rule/all"
            :props="{label:'name',value:'id'}"
          ></IepSelectCommonList>
        </iep-form-item>
        <iep-form-item label-name="任务属性" prop="property">
          <el-radio v-model="form.property" label="0">单次</el-radio>
          <el-radio v-model="form.property" label="1">多次</el-radio>
        </iep-form-item>
        <iep-form-item
          v-if="form.property==1"
          label-name="上限次数"
          prop="number"
          class="iep-form-half"
        >
          <iep-input-number v-model="form.number" placeholder="请输入上限次数" :min="1"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="是否有详情" prop="isDetail">
          <el-switch
            v-model="form.isDetail"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
          ></el-switch>
        </iep-form-item>
        <iep-form-item v-if="form.isDetail==1" label-name="详情步骤" prop="steps">
          <IepJoditEditor v-model="form.steps"></IepJoditEditor>
        </iep-form-item>
        <el-form-item>
          <el-button
            class="iep-btn-l"
            type="primary"
            :loading="submitFormLoading"
            @click="mixinsSubmitFormGen()"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </iep-basic-container>
  </div>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { postSoTask, putSoTask, getSoTaskById } from "@/api/qms/so_task";
export class SoTaskDTO {
  id = "";
  name = "";
  description = "";
  code = "";
  rewardAmount = "";
  number = 1;
  buttonName = "";
  sort = 0;
  ruleId = null;
  property = "0";
  isDetail = "0";
  steps = "";
  updateTime = "";
}
export default {
  mixins: [formMixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
      form: new SoTaskDTO(),
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id ? true : false;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
    formRequestFn() {
      return this.isEdit ? putSoTask : postSoTask;
    },
  },
  created() {
    this.form = new SoTaskDTO();
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getSoTaskById(this.id);
      this.form = this.$mergeByFirst(new SoTaskDTO(), data);
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$router.history.go(-1);
      }
    },
  },
};
</script>
