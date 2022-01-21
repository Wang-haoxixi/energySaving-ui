<template>
  <div class="iep-page-form" v-loading="loading">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <iep-form-item label-name="建议主题">
          <div>{{form.title}}</div>
        </iep-form-item>
        <!-- <iep-form-item label-name="建议类型">
          <template v-for="item in options">
            <div
              style="text-align: justify;"
              v-if="form.type == item.value"
              :key="item.value"
            >{{item.label}}</div>
          </template>
        </iep-form-item>-->
        <iep-form-item label-name="建议内容">
          <div>{{form.content}}</div>
        </iep-form-item>
        <iep-form-item label-name="建议人">
          <div>{{form.creatorName}}</div>
        </iep-form-item>
        <iep-form-item label-name="建议时间">
          <div>{{form.createTime|parseToTimeMinutes}}</div>
        </iep-form-item>

        <el-divider></el-divider>
        <iep-form-item label-name="处理意见" prop="status">
          <IepRadioGroup :disabled="isDisable" v-model="form.status" :dictList="dictList"></IepRadioGroup>
        </iep-form-item>
        <iep-form-item label-name="反馈意见" prop="message">
          <IepInputArea
            show-word-limit
            :maxlength="500"
            :disabled="isDisable"
            v-model="form.message"
          ></IepInputArea>
        </iep-form-item>
        <iep-form-item label-name="打赏">
          <IepInputAmount :disabled="isDisable" v-model="form.amount"></IepInputAmount>
        </iep-form-item>

        <!-- <el-divider></el-divider>
        <iep-form-item class="appendix" label-name="附件">
          <el-link @click="downloadUrl(form.file)" icon="el-icon-paperclip">{{form.file}}</el-link>
        </iep-form-item>-->
      </el-form>
      <IepFooterBar v-if="!isDisable">
        <el-button
          :disabled="isDisable"
          type="primary"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >确认</el-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { downloadUrl } from "@/api/common";
import { getSuggestById, dealSuggest } from "@/api/admin/suggest";
import {
  PrizeSuggestDTO,
  suggestTypeOptions,
  toDealRequestObj,
} from "@/views/Components/Dialog/options";

const rules = {
  status: [{ required: true, message: "请选择处理意见", trigger: "blur" }],
  message: [{ required: true, message: "请输入反馈意见", trigger: "blur" }],
};
export default {
  mixins: [formMixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      dictList: [
        {
          label: "采纳",
          value: 2,
        },
        {
          label: "驳回",
          value: 3,
        },
      ],
      rules,
      form: new PrizeSuggestDTO(),
      options: suggestTypeOptions,
      isDisable: true,
      loading: true,
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    downloadUrl,
    async loadPage() {
      this.loading = true;
      const { data } = await getSuggestById(this.$route.params.id);
      this.form = this.$mergeByFirst(new PrizeSuggestDTO(), data);
      this.isDisable = [2, 3].includes(this.form.status);
      this.loading = false;
    },
    async submitForm() {
      const data = await dealSuggest(toDealRequestObj(this.form));
      if (data.data) {
        this.$message.success("操作成功");
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.appendix ::v-deep {
  display: flex;
  align-items: center;
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
