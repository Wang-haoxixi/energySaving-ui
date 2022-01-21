<template>
  <iep-dialog
    class="iep-dialog"
    :dialog-show="dialogShow"
    title="更改问卷信息"
    width="650px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" v-loading="loading" label-width="110px">
      <iep-form-item label-name="问卷名称" prop="name">
        <el-input v-model.trim="form.name" :maxlength="50" placeholder="请输入问卷名称（最多输入50个字）"></el-input>
      </iep-form-item>
      <iep-form-item label-name="问卷描述" prop="remarks">
        <el-input
          v-model="form.remarks"
          type="textarea"
          :maxlength="500"
          placeholder="请输入问卷描述（最多输入500个字）"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="问卷范围" prop="scope">
        <el-radio-group v-model="form.scope">
          <el-radio :label="item.value" :key="item.value" v-for="item in rangeData">{{item.label}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="时间设置" prop="timeSetting">
        <iep-radio-group v-model="form.timeSetting" :dict-list="isData"></iep-radio-group>
      </iep-form-item>
      <iep-form-item v-if="form.timeSetting === 2" label-name="时间" prop="timeRange">
        <iep-date-picker
          v-model="form.timeRange"
          value-format="yyyy-MM-dd HH:mm:00"
          format="yyyy-MM-dd HH:mm"
          :picker-options="timeOption"
          class="iep-date-picker"
          type="datetimerange"
          :default-time="defaultTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="限制手机号" prop="mobileListText" v-if="form.isMobile===1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          v-model.trim="form.mobileListText"
          :placeholder="placeholderMobileListText"
        ></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button :disabled="loading" @click="handleSubmit" type="primary">保存</el-button>
      <el-button :disabled="loading" type="primary" plain @click="close">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import currentMixins from "@/views/qms/questionnaire/manage/dialog/main/components/mixins/formMixins";
import { quesTimeSetting, getDataById } from "@/api/qms/questionnaire";
import { getMobileListById } from "@/api/qms/ques_mobile";

import moment from "moment";
export default {
  name: "DialogRefdate",
  mixins: [currentMixins],
  data() {
    return {
      dialogShow: false,
      quesId: 0,
      isData: [
        {
          label: "是",
          value: 2,
        },
        {
          label: "否",
          value: 1,
        },
      ],
      rangeData: [
        {
          label: "生态开放",
          value: 1,
        },
        {
          label: "组织内开放",
          value: 2,
        },
      ],
      loading: true,
      timeOption: {
        disabledDate: (time) => {
          const day1 = new Date();
          day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
          return time.getTime() < +day1;
        },
      },
      placeholderMobileListText:
        '请输入手机号，请用"/"来分隔手机号。示例：15895867484/15895867999',
    };
  },
  watch: {
    "form.timeSetting": {
      handler(newVal) {
        if (newVal === 1) {
          this.form.timeRange = [];
        }
      },
    },
    "form.timeRange": {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.form.startTime = newVal[0];
          this.form.endTime = newVal[1];
        } else {
          this.form.startTime = "";
          this.form.endTime = "";
        }
      },
      deep: true,
    },
  },
  computed: {
    defaultTime() {
      const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const st = nowDate.split(" ")[1];
      return [st, "23:59:59"];
    },
  },
  methods: {
    async open(id) {
      this.quesId = id;
      this.loading = true;
      this.dialogShow = true;
      const { data } = await getDataById(id);
      if (data) {
        this.form.timeSetting = data.timeSetting;
        if (data.timeSetting === 2) {
          this.form.timeRange = [data.startTime, data.endTime];
        }
        this.form.name = data.name;
        this.form.remarks = data.remarks;
        this.form.scope = data.scope;
        this.form.isMobile = data.isMobile;
        this.form.mobileList = [];
        this.form.mobileListText = "";
        if (this.form.isMobile === 1) {
          const res = await getMobileListById(id);
          if (res.data) {
            this.form.mobileList = res.data;
            this.form.mobileListText = res.data.join("/");
          }
        }
      }
      this.loading = false;
    },
    submitValid() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    async handleSubmit() {
      const result = await this.submitValid();
      if (result) {
        if (this.form.isMobile === 1) {
          this.form.mobileList = Array.from(
            new Set(this.form.mobileListText.split("/")),
          );
        }
        const {
          name,
          remarks,
          scope,
          startTime,
          endTime,
          timeSetting,
          isMobile,
          mobileList,
        } = this.form;
        const form = {
          name,
          remarks,
          scope,
          startTime,
          endTime,
          timeSetting,
          isMobile,
          mobileList,
        };
        if (scope === 1) {
          this.$confirm("生态问卷信息修改需要审核，是否确认提交？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.submit(form);
            })
            .catch(() => {});
        } else {
          this.submit(form);
        }
      }
    },
    async submit(form) {
      this.loading = true;
      const { data } = await quesTimeSetting({ id: this.quesId, ...form });
      if (data) {
        this.$message({ message: "更改问卷信息成功", type: "success" });
        this.$emit("loadPage");
      }
      this.loading = false;
      this._close();
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
    },
  },
};
</script>
<style lang="scss" scoped>
.iep-date-picker {
  width: 100%;
  height: 44px !important;
}
.el-form {
  margin-bottom: 40px;
}
</style>