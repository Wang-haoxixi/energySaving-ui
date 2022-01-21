<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="`${methodName}纪要`" :backOption="backOption"></iep-page-header>
      <!-- 表格 -->
      <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="form-detail">
        <el-form-item label="会议类型：" prop="meetingType">
          <el-radio-group v-model="formData.meetingType">
            <el-radio
              v-for="(item, index) in dictGroup.get('dms_summary_type')"
              :key="index"
              :label="item.value"
              @change="typeChange"
            >
              <div style="margin: 0 10px 20px 0;display: inline-block;">{{item.label}}</div>
              <iep-tip :content="tipContent.meetingType[item.value]"></iep-tip>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="拜访对象：" v-if="formData.type === 1">
          <!-- <IepCrmsSelectMultiple v-model="formData.visitingUserId" :option="formData.visitingUser" prefixUrl="crm/customer/all/list"></IepCrmsSelectMultiple> -->
        </el-form-item>
        <el-form-item :label="`${formData.type === 0 ? '会议主题':'会议标题'}：`" prop="title">
          <el-input v-model="formData.title" maxlength="50" :placeholder="tipContent.title"></el-input>
        </el-form-item>
        <el-form-item label="会议内容：" prop="meetingContent">
          <iep-jodit-editor
            v-model="formData.meetingContent"
            :placeholder="tipContent.meetingContent"
          ></iep-jodit-editor>
        </el-form-item>
        <el-form-item label="会议总结：" prop="meetingCon">
          <el-input
            type="textarea"
            v-model="formData.meetingCon"
            rows="8"
            maxlength="1000"
            placeholder="一、简明扼要说明会议精神，如1、2、3......
二、清晰罗列下一步工作计划，如1、2、3......（关联人员需要着重说明）"
          ></el-input>
        </el-form-item>
        <el-form-item label="感想与困惑：" prop="thoughtsProblem">
          <el-input
            type="textarea"
            v-model="formData.thoughtsProblem"
            rows="5"
            maxlength="1000"
            placeholder="1、分段发表感想和说明困惑之处，如1、2、3......
2、感想主要围绕会议中所汇报内容和指导意见如何应用到之后工作中；
3、困惑主要围绕目前工作中疑惑不解，需要寻求帮助的事情。"
          ></el-input>
        </el-form-item>
        <el-row style="margin-bottom:5px;">
          <el-col :span="12">
            <el-form-item label="会议时间：" prop="meetingTime">
              <el-date-picker
                style="width:100%"
                v-model="formData.meetingTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type === 0">
            <el-form-item label="会议地点：" prop="meetingLocation">
              <el-input v-model="formData.meetingLocation" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="拜访形式：" prop="visitType" v-if="formData.type === 1">
          <el-radio-group v-model="formData.visitType">
            <el-radio
              v-for="(item, index) in dictGroup.mlms_visit_type"
              :key="index"
              :label="''+item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label
          prop="visitingAddress"
          v-if="formData.visitType === '1' && formData.type === 1"
        >
          <el-input v-model="formData.visitingAddress" placeholder="请输入面访具体地址"></el-input>
        </el-form-item>
        <el-form-item label="会议标签：" prop="tagKeyWords" class="tagKeyWords">
          <iep-tag-input v-model="formData.tagKeyWords"></iep-tag-input>
          <div style="font-size: 12px;color: #aaa;">{{tipContent.tagKeyWords}}</div>
        </el-form-item>
        <el-form-item label="主持人：">
          <IepContactInput v-model="formData.hostList" :showFriend="false"></IepContactInput>
        </el-form-item>
        <el-form-item label="参会人：" prop="attendeeList">
          <IepContactsInput
            v-model="formData.attendeeList"
            :showFriend="false"
            :limitUserIds="attendeeUserList"
          ></IepContactsInput>
        </el-form-item>
        <el-form-item label="抄送人：">
          <IepContactsInput
            v-model="formData.receiverList"
            :showFriend="false"
            :limitUserIds="receiverUserList"
          ></IepContactsInput>
        </el-form-item>
      </el-form>

      <iep-footer-bar>
        <el-button type="primary" @click="handlePreview" :loading="loadState">预览</el-button>
        <iep-button
          @click="saveDraft('form')"
          v-if="formData.status === 1 || methodName === '创建'"
          :loading="loadState"
        >保存草稿</iep-button>
        <iep-button
          @click="saveForm('form')"
          :loading="loadState"
        >{{formData.isSend === "1" ? '保存' : '保存并发送'}}</iep-button>
        <iep-button @click="resetForm" :loading="loadState">重置</iep-button>
      </iep-footer-bar>
    </iep-basic-container>
    <!-- 预览 -->
    <previewDialog ref="preview"></previewDialog>
  </div>
</template>
<script>
import { initFormData, rules, tipContent } from "./options";
import { mapGetters } from "vuex";
import {
  createData,
  updateData,
  getDataById,
  meetingSend,
  updateDataByAdmin,
} from "@/api/dms/meeting_summary";
import previewDialog from "./previewDialog";
import { dateFormat } from "@/util/date";

let autosave = () => {};

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  components: { previewDialog },
  data() {
    return {
      loadState: false,
      tipContent,
      formRequestFn: createData,
      methodName: "创建",
      methodType: "create",
      formData: initFormData(),
      rules,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.backPage(false);
        },
      },
      backRouter: "/wel/material/summary",
      pageState: "summary",
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
    attendeeUserList() {
      const list = [];
      if (this.formData.hostList.id) {
        list.push(this.formData.hostList.id);
      }
      for (const item of this.formData.receiverList) {
        list.push(item.id);
      }
      return list;
    },
    receiverUserList() {
      const list = [];
      if (this.formData.hostList.id) {
        list.push(this.formData.hostList.id);
      }
      for (const item of this.formData.attendeeList) {
        list.push(item.id);
      }
      return list;
    },
  },
  methods: {
    loadData(state, row) {
      if (state === "update") {
        getDataById(row.id).then(({ data }) => {
          // 首先需要判断是否被删除了
          if (!data) {
            this.$message.warning("该纪要已经被删除！");
            this.backPage(true);
          }
          data.receiverList = data.receiver.users || [];
          data.attendeeList = data.attendee.users || [];
          data.tagKeyWords = data.tagKeyWords || [];
          data.hostList = data.host;
          this.formData = { ...data };
          this.methodName = "修改";
          this.formRequestFn = this.isAdmin ? updateDataByAdmin : updateData;
        });
      }
    },
    backPage(state) {
      // const name = this.$route.name;
      this.$emit("load-page", state);
    },
    // 保存
    saveForm(formName) {
      delete this.formData.createTime;
      delete this.formData.updateTime;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.status = 0;
          this.submitForm();
        } else {
          return false;
        }
      });
    },
    // 保存草稿
    saveDraft() {
      if (this.formData.title === "") {
        this.$message.error("请至少填写会议的标题！");
        return;
      }
      this.formData.status = 1; // 草稿状态为 1
      this.submitForm();
    },
    // 自动保存
    autosave() {
      // 首先判断下是否为未发送状态，已发送纪要不做自动保存功能
      if (
        this.formData.id &&
        this.formData.isSend === "1" &&
        this.formData.status !== "1" &&
        !this.loadState
      ) {
        console.log("已保存或正在保存纪要中，不执行自动保存功能");
        autosave = window.clearInterval(autosave);
        return;
      }
      let data = { ...this.formData };
      console.log("开始自动保存草稿");
      if (data.title === "") {
        data.title = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + "自动保存";
      }
      data.status = 1; // 草稿状态为 1
      data = this.dealwithForm(data);
      const requestFn = data.id ? updateData : createData;
      requestFn(data).then(({ data }) => {
        if (data) {
          if (typeof data === "number") {
            this.formData.id = data;
          }
          this.formRequestFn = updateData;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    dealwithForm(data) {
      data.orgId = this.userInfo.orgId;
      data.hostId = data.hostList.id;
      data.attendee = {
        userIds: data.attendeeList.map(m => m.id),
      };
      data.receiver = {
        userIds: data.receiverList.map(m => m.id),
      };
      return data;
    },
    // 提交数据
    submitForm() {
      this.loadState = true;
      const row = this.dealwithForm(this.formData);
      // 发送链接
      this.formRequestFn(row).then(({ data, msg }) => {
        // 新建纪要及修改草稿，自动发送
        if (data) {
          const id = row.id ? row.id : data;
          if (row.status === 0 && row.isSend === "0") {
            meetingSend(id).then(() => {
              // 保存后之后发送
              this.loadState = false;
              this.$message.success("您成功发送一篇会议纪要，继续加油！");
              this.backPage(true);
            });
          } else {
            this.$message({
              message: `${this.methodName}成功`,
              type: "success",
            });
            this.loadState = false;
            this.backPage(true);
          }
        } else {
          this.loadState = false;
          this.$message.error(msg);
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs["form"].resetFields();
      const id = this.formData.id;
      this.formData = initFormData();
      this.formData.id = id;
    },
    // 纪要类型转换
    typeChange(val) {
      const type = val === "6" ? 1 : 0;
      this.$set(this.formData, "type", type);
    },
    // 预览
    handlePreview() {
      this.$refs["preview"].open(this.formData);
    },
  },
  created() {
    // 自动保存功能
    // autosave = setInterval(this.autosave, 0.5 * 60 * 1000);
  },
  destroyed() {
    // autosave = window.clearInterval(autosave);
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
.tooltip {
  position: absolute;
  left: -19px;
  width: 17px;
}
.tagKeyWords ::v-deep .el-form-item__content {
  display: block;
}
</style>
