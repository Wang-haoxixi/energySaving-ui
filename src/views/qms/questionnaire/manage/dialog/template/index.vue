<template>
  <div>
    <iep-dialog :dialog-show="dialogShow" title="选择问卷模板" width="54%" @close="close()">
      <div v-loading="loading">
        <iep-operation-container>
          <template slot="right">
            <iep-operation-search @search-page="searchPage" :paramForm="searchForm" prop="name">
              <advance-search @search-page="searchPage" ref="advanceSearch"></advance-search>
            </iep-operation-search>
          </template>
        </iep-operation-container>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
          :dictsMap="dictsMap"
        >
          <template #status="{scope}">{{dictsMap.status[scope.row.status] || '暂无'}}</template>
          <iep-operation-table-btn-group :options="operationOptions" :width="150"></iep-operation-table-btn-group>
        </iep-table>
      </div>
    </iep-dialog>
    <dialog-view ref="dialogView" :disabled="false" title="预览"></dialog-view>
  </div>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import mixins from "@/mixins/mixins";
import AdvanceSearch from "./components/advanceSearch";
import { getTemplatePage } from "@/api/qms/questionnaire";
import DialogView from "../view/dialog";
import { getDataById } from "@/api/qms/questionnaire";
import { dictsMap } from "../../const/options";
import { mapGetters } from "vuex";
export default {
  mixins: [formMixins, mixins],
  components: {
    AdvanceSearch,
    DialogView,
  },
  data() {
    return {
      dialogShow: false,
      loading: false,
      pagedTable: [],
      form: {},
      dictsMap,
      columnsMap: [
        {
          prop: "name",
          label: "问卷名称",
        },
        {
          prop: "userName",
          label: "创建人",
          width: "150",
        },
        {
          prop: "status",
          label: "问卷状态",
          type: "slot",
          width: "120",
        },
      ],
      operationOptions: [
        {
          name: "选择",
          func: this.handleChoose,
          type: "choose",
        },
        {
          name: "预览",
          func: this.handleView,
          type: "view",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    loadPage(params = this.searchForm) {
      this.loadTable(params, getTemplatePage);
    },
    getDataById(id) {
      // this.loading = true;
      return new Promise((resolve, reject) => {
        getDataById(id)
          .then(data => {
            if (data.code === 0) {
              resolve(data.data);
            } else {
              reject(data);
            }
            // this.loading = false;
          })
          .catch(() => {
            // this.loading = false;
          });
      });
    },
    open() {
      this.dialogShow = true;
      this.loadPage();
    },
    close() {
      this.$refs.advanceSearch.initSearchForm();
      this.dialogShow = false;
    },
    // 选择
    handleChoose(row) {
      // console.log("选额");
      this.loading = true;
      this.getDataById(row.id)
        .then(data => {
          this.$emit("choose", data);
          this.close();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 预览
    handleView(row) {
      this.$refs.dialogView.open(row.id);
    },
  },
};
</script>
