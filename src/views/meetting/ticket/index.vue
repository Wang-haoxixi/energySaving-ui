<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-table
        :isPagination="false"
        :isLoadTable="activityLoading"
        :columnsMap="columnsMap"
        :pagedTable="meetTable"
        :dictsMap="dictsMap"
        row-key="id"
        style="margin-top: 28px;"
      >
        <template #poster="{scope}">
          <ActivityImgColumn :scope="scope"></ActivityImgColumn>
        </template>
        <template #detail="{scope}">
          <ActivityInfoColumn :scope="scope" isPublish></ActivityInfoColumn>
        </template>
        <template #statusFlag="{scope}">
          <ActivityStatusColumn :scope="scope"></ActivityStatusColumn>
        </template>
        <template #auditStatus="{scope}">
          <ActivityAuditColumn :scope="scope"></ActivityAuditColumn>
        </template>
      </iep-table>
      <iep-operation-common-group style="margin-top: 32px" :options="commonOptions"></iep-operation-common-group>
      <iep-table
        :isLoadTable="ticketLoading"
        :isPagination="false"
        :columnsMap="ticketColumnsMap"
        :pagedTable="ticketTable"
        style="margin-top: 15px;"
      >
        <template #tickName="{scope}">
          <TicketTypeColumn :scope="scope"></TicketTypeColumn>
        </template>
        <template #money="{scope}">
          <!-- <TicketMoneyColumn :scope="scope"></TicketMoneyColumn> -->
          <span v-if="scope.row.canMoney">{{scope.row.canMoney}}贝</span>
          <span v-if="scope.row.money&&scope.row.canMoney">/</span>
          <span v-if="scope.row.money">{{scope.row.money}}元</span>
          <span v-if="!scope.row.money&&!scope.row.canMoney">免费</span>
        </template>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
      <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
      <dialog-chart ref="DialogChart" title="票款统计"></dialog-chart>
    </iep-basic-container>
  </div>
</template>

<script>
import { columnsMap, ticketColumnsMap, dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import DialogChart from "./DialogChart";
import { getActivityById } from "@/api/meetting/publish";
import ActivityInfoColumn from "../Components/ActivityInfoColumn";
import ActivityImgColumn from "../Components/ActivityImgColumn";
import ActivityStatusColumn from "../Components/ActivityStatusColumn";
import ActivityAuditColumn from "../Components/ActivityAuditColumn";
import TicketTypeColumn from "../Components/TicketTypeColumn";
// import TicketMoneyColumn from "../Components/TicketMoneyColumn";
import {
  deleteTicket,
  getTicketById,
  putTicket,
  getTicketByAid,
  postTicket,
} from "@/api/meetting/ticket";
import { TicketDTO, toVoForm } from "./options";

export default {
  mixins: [operationMixins],
  components: {
    DialogChart,
    DialogForm,
    ActivityInfoColumn,
    ActivityImgColumn,
    ActivityStatusColumn,
    ActivityAuditColumn,
    TicketTypeColumn,
    // TicketMoneyColumn,
  },
  name: "index",
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsMap,
      ticketColumnsMap,
      dictsMap,
      activityLoading: false,
      ticketLoading: false,
      commonOptions: [
        {
          name: "新增",
          func: this.handleAdd,
          icon: "el-icon-plus",
        },
        {
          name: "票款统计",
          func: this.handleShowDialog,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      meetTable: [],
      ticketTable: [],
      timeRange: {},
    };
  },
  computed: {
    id() {
      return +this.$route.params.id || 0;
    },
  },
  methods: {
    async loadPage() {
      this.ticketLoading = true;
      const { data } = await getTicketByAid(this.id);
      this.ticketTable = data;
      this.ticketLoading = false;
    },
    async load() {
      this.activityLoading = true;
      const { data } = await getActivityById(this.id);
      this.timeRange.startTime = data.createTime;
      this.timeRange.endTime = data.endTime;
      await this.loadPage();
      this.meetTable = [data];
      this.activityLoading = false;
    },
    handleDel(row) {
      if (this.ticketTable.length === 1) {
        this.$message.info("至少需保留一张票");
        return;
      }
      const data = { ids: [row.id] };
      this._handleComfirm(data, deleteTicket, "删除票务");
    },
    handleAdd() {
      // if (this.ticketTable.length > 2) {
      //   this.$message.info("最多设置三种票");
      //   return;
      // }
      this.$refs["DialogForm"].form = this.$mergeByFirst(new TicketDTO(), {
        conferenceId: this.id,
      });
      this.$refs["DialogForm"].methodName = "添加票务";
      this.$refs["DialogForm"].formRequestFn = postTicket;
      this.$refs["DialogForm"].isEnroll = false;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const params = { id: row.id };
      const { data } = await getTicketById(params);
      this.$refs["DialogForm"].form = this.$mergeByFirst(
        new TicketDTO(),
        toVoForm(data),
      );
      this.$refs["DialogForm"].methodName = "编辑票务";
      this.$refs["DialogForm"].formRequestFn = putTicket;
      this.$refs["DialogForm"].isEnroll = data.number !== data.surplus;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleShowDialog() {
      this.$refs["DialogChart"].conferenceId = this.id;
      this.$refs["DialogChart"].dialogShow = true;
      this.$refs["DialogChart"].timeRange = this.timeRange;
      this.$refs["DialogChart"].init();
    },
  },
  created() {
    this.load();
  },
};
</script>
