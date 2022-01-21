<template>
  <iep-basic-container class="iep-page-form" v-loading="loading">
    <iep-page-header :title="$route.meta.name" :backOption="backOption">
      <template #left>
        <span class="iep-red">办会不再累！</span>
      </template>
    </iep-page-header>
    <el-form class="iep-form-detail" :rules="rules" :model="form" ref="form" label-width="120px">
      <div class="sub-title">基本信息</div>
      <iep-form-item label-name="活动标题" prop="name">
        <el-input v-model="form.name" placeholder="不小于5个字，不超过40个字" :maxlength="40"></el-input>
      </iep-form-item>
      <iep-form-item label-name="举办时间" :verifValue="form.time" prop="time">
        <iep-date-picker-range
          :startTime.sync="form.startTime"
          :endTime.sync="form.endTime"
          startPlaceholder="开始时间"
          endPlaceholder="结束时间"
          autocomplete
        ></iep-date-picker-range>
      </iep-form-item>
      <iep-form-item label-name="活动类型" prop="type">
        <iep-dict-select v-model="form.type" dict-name="qms_activity_type" placeholder="请选择类型"></iep-dict-select>
      </iep-form-item>
      <iep-form-item :verifValue="form.poster" label-name="活动海报" prop="poster">
        <IepUploadAvatar
          v-model="form.poster"
          tip="精致的海报让活动锦上添花，更便于传播与吸引报名，也将提升在节能保平台的推荐机会。"
          :width="400"
          :height="240"
          :imgTip="true"
          :dialogWidth="800"
          :dialogHeight="480"
          :option="uploadOption"
          accept=".jpg, .jpeg, .png"
        >
          <iep-gallery style="margin-left:10px;" v-model="form.poster" slot="btn"></iep-gallery>
        </IepUploadAvatar>
      </iep-form-item>
      <iep-form-item
        v-if="form.type!=='4'"
        label-name="活动地址"
        :verifValue="form.cityField"
        prop="cityField"
      >
        <el-row :gutter="20" style="margin-left:0;width:100%;">
          <template v-if="!form.onLine">
            <el-col :span="8" style="padding-left:0">
              <iep-select-city v-model="form.cityId" placeholder="请选择举办地"></iep-select-city>
            </el-col>
            <el-col :span="12" style="padding-left:0">
              <el-input v-model="form.field" placeholder="请输入活动地址" :maxlength="40"></el-input>
            </el-col>
          </template>
          <el-col :span="4" style="padding:0">
            <el-checkbox v-model="form.onLine" @change="handleChangeOnline">线上举办</el-checkbox>
          </el-col>
        </el-row>
      </iep-form-item>
      <iep-form-item label-name="活动分类" prop="classificationName">
        <ClassificationCascader v-model="form.classificationName" placeholder="请选择分类"></ClassificationCascader>
      </iep-form-item>
      <iep-form-item :verifValue="form.label" label-name="活动标签" prop="label" class="iep-form-block">
        <iep-tag-input v-model="form.label" :maxLength="6"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="活动亮点" prop="spot" class="iep-form-block">
        <iep-input-area
          v-model="form.spot"
          :maxlength="150"
          placeholder="请填写几句活动核心亮点，便于分享摘要以及百度等搜索引擎搜索（150个字）"
        ></iep-input-area>
      </iep-form-item>
      <iep-form-item label-name="是否公开" prop="publishToLobby">
        <iep-radio-group
          class="radio-grid"
          v-model="form.publishToLobby"
          :dictList="publishToLobbyDict"
        ></iep-radio-group>
      </iep-form-item>
      <iep-form-item label-name="是否加入组织">
        <iep-radio-group
          class="radio-grid"
          v-model="form.organizationInvited"
          :dictList="organizationInvitedDict"
        ></iep-radio-group>
      </iep-form-item>
      <div class="sub-title">活动详情</div>
      <iep-form-item class="hidden" :verifValue="form.details" label-name="活动详情" prop="details">
        <iep-jodit-editor placeholder="请编辑内容（20000个字）" :limitChars="20000" v-model="form.details"></iep-jodit-editor>
      </iep-form-item>
      <iep-form-item label-name="活动附件" prop="attachFile">
        <iep-upload v-model="form.files" :limit="3" action="/api/admin/file/oss/upload"></iep-upload>
      </iep-form-item>
      <!-- 发布状态不能在这里编辑票务 -->
      <template v-if="form.statusFlag === '0'">
        <div class="sub-title">设置票种</div>
        <div class="sub-title">
          <el-button type="primary" plain @click="handleAddTicket()">新增</el-button>
        </div>
        <NewTicketItem
          class="ticket-item"
          ref="ticket"
          v-for="(item,i) in form.ticketingManagements"
          @input="handleUpdateTicket"
          :value="item"
          :key="'ticket'+i"
          :isDraft="form.statusFlag === '0'"
          @delete="handleDelTicket(i)"
          @reset="handleResetTicket(i)"
        ></NewTicketItem>
      </template>
      <div class="sub-title">报名表单收集</div>
      <CustomForm ref="customForm" :form="form"></CustomForm>
      <el-form-item class="footer">
        <el-button
          class="iep-btn-l"
          type="primary"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >发布活动</el-button>
        <el-button
          v-if="form.statusFlag!=='1'"
          class="iep-btn-l"
          :loading="submitFormLoading"
          @click="handleDraft()"
        >保存草稿</el-button>
        <el-button class="iep-btn-l" @click="close()">取消</el-button>
      </el-form-item>
    </el-form>
  </iep-basic-container>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import currentMixins from "./mixins/currentMixins";
import {
  postActivity,
  putActivity,
  getActivityById,
} from "@/api/meetting/publish";
import { getFormConfig } from "@/api/meetting/config";
import {
  toDtoForm,
  toVoForm,
  publishToLobbyDict,
  organizationInvitedDict,
} from "./options";
import { ActivityDTO, TicketDTO } from "../options";
import ClassificationCascader from "../Components/ClassificationCascader";
import NewTicketItem from "../Components/NewTicketItem";
import CustomForm from "./Components/CustomForm";
import moment from "moment";
export default {
  mixins: [formMixins, currentMixins],
  components: { ClassificationCascader, NewTicketItem, CustomForm },
  data() {
    return {
      backOption: {
        isBack: true,
        backFunction: this.close,
      },
      form: new ActivityDTO(),
      publishToLobbyDict,
      organizationInvitedDict,
      uploadOption: {
        fixedBox: true,
        isScale: true,
      },
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isEdit() {
      return this.id ? true : false;
    },
    formRequestFn() {
      return this.isEdit ? putActivity : postActivity;
    },
    timeRange() {
      const { startTime, endTime } = this.form;
      return { startTime, endTime };
    },
    cityField() {
      const { cityId, field } = this.form;
      return { cityId, field };
    },
  },
  created() {
    this.loadPage();
  },
  watch: {
    "form.type"(v) {
      if (v === "4") {
        this.form.field = "";
        this.form.cityId = [];
      }
    },
    // 监听时间范围 只用于表单验证
    timeRange(v) {
      this.form.time = [v.startTime || "", v.endTime || ""];
    },
    // 监听地区 只用于表单验证
    cityField(v) {
      this.form.cityField = v;
    },
  },
  methods: {
    // 发布活动的时候验证票务的表单信息
    async submitForm() {
      const res = this.$refs["customForm"].handleValid();
      if (!res) return;
      const result = await Promise.all(
        this.$refs["ticket"].map((m) => {
          return m._formValidate();
        }),
      );
      if (result.every((m) => m)) {
        this.submitFormFn();
      }
    },
    // 真正提交活动信息的请求
    async submitFormFn() {
      const { data } = await this.formRequestFn(toDtoForm(this.form));
      // 需要删除
      if (data) {
        this.$router.history.go(-1);
      }
    },
    // 保存为草稿的表单验证 只验证活动名称
    formValid({ name }) {
      return new Promise((res) => {
        if (name.trim() === "") {
          const message = { type: "info", message: "保存草稿最少输入活动名称" };
          res({ message });
        }
        res({ data: true });
      });
    },
    // 保存为草稿走的方法
    async handleDraft() {
      const { data, message } = await this.formValid(this.form);
      if (data) {
        this.$refs["customForm"].handleCombine();
        this.form.submitType = "0";
        this.submitFormFn();
      } else {
        this.$message(message);
      }
    },
    async loadPage() {
      this.loading = true;
      if (this.isEdit) {
        const { data } = await getActivityById(this.id);
        data.publishToLobby = data.auditStatus !== "0" ? "1" : "0";
        this.form = this.$mergeByFirst(new ActivityDTO(), toVoForm(data));
      } else {
        this.form.startTime = moment().format("YYYY-MM-DD HH:mm:ss");
        this.form.endTime = moment().add(1, "d").format("YYYY-MM-DD HH:mm:ss");
      }
      {
        const { data } = await getFormConfig({ activityId: this.id });
        this.form.conferenceFormList = data;
        this.$refs["customForm"].init();
      }
      this.loading = false;
    },
    // 删除票务
    handleDelTicket(i) {
      if (this.form.ticketingManagements.length === 1) {
        this.$message.info("至少需保留一张票");
        return;
      }
      this.form.ticketingManagements.splice(i, 1);
    },
    // 重置票务
    handleResetTicket(i) {
      const { conferenceId, id } = this.form.ticketingManagements[i];
      const resTicket = {
        ...this.form.ticketingManagements[i],
        ...new TicketDTO(),
        conferenceId,
        id,
      };
      this.form.ticketingManagements.splice(i, 1, resTicket);
    },
    // 添加票务
    handleAddTicket() {
      // if (this.form.ticketingManagements.length === 3) {
      //   this.$message.info("最多设置三种票");
      //   return;
      // }
      this.form.ticketingManagements.push(new TicketDTO());
    },
    // 更新票务
    handleUpdateTicket(v) {
      const i = this.form.ticketingManagements.findIndex((m) => m.id === v.id);
      this.form.ticketingManagements[i] = v;
    },
    _close() {
      this.$router.go(-1);
    },
    close() {
      this.$confirm(
        "此操作将不会保存您所编辑的活动内容, 是否确认退出?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          this._close();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .left {
  display: flex;
  align-items: center;
}
.iep-form-detail {
  // margin-top: 70px;
  margin-left: 20px;
  .sub-title {
    margin-bottom: 20px;
    color: $--color-text-primary;
  }
  .hidden {
    ::v-deep .el-form-item__label {
      display: none;
    }
    ::v-deep .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .radio-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 2fr;
  }
  .footer {
    margin-top: 20px;
  }
}
.ticket-item {
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
