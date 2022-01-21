<template>
  <div class="custom">
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      rowId="clientId"
      :loadFunction="getAssistPage"
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
  </div>
</template>

<script>
import { getAssistPage } from "@/api/dms/custom.ts";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "../options";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  data() {
    return {
      columnsMap,
      commonOptions: [],
      operationOptions: [
        {
          name: "分配",
          func: this.handleEdit,
          hidden: false,
          disabled: true,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: false,
          disabled: true,
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
    getAssistPage,
    handleAdd() {
      this.$openPage(`/crms/custom_edit/0?customType=${"ColCustomer"}`);
    },
    handleEdit(row) {
      this.$openPage(
        `/crms/custom_edit/${row.clientId}?customType=${"ColCustomer"}`,
      );
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
.custom ::v-deep {
  .operation-container {
    position: absolute;
    top: -56px;
    right: 0;
  }
}
</style>
