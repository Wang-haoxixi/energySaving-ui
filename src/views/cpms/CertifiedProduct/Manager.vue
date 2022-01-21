<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`${dialogTitle}管理（排序操作为动态保存）`"
    width="700px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <iep-table
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :isPagination="false"
    >
      <template #topImage="{scope}">
        <el-popover width="400" trigger="click">
          <iep-img :src="scope.row.topImage"></iep-img>
          <iep-img slot="reference" class="thumb-img" :src="scope.row.topImage"></iep-img>
        </el-popover>
        <el-button class="revise-btn iep-btn-xs" @click="handleEdit(scope.row)">修改{{dialogTitle}}图</el-button>
      </template>
      <template #recommendImage="{scope}">
        <el-popover width="400" trigger="click">
          <iep-img :src="scope.row.recommendImage"></iep-img>
          <iep-img slot="reference" class="thumb-img" :src="scope.row.recommendImage"></iep-img>
        </el-popover>
        <el-button class="revise-btn iep-btn-xs" @click="handleEdit(scope.row)">修改{{dialogTitle}}图</el-button>
      </template>

      <iep-operation-table-btn-group :options="operationOptions" :count="3" :width="150"></iep-operation-table-btn-group>
    </iep-table>
    <TopAndRecommand ref="TopAndRecommand" @load-page="loadPage()"></TopAndRecommand>
  </iep-dialog>
</template>
<script>
import {
  getTopRecommandList,
  setOrderTopRecommandProduct,
  removeTopProduct,
  removeRecommandProduct,
  updateUpTopRecommandProduct,
} from "@/api/dms/product";
import operationMixins from "@/mixins/operationMixins";
import TopAndRecommand from "./TopAndRecommand";
// 节流函数
// 函数柯里化 curry
export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const tM = {
  1: {
    imgProp: "topImage",
    imgLabel: "置顶",
  },
  2: {
    imgProp: "recommendImage",
    imgLabel: "推荐",
  },
};
export default {
  mixins: [operationMixins],
  components: {
    TopAndRecommand,
  },
  data() {
    return {
      type: 1, // 1 置顶 2 推荐
      dialogShow: false,
      isLoadTable: false,
      moveLoading: false,
      pagedTable: [],
      operationOptions: [
        {
          name: "上移",
          func: this.handleUp,
        },
        {
          name: "下移",
          func: this.handleDown,
        },
        {
          name: "移除",
          func: this.handleRemove,
        },
      ],
    };
  },
  computed: {
    dialogTitle() {
      return tM[this.type].imgLabel;
    },
    columnsMap() {
      return [
        {
          prop: "id",
          label: "ID",
          width: 55,
        },
        {
          prop: "name",
          label: "名称",
          width: 200,
        },
        {
          prop: tM[this.type].imgProp,
          label: tM[this.type].imgLabel + "图",
          type: "slot",
        },
      ];
    },
    ids() {
      return this.pagedTable.map(m => m.id);
    },
  },
  mounted() {
    this.$watch(
      "ids",
      debounce(async ids => {
        if (this.moveLoading) {
          const form = {
            ids,
            type: String(this.type),
          };
          const { data } = await setOrderTopRecommandProduct(form);
          if (data) {
            this.$message("正在保存当前排序...");
            this.loadPage();
          }
          this.moveLoading = false;
        }
      }, 1500),
    );
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleUp(scope) {
      const i = this.pagedTable.findIndex(m => scope.id === m.id);
      const f = this.pagedTable.splice(i, 1)[0];
      const idx = i - 1 > 0 ? i - 1 : 0;
      this.pagedTable.splice(idx, 0, f);
      this.moveLoading = true;
    },
    handleDown(scope) {
      const i = this.pagedTable.findIndex(m => scope.id === m.id);
      const n = this.pagedTable.length - 1;
      const f = this.pagedTable.splice(i, 1)[0];
      const idx = i + 1 < n ? i + 1 : n;
      this.pagedTable.splice(idx, 0, f);
      this.moveLoading = true;
    },
    handleRemove(row) {
      const removeFuncion =
        this.type === 1 ? removeTopProduct : removeRecommandProduct;
      this._handleComfirm(row.id, removeFuncion, "移除");
    },
    handleEdit(row) {
      this.$refs["TopAndRecommand"].form.id = row.id;
      this.$refs["TopAndRecommand"].form.type = this.type;
      this.$refs["TopAndRecommand"].form.imageUrl = row[tM[this.type].imgProp];
      this.$refs["TopAndRecommand"].formRequestFn = updateUpTopRecommandProduct;
      this.$refs["TopAndRecommand"].dialogShow = true;
    },
    async loadPage() {
      this.isLoadTable = true;
      const { data } = await getTopRecommandList(this.type);
      this.pagedTable = data;
      this.isLoadTable = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.thumb-img {
  width: 50px;
  height: 50px;
  border: 1px solid $--border-color;
  border-radius: 10px;
}
.revise-btn {
  margin-left: 10px;
}
</style>
