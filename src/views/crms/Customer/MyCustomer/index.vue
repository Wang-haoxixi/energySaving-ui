<template>
  <div class="custom">
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      rowId="clientId"
      :loadFunction="getCustomPage"
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
          dms_district_type.map(m => m.label)[scope.row.area-1] || "暂无"
          }}
        </span>
      </template>
    </iep-crud-table>
    <transfer ref="transfer" @save="loadPage"></transfer>
  </div>
</template>

<script>
import Transfer from "../Components/Transfer";
import {
  getCustomPage,
  deleteCustomById,
  getTransfer,
} from "@/api/dms/custom.ts";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "../options";
import { mapGetters } from "vuex";
export default {
  components: {
    Transfer,
  },
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "转移",
          func: this.handleTransfer,
          batchOperation: true,
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
    ...mapGetters(["dictGroup"]),
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
    },
    dms_client_relations() {
      return this.dictGroup.get("dms_client_relations");
    },
  },
  methods: {
    getCustomPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleTransfer() {
      this.$refs["transfer"].dialogShow = true;
      this.$refs["transfer"].fnRequest = getTransfer;
      this.$refs["transfer"].ids = this.$refs["CrudTable"].multipleSelection;
    },
    handleAdd() {
      this.$openPage(`/crms/custom_edit/0?customType=${"MyCustomer"}`);
    },
    handleEdit(row) {
      this.$openPage(
        `/crms/custom_edit/${row.clientId}?customType=${"MyCustomer"}`,
      );
    },
    handleDetail(row) {
      this.$openPage(`/crms/custom_detail/${row.clientId}`);
    },
    handleDel(row) {
      this._handleComfirm(row.clientId, deleteCustomById, "删除客户");
    },
  },
};
</script>
<style scoped lang="scss">
.custom {
  .client-name {
    width: 400px;
    cursor: pointer;
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
