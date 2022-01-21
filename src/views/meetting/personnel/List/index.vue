<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      searchName="name"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dcitsMapPersonnel"
      :columnsMap="columnsMap"
      :loadFunction="getActivityUserPage"
      :isMutipleSelection="false"
      :useRoutePage="false"
      :operationWidth="150"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
      <template #user="{scope}">
        <div style="display: flex">
          <iep-img style="width:40px;height:40px;" :resizeOpt="{l:40}" :src="scope.row.avatar"></iep-img>
          <div style="margin-left: 11px;flex:1;">
            <div>{{scope.row.userName}}</div>
            <div v-if="scope.row.userCompany">{{scope.row.userCompany}}</div>
            <div v-else>暂无公司信息</div>
          </div>
        </div>
      </template>
      <template #createTime="{scope}">
        <div>{{scope.row.createTime|parseToTimeMinutes}}</div>
      </template>
      <template #signUp="{scope}">
        <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
      </template>
      <template #soRemarks="{scope}">
        <MemberRemarksColumn :scope="scope" @load-page="loadPage()"></MemberRemarksColumn>
      </template>
    </iep-crud-table>
    <CheckDialogForm ref="CheckDialogForm" @load-page="loadPage()"></CheckDialogForm>
    <DialogForm ref="dialogForm" @close="handleClose">
      <el-radio-group
        style="margin-bottom:20px;"
        v-model="currentIndex"
        slot="tab"
        @change="handleChangeIndex"
      >
        <el-radio-button
          v-for="(m,index) of infoData"
          :label="index"
          :key="'tab'+index"
        >{{m[0].value}}</el-radio-button>
      </el-radio-group>
    </DialogForm>
    <dialog-chart ref="DialogChart" title="数据统计"></dialog-chart>
  </div>
</template>
<script>
import { personnelOptions, dcitsMapPersonnel } from "../options";
import operationMixins from "@/mixins/operationMixins";
import {
  deleteEnroll,
  // getDownload,
  getActivityUserPageById,
} from "@/api/meetting/enroll";
import { contactsByEnrole, enroleFormDownload } from "@/api/meetting/form";
import { enroleAudit } from "@/api/meetting/enroll";
import { payment, getSignInCodeById } from "@/api/meetting/ticket";
import MemberRemarksColumn from "../../Components/MemberRemarksColumn";
import CheckDialogForm from "./CheckDialogForm";
import DialogForm from "@/views/meetting/publish/Components/DialogForm.vue";

import AdvanceSearch from "./AdvanceSearch";
import DialogChart from "./DialogChart";
import { parseDate } from "@/filters/index";
export default {
  components: {
    MemberRemarksColumn,
    CheckDialogForm,
    AdvanceSearch,
    DialogChart,
    DialogForm,
  },
  mixins: [operationMixins],
  props: {
    conferenceId: {
      type: Number,
      required: true,
    },
    conferenceName: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dcitsMapPersonnel,
      columnsMap: personnelOptions,
      detailForm: {},
      infoData: [],
      currentIndex: 0,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "导出名单",
          func: this.handleExport,
        },
        {
          name: "数据统计",
          func: this.handleShowDialog,
        },
      ],
      operationOptions: [
        {
          name: "确认收款",
          func: this.handlePayment,
          hidden: (row) => {
            return !(row.orderStatus === "0" && row.paymentMethod === "9");
          },
        },
        {
          name: "核销签到",
          func: this.handleCheck,
          hidden: (row) => {
            const a = row.cancelNum.split("/");
            return (
              a[0] === a[1] ||
              !(row.orderStatus === "1" && ["0", "2"].includes(row.auditStatus))
            );
          },
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: (row) => {
            return !(row.orderStatus === "3");
          },
        },
        {
          name: "通过",
          func: this.handlePass,
          hidden: (row) => {
            return !(row.orderStatus === "1" && row.auditStatus === "1");
          },
        },
        {
          name: "拒绝",
          func: this.handleReject,
          hidden: (row) => {
            return !(row.orderStatus === "1" && row.auditStatus === "1");
          },
        },
        {
          name: "查看理由",
          func: this.handleReason,
          hidden: (row) => {
            return !(row.orderStatus === "1" && row.auditStatus === "3");
          },
        },
        {
          name: "重新审核",
          func: this.handleReAudit,
          hidden: (row) => {
            return !(
              row.orderStatus === "1" && ["2", "3"].includes(row.auditStatus)
            );
          },
        },
      ],
      timeRange: {},
    };
  },
  computed: {
    getActivityUserPage() {
      return getActivityUserPageById(this.conferenceId);
    },
  },
  methods: {
    async handleCheck(row) {
      const { data } = await getSignInCodeById(row.id);
      const checkedOrderNoList = data
        .filter((m) => m.writeOffStatus === "1")
        .map((m) => m.orderNo);
      const allOrderNoList = data.map((m) => m.orderNo);
      this.$refs["CheckDialogForm"].checkedOrderNoList = checkedOrderNoList;
      this.$refs["CheckDialogForm"].disabledOrderNoList = checkedOrderNoList;
      this.$refs["CheckDialogForm"].allOrderNoList = allOrderNoList;
      this.$refs["CheckDialogForm"].checkAll = false;
      this.$refs["CheckDialogForm"].dialogShow = true;
    },
    handleExport() {
      this.$confirm("是否导出名单", "导出名单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const d = new Date();
        enroleFormDownload(
          {
            conferenceId: this.conferenceId,
          },
          `${this.conferenceName}报名名单${parseDate(d, "YYYYMMDD")}`,
        );
      });
    },
    handlePayment(row) {
      const data = [row.id];
      this._handleComfirm(data, payment, "收到款项");
    },
    async handleDel(row) {
      const data = { enroleIds: [row.id] };
      await this._handleComfirm(data, deleteEnroll, "删除名单");
      this.$emit("load-page");
      // this.loadParentPage();
      // 刷新
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleShowDialog() {
      this.timeRange.startTime = this.data.createTime;
      this.timeRange.endTime = this.data.endTime;
      this.$refs["DialogChart"].conferenceId = this.conferenceId;
      this.$refs["DialogChart"].dialogShow = true;
      this.$refs["DialogChart"].timeRange = this.timeRange;
      this.$refs["DialogChart"].init();
    },
    async showDetail(row) {
      const { data } = await contactsByEnrole(row.id);
      if (data) {
        this.infoData = data.map((m) => m.formItems);
        const ref = this.$refs["dialogForm"];
        this.currentIndex = 0;
        ref.form = this.infoData[this.currentIndex];
        ref.dialogTitle = "查看信息";
        ref.status = "view";
        ref.dialogShow = true;
      }
    },
    handleChangeIndex(index) {
      this.$refs["dialogForm"].form = this.infoData[index];
    },
    handleClose() {
      this.currentIndex = 0;
      this.infoData = [];
    },
    // 通过
    handlePass(row) {
      const params = {
        auditType: "1",
        enroleId: row.id,
      };
      this._handleComfirm(params, enroleAudit, "通过");
    },
    // 驳回
    handleReject(row) {
      const params = {
        auditType: "2",
        enroleId: row.id,
      };
      this._handleComfirmINPUT(
        params,
        enroleAudit,
        "驳回",
        "请输入拒绝理由，您填写的内容将会告知参会者",
      );
    },
    // 查看驳回理由
    handleReason(row) {
      this.$alert(row.auditRemark || "", "驳回理由", {
        confirmButtonText: "确定",
        callback: () => {},
      });
    },
    // 重新审核
    handleReAudit(row) {
      if (row.auditStatus === "2") {
        this.handleReject(row);
      } else if (row.auditStatus === "3") {
        this.handlePass(row);
      }
      // this.$confirm("是否重新审核?", "提示", {
      //   distinguishCancelAndClose: true,
      //   confirmButtonText: `${row.auditStatus === "2" ? "拒绝" : "通过"}`,
      //   cancelButtonText: "取消",
      // })
      //   .then(() => {
      //     const timer = setTimeout(() => {
      //       if (row.auditStatus === "2") {
      //         this.handleReject(row);
      //       } else if (row.auditStatus === "3") {
      //         this.handlePass(row);
      //       }
      //       clearTimeout(timer);
      //     }, 200);
      //   })
      //   .catch(() => {});
    },
    // 驳回理由弹窗
    _handleComfirmINPUT(params, optFunction, msg, detailMsg, feelbackMsg) {
      const textLimit = 50;
      this.$prompt(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputType: "textarea",
        inputPlaceholder: `请填写${msg}理由，不超过${textLimit}字`,
        inputValidator: (val) => {
          if (val && val.length > textLimit) {
            return `${msg}理由不能超过${textLimit}字，当前${val.length}字`;
          } else if (!val) {
            return `${msg}理由不能为空`;
          } else {
            return true;
          }
        },
        closeOnClickModal: false,
      })
        .then(async ({ value }) => {
          const data = await optFunction({ remark: value, ...params }, value);
          if (data.data) {
            this.$message({
              type: "success",
              message: feelbackMsg || `${msg}成功!`,
            });
          }
          this.loadPage();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.infoTitle {
  border-top: #e6e6e6 1px solid;
  display: flex;
  flex-direction: column;
  margin-top: -30px;
  .infoTitleAvatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
}
.personalCard {
  padding: 5px;
}
</style>
