<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
      </template>
      <template slot="right">
        <iep-table-density></iep-table-density>
        <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      is-mutiple-selection
    >
      <template #title="{scope}">
        <span @click="handleLink(scope.row)">{{scope.row.title}}</span>
      </template>
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <info-dialog ref="InfoDialog" @save="loadPage"></info-dialog>
  </div>
</template>
<script>
const columnsMap = [
  {
    prop: "title",
    label: "资讯标题",
    type: "slot",
  },
  {
    prop: "priority",
    label: "优先级",
  },
  {
    prop: "viewTimes",
    label: "浏览次数",
  },
];
import { pageOption } from "@/const/pageConfig";
import InfoDialog from "./InfoDialog";
import operationMixins from "@/mixins/operationMixins";
import {
  getPage,
  delPageById,
  createPage,
  updatePage,
  postViewTimes,
} from "@/api/dms/custom_information.ts";
import { mapGetters } from "vuex";
export default {
  components: {
    InfoDialog,
  },
  mixins: [operationMixins],
  data() {
    return {
      checked: true,
      pagedTable: [],
      columnsMap,
      pageOption: pageOption(),
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleMoreDel,
          disabled: true,
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
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "tableSize"]),
    dms_followup_status() {
      return this.dictGroup.get("dms_followup_status");
    },
    id() {
      return +this.$route.params.id;
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleAdd() {
      this.$refs["InfoDialog"].dialogShow = true;
      this.$refs["InfoDialog"].fnRequest = createPage;
    },
    handleLink(row) {
      window.location.href = row.linkAddress;
      postViewTimes(row.informationId);
    },
    handleEdit(row) {
      this.$refs["InfoDialog"].dialogShow = true;
      this.$refs["InfoDialog"].fnRequest = updatePage;
      this.$refs["InfoDialog"].informationId = row.informationId;
      this.$refs["InfoDialog"].loadDetail();
    },
    handleDel(row) {
      this._handleComfirm(row.informationId, delPageById, "删除资讯");
    },
    async loadPage(param = this.searchForm, fn = (m) => m) {
      this.isLoadTable = true;
      const { data } = await getPage({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records, size, total, current } = data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
  },
};
</script>
