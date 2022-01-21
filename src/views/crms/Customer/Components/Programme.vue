<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <el-dropdown>
          <el-button slot>
            添加方案
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLinkMlms">关联材料</el-dropdown-item>
            <el-dropdown-item @click.native="handleLocal">本地上传</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      is-mutiple-selection
      row-key="planId"
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <add-dialog ref="AddDialog" @save="loadPage"></add-dialog>
    <upload ref="Upload" @save="loadPage"></upload>
    <re-name-dialog ref="ReNameDialog" @save="loadPage"></re-name-dialog>
  </div>
</template>
<script>
const columnsMap = [
  {
    prop: "name",
    label: "方案",
  },
  {
    prop: "uploader",
    label: "上传者",
  },
  {
    prop: "createTime",
    label: "上传时间",
  },
  // {
  //   prop: "times",
  //   label: "浏览次数",
  // },
];
import AddDialog from "./AddDialog";
import Upload from "./upload";
import ReNameDialog from "./ReNameDialog";
import mixins from "@/mixins/mixins";
import { getPage, delPageById } from "@/api/dms/custom_plan.ts";
import { downloadUrl } from "@/api/common";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins, mixins],
  components: { AddDialog, Upload, ReNameDialog },
  data() {
    return {
      columnsMap,
      isLoadTable: false,
      selectList: [],
      pagedTable: [],
      operationOptions: [
        {
          name: "更新",
          func: this.handleEdit,
          hidden: false,
          disabled: false,
        },
        {
          name: "下载",
          func: this.handleGetFile,
          hidden: row => (row.planMainType === "file" ? false : true),
          disabled: false,
        },
        {
          name: "重命名",
          func: this.handleReName,
          hidden: row => (row.children ? false : true),
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: false,
          disabled: false,
        },
      ],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = this.searchForm) {
      this.isLoadTable = true;
      const { data } = await getPage(param);
      this.pagedTable = data.records;
      this.isLoadTable = false;
    },
    handleLinkMlms() {
      this.$refs["AddDialog"].dialogShow = true;
      this.$refs["AddDialog"].mlms = "mlms";
    },
    handleReName(row) {
      this.$refs["ReNameDialog"].id = row.planId;
      this.$refs["ReNameDialog"].dialogShow = true;
    },
    handleGetFile(row) {
      if (row.planMainType === "file") {
        downloadUrl(row.attach, row.name);
      }
    },
    handleEdit(row) {
      if (row.planMainType === "material") {
        this.$refs["AddDialog"].dialogShow = true;
        this.$refs["AddDialog"].parmas.planId = row.planId;
      }
      if (row.planMainType === "file") {
        this.$refs["Upload"].importDialogShow = true;
        this.$refs["Upload"].parmas.planId = row.planId;
      }
    },
    handleLocal() {
      this.$refs["Upload"].importDialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.planId, delPageById, "删除方案");
    },
  },
};
</script>
