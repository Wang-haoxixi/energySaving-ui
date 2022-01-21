<template>
  <div class="product-manage">
    <iep-table
      :isLoadTable="tableLoading"
      :isPagination="false"
      :pagedTable="pendingList"
      :columnsMap="columnsMap"
    >
      <template #category="{scope}">
        <span>{{category(scope.row)}}</span>
      </template>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getProductCertifyPage } from "@/api/dms/product";
import { columnsMapProduct as columnsMap } from "../options";
import { typesMap } from "@/views/cpms/options";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  data() {
    return {
      pendingList: [],
      dialogShow: false,
      loading: false,
      dialogObj: {},
      columnsMap,
      tableLoading: false,
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
  },
  methods: {
    async getPage() {
      this.tableLoading = true;
      const { data } = await getProductCertifyPage();
      if (data) {
        this.pendingList = data.records;
      }
      this.tableLoading = false;
    },
    category({ type, category }) {
      return (
        (type &&
          category &&
          this.dictGroup
            .get(typesMap.find(m => m.key == type).category)
            .find(m => m.value == category).label) ||
        "暂无"
      );
    },
    handleCheck() {
      this.$openPage(`/conm/certified_product`);
    },
    backPage() {
      this.dialogShow = false;
    },
    _close() {
      this.getPage();
      this.dialogShow = false;
    },
  },
  created() {
    this.getPage();
  },
};
</script>
<style lang="scss" scoped>
</style>
