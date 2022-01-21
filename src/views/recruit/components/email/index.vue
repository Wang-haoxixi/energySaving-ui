<template>
  <iep-dialog :dialog-show="dialogShow" title="发送通知" width="600px" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="form-detail">
      <iep-form-item label-name="类型">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">面试通知</el-radio>
          <el-radio :label="1">其他通知</el-radio>
        </el-radio-group>
      </iep-form-item>
      <el-form-item label="模板名称：">
        <el-select v-model="theme" placeholder="请输入模板主题名称" :loading="loading">
          <el-option
            v-for="item in themeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="handleChange(item)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收件人：">{{personData.realName}}</el-form-item>
      <el-form-item label="标题：" prop="theme">
        <el-input v-model="formData.theme" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          maxlength="500"
          :rows="5"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="附带信息：" v-if="formData.type === 0" prop="invitationTime">
        <div class="incidental">
          <div class="incidental-item">
            <div class="incidental-label">职位名称：</div>
            <div class="incidental-span">{{transformString(recruitData.name)}}</div>
          </div>
          <div class="incidental-item">
            <div class="incidental-label">面试时间：</div>
            <div class="incidental-span">
              <el-date-picker
                v-model="formData.invitationTime"
                type="datetime"
                placeholder="选择面试时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
          </div>
          <div class="incidental-item">
            <div class="incidental-label">面试地点：</div>
            <div class="incidental-span">{{formData.address}}</div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button type="primary" @click="submitForm" :loading="loadState">发送</el-button>
      <iep-button @click="resetForm" :loading="loadState">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { initFormData, rules } from "./options";
import { mapGetters } from "vuex";
import { getMailDataById, sendNotice } from "@/api/dms/recruit";
import { getRecruitDetail } from "@/api/dms/recruit_query";
import { transformString } from "@/util/dataDeal";

export default {
  components: {},
  data() {
    return {
      dialogShow: false,
      loadState: false,
      formData: initFormData(),
      rules,
      theme: "",
      themeList: [],
      loading: false,
      personData: {},
      recruitData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    transformString,
    open(row = {}) {
      this.dialogShow = true;
      this.personData = { ...row };
      // 若存在职位id，获取职位信息
      this.getRecruitById(row.recruitId);
    },
    resetForm() {
      this.theme = "";
      this.personData = {};
      this.formData = initFormData();
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.orgId = this.userInfo.orgId;
          row.receiveId = this.personData.userId;
          row.recruitId = this.recruitData.recruitId;
          sendNotice(row).then(({ data }) => {
            this.loadState = false;
            if (data) {
              this.$message.success("发送成功！");
            }
            this.resetForm();
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
    // 获取模板
    getMailPage() {
      getMailDataById({
        orgId: this.userInfo.orgId,
        type: this.formData.type,
      }).then(({ data }) => {
        this.loading = false;
        this.themeList = [...data];
      });
    },
    remoteMethod(query) {
      this.getMailPage(query);
    },
    handleChange(row) {
      const { theme, content } = row;
      this.formData.theme = theme;
      this.formData.content = content;
    },
    getRecruitById(id) {
      getRecruitDetail({
        recruitId: id,
      }).then(({ data }) => {
        this.recruitData = { ...data };
        this.formData.address =
          (data.workplace || "") + (data.detailedAddress || "");
        this.formData.longitude = data.longitude;
        this.formData.latitude = data.latitude;
      });
    },
  },
  created() {
    this.getMailPage();
  },
  watch: {
    "formData.type"(val) {
      this.getMailPage();
      const row = initFormData();
      row.type = val;
      this.$set(this, "formData", row);
      this.theme = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.incidental {
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  padding: 15px;
  width: 100%;
  .incidental-item {
    font-size: 14px;
    color: $--color-text-regular;
    display: flex;
    .incidental-span {
      flex: 1;
      &::v-deep .el-input {
        width: 100%;
      }
    }
  }
}
</style>