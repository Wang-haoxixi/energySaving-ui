<template>
  <div class="notice">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        searchName="title"
        :loadFunction="getNoticePageByOrgId(userInfo.orgId)"
        :isMutipleSelection="false"
        placeholder="请输入主题进行搜索"
      >
        <template #name="{scope}">
          <div @click="handleShow(scope.row)" style="display:flex;align-items: center;">
            <iep-div-detail :value="scope.row['name']" style="cursor: pointer;"></iep-div-detail>
            <el-tag size="mini" v-if="scope.row.isTop" style="margin-left:10px;">置顶</el-tag>
          </div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <IepDialogSendNotice ref="IepDialogSendNotice" @load-page="loadPage()"></IepDialogSendNotice>
  </div>
</template>
<script>
import { getNoticePageByOrgId, updateTop, updateDown } from "@/api/ims/message";
import { mapGetters } from "vuex";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        {
          name: row => {
            if (row.isTop) {
              return "取消置顶";
            } else {
              return "置顶";
            }
          },
          func: this.handleTopAndDown,
        },
        {
          name: "编辑",
          func: this.handleEdit,
        },
      ],
      dictsMap: {},
      columnsMap: [
        {
          prop: "name",
          label: "主题",
          type: "slot",
        },
        {
          prop: "time",
          label: "时间",
          width: 240,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    getNoticePageByOrgId,
    handleShow(row) {
      this.$openPage(`/spa/notice/${row.id}`);
    },
    handleEdit(row) {
      this.$refs["IepDialogSendNotice"].selfEdit(row.id);
    },
    handleAdd() {
      this.$refs["IepDialogSendNotice"].selfAdd();
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleTopAndDown(row) {
      console.log(row);
      if (row.isTop) {
        this.handleDown(row.id);
      } else {
        this.handleTop(row.id);
      }
    },
    handleTop(id) {
      this._handleComfirm(id, updateTop, "置顶");
    },
    handleDown(id) {
      this._handleComfirm(id, updateDown, "取消置顶");
    },
  },
};
</script>
