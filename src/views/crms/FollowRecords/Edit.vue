<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${methodName}跟进记录`" :backOption="backOption"></iep-page-header>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        class="iep-form-detail"
        style="margin-right: 16%;"
      >
        <iep-form-item label-name="主题" prop="theme">
          <el-input v-model="form.theme"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="日期" prop="followTime">
          <iep-date-picker v-model="form.followTime" type="date" placeholder="选择日期"></iep-date-picker>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="下次跟进日期" prop="nextTime">
          <iep-date-picker v-model="form.nextTime" type="date" placeholder="选择日期"></iep-date-picker>
        </iep-form-item>
        <iep-form-item v-if="isShow" class="form-half" label-name="跟进客户" prop="clientId">
          <IepCommonSelect v-model="form.clientId" prefixUrl="dms/client/page" id="clientId"></IepCommonSelect>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="跟进联系人" prop="contactId">
          <IepCommonSelect
            v-model="form.contactId"
            prefixUrl="dms/client_follow/contact_page"
            id="contactId"
            :optId="this.form.clientId"
          ></IepCommonSelect>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="跟进方式" prop="followWay">
          <iep-dict-select v-model="form.followWay" dict-name="dms_followup_type" clearable></iep-dict-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="跟进状态" prop="followStatus">
          <iep-dict-select v-model="form.followStatus" dict-name="dms_followup_status" clearable></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="内容" prop="content">
          <el-input v-model="form.content" type="textarea"></el-input>
        </iep-form-item>
        <iep-form-item label-name="附件">
          <iep-upload v-model="form.attachFileList" :limit="1" action="/api/admin/file/upload"></iep-upload>
        </iep-form-item>
        <iep-form-item label-name="转发">
          <div>111</div>
        </iep-form-item>
      </el-form>
      <iep-basic-container>
        <iep-operation-container>
          <template slot="left">
            <iep-button type="primary" plain>关联会议纪要</iep-button>
            <iep-button>新增会议纪要</iep-button>
            <!-- <iep-button>删除</iep-button> -->
          </template>
        </iep-operation-container>
        <iep-table
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :isPagination="isPagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
        >
          <el-table-column prop="operation" label="操作">
            <template>
              <iep-operation-wrapper>
                <el-button type="text">取消</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
      <IepFooterBar style="margin-top:30px">
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <iep-button>取消</iep-button>
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { initForm, rules, columnsMeetingMap } from "./options.ts";
import {
  updatePage,
  createPage,
  getPageById,
} from "@/api/dms/custom_follow.ts";
export default {
  mixins: [mixins],
  data() {
    return {
      rules,
      columnsMap: columnsMeetingMap,
      form: initForm(),
      backOption: {
        isBack: true,
      },
      isShow: true,
      isLoadTable: false,
      isPagination: false,
      pagedTable: [""],
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
    isMy() {
      return this.$route.query.my;
    },
    clientId() {
      return this.$route.query.clientId;
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      if (this.isMy) {
        this.isShow = false;
        this.form.clientId = Number(this.clientId);
      }
      if (this.isEdit) {
        this.loadDetailPage();
      }
    },
    loadDetailPage() {
      getPageById(this.id).then(res => {
        this.form = this.$mergeByFirst(this.form, res.data);
      });
    },
    async submitForm() {
      const fnRequest = this.isEdit ? updatePage : createPage;
      fnRequest(this.form).then(res => {
        try {
          if (res.data) {
            this.$message({
              type: "success",
              message: `${this.methodName}成功!`,
            });
            this.$router.go(-1);
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
