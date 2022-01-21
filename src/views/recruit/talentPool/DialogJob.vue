<template>
  <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="500px" @close="_close()">
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :dictsMap="dictsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template slot="name" slot-scope="scope">
        <div>{{trantfName(scope.scope.row.name)}}</div>
      </template>
      <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="140"></IepOperationTableBtnGroup>
    </iep-table>
  </iep-dialog>
</template>
<script>
import { getRecruitPageByOrgId } from "@/api/dms/recruit";
import { initSearchForm, dictsMap } from "@/views/recruit/jobList/options";
import { ifUserLinkUp } from "@/api/dms/recruit_linkup";
import { postMsgCustomInitiate } from "@/api/ims/rong";
import mixins from "@/mixins/mixins";
import { mapActions, mapGetters } from "vuex";
const columnsMap = [
  {
    prop: "name",
    label: "职位名称",
    type: "slot",
  },
];
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      dialogTitle: "选择职位",
      jobList: [],
      columnsMap,
      dictsMap,
      targetId: 0,
      operationOptions: [
        {
          name: "选择",
          func: this.handleChoose,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId"]),
    _close() {
      this.dialogShow = false;
    },
    loadPage(params = this.queryForm) {
      this.isLoadTable = false;
      params.orgId = this.userInfo.orgId;
      this.loadTable(
        Object.assign({}, initSearchForm(), params),
        getRecruitPageByOrgId,
      );
    },
    trantfName(val) {
      const list = val.split("-");
      return list[list.length - 1];
    },
    async handleChoose(row) {
      this._close();
      if (this.targetId === this.userInfo.userId) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: this.targetId + "",
          type: 1,
        });
        const params1 = {
          targetId: this.targetId,
          recruitId: row.recruitId,
        };
        const { data } = await ifUserLinkUp(params1);
        if (!data) {
          const params2 = {
            dataId: row.recruitId,
            targetId: this.targetId,
            beforePage: 1,
          };
          await postMsgCustomInitiate(params2);
        }
      }
    },
  },
};
</script>