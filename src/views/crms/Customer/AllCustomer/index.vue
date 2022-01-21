<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
      </template>
      <template slot="right">
        <iep-table-density></iep-table-density>
        <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
        <iep-operation-search placeholder="请输入关键词" prop="name" @search-page="searchPage"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      is-mutiple-selection
    >
      <template #name="{scope}">
        <div class="client-name">
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
        <span>{{ dms_district_type.map(m => m.label)[scope.row.area] || "暂无" }}</span>
      </template>
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <transfer ref="transfer"></transfer>
  </div>
</template>

<script>
import Transfer from "../Components/Transfer";
import { getAllPage } from "@/api/dms/custom";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsAllMap } from "../options";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  components: {
    Transfer,
  },
  mixins: [operationMixins, mixins],
  data() {
    return {
      columnsMap: columnsAllMap,
      pagedTable: [],
      commonOptions: [
        {
          name: "指示",
          func: this.handleAdd,
          hidden: false,
          disabled: true,
          batchOperation: true,
        },
        // {
        //   name: "转移",
        //   func: this.handleTransfer,
        //   hidden: false,
        //   disabled: false,
        //   batchOperation: true,
        // },
      ],
      operationOptions: [
        {
          name: "查看",
          func: this.handleDetail,
          hidden: false,
          disabled: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "tableSize"]),
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
    },
    client_info_all: () => hasPermissions("client_info_all"),
    dms_client_relations() {
      return this.dictGroup.get("dms_client_relations");
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = this.searchForm, fn = m => m) {
      if (this.client_info_all) {
        this.isLoadTable = true;
        const { data } = await getAllPage({
          ...param,
          ...this.pageOption,
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
      }
    },
    handleDetail(row) {
      this.$openPage(`/crms/all_customer_detail/${row.clientId}`);
    },
  },
};
</script>
<style lang="scss" scoped>
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
  }
}
</style>
