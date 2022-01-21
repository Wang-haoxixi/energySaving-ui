<template>
  <div class="custom">
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      rowId="clientId"
      :loadFunction="getSeaPage"
    >
      <!-- <template #iep-crud-advance-search>
          <advance-search></advance-search>
      </template>-->
      <template #name="{scope}">
        <div class="client-name" @click="handleDetail(scope.row)">
          <el-tag
            type="danger"
            size="mini"
            class="level"
          >{{dms_client_relations.map(m => m.label)[scope.row.relation] || "暂无"}}</el-tag>
          <!-- <el-tag size="mini" class="level">重要</el-tag> -->
          <div class="info">
            <div class="name">{{ scope.row.name }}</div>
          </div>
        </div>
      </template>
      <template #area="{scope}">
        <span>
          {{
          dms_district_type.map(m => m.label)[scope.row.area] || "暂无"
          }}
        </span>
      </template>
    </iep-crud-table>
    <transfer ref="Transfer" @save="loadPage"></transfer>
  </div>
</template>

<script>
import Transfer from "../Components/Transfer";
import { getTransfer } from "@/api/dms/custom.ts";
import { getSeaPage, ClaimSeaById, deleteSeaById } from "@/api/dms/custom.ts";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "../options";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  components: {
    Transfer,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
    };
  },
  computed: {
    commonOptions() {
      return [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
          hidden: !this.client_sea_create,
        },
        {
          name: "导入",
          func: this.handleUpload,
          disabled: true,
        },
        {
          name: "机构库获取",
          func: this.handleAcquire,
          disabled: true,
        },
      ];
    },
    operationOptions() {
      return [
        {
          name: "分配",
          func: this.handleTransfer,
          hidden: !this.client_sea_distribute,
        },
        {
          name: "认领",
          func: this.handleClaim,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: !this.client_sea_delete,
        },
      ];
    },
    ...mapGetters(["dictGroup"]),
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
    },
    dms_client_relations() {
      return this.dictGroup.get("dms_client_relations");
    },
    client_sea_distribute: () => hasPermissions("client_sea_distribute"),
    client_sea_delete: () => hasPermissions("client_sea_delete"),
    client_sea_create: () => hasPermissions("client_sea_create"),
  },
  methods: {
    getSeaPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleAdd() {
      this.$openPage(`/crms/custom_edit/0?customType=${"HighSeas"}`);
    },
    handleTransfer(row) {
      this.$refs["Transfer"].dialogShow = true;
      this.$refs["Transfer"].fnRequest = getTransfer;
      this.$refs["Transfer"].methodName = "客户分配";
      this.$refs["Transfer"].dialogType = "highSeas";
      this.$refs["Transfer"].ids = [row.clientId];
    },
    async handleClaim(row) {
      this._handleComfirm(row.clientId, ClaimSeaById, "认领");
    },
    handleDel(row) {
      this._handleComfirm(row.clientId, deleteSeaById, "删除公海客户");
    },
  },
};
</script>
<style scoped lang="scss">
.custom {
  .client-name {
    width: 400px;
    .level {
      margin-right: 10px;
    }
    .info {
      display: inline-block;
      color: $--color-text-regular;
      .name {
        margin-bottom: 5px;
      }
      .tags {
        span {
          margin-right: 5px;
          padding: 2px 6px;
          border: 1px solid $--border-color;
        }
      }
    }
  }
}
</style>
