<template>
  <div>
    <el-table
      class="table"
      v-loading="isLoadTable"
      :border="border"
      :stripe="stripe"
      :data="pagedTable"
      style="width: 100%;"
      :header-cell-style="headerCellStyle"
      :default-expand-all="defaultExpand"
      v-bind="$attrs"
      v-on="$listeners"
      ref="IepTable"
    >
      <el-table-column v-if="isExpand" type="expand" :width="expandHidden?'1':''">
        <template slot-scope="props">
          <slot name="iepTableExpend" :scope="props.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isMutipleSelection"
        type="selection"
        :selectable="checkboxInit"
        width="55"
        :align="align"
      ></el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align"></el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <template v-for="(item, idx) in columnsMap">
        <el-table-column
          v-if="!item.hide"
          :key="idx"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="align"
          :prop="item.prop"
        >
          <template slot-scope="scope">
            <template v-if="item.type === 'dict'">
              <iep-div-detail :value="dictsMap[item.prop][scope.row[item.prop]]"></iep-div-detail>
            </template>
            <template v-else-if="item.type === 'dictGroup'">
              <div>{{ calculateDict(item, scope) }}</div>
            </template>
            <template v-else-if="item.type === 'img'">
              <iep-img class="table-img" :src="scope.row[item.prop]"></iep-img>
            </template>
            <template v-else-if="item.type === 'date'">
              <iep-div-detail :value="calculateDate(item, scope)"></iep-div-detail>
            </template>
            <template v-else-if="item.type === 'custom'">
              <iep-div-detail :value="calculateCustom(item, scope)"></iep-div-detail>
            </template>
            <template v-else-if="item.type === 'tag'">
              <iep-tag-detail :value="scope.row[item.prop]" :iep-type="item.iepType"></iep-tag-detail>
            </template>
            <template v-else-if="item.type === 'detail'">
              <detail :row="scope.row" :item="item"></detail>
            </template>
            <template v-else-if="item.type === 'slot'">
              <slot :name="item.prop" :scope="{row:scope.row, index: scope.$index}"></slot>
            </template>
            <template v-else>
              <iep-div-detail :value="scope.row[item.prop]" :nullmsg="item.nullmsg"></iep-div-detail>
            </template>
          </template>
          <template v-for="(child, cidx) in item.children">
            <el-table-column
              v-if="!child.hide"
              :key="cidx"
              :label="child.label"
              :width="child.width"
              :min-width="child.minWidth"
              :align="align"
              :prop="child.prop"
            >
              <template slot-scope="scope">
                <template v-if="child.type === 'dict'">
                  <iep-div-detail :value="dictsMap[child.prop][scope.row[child.prop]]"></iep-div-detail>
                </template>
                <template v-else-if="child.type === 'dictGroup'">
                  <div>{{ calculateDict(child, scope) }}</div>
                </template>
                <template v-else-if="child.type === 'img'">
                  <iep-img class="table-img" :src="scope.row[child.prop]"></iep-img>
                </template>
                <template v-else-if="child.type === 'date'">
                  <iep-div-detail :value="calculateDate(child, scope)"></iep-div-detail>
                </template>
                <template v-else-if="child.type === 'custom'">
                  <iep-div-detail :value="calculateCustom(child, scope)"></iep-div-detail>
                </template>
                <template v-else-if="child.type === 'tag'">
                  <iep-tag-detail :value="scope.row[child.prop]" :iep-type="child.iepType"></iep-tag-detail>
                </template>
                <template v-else-if="child.type === 'detail'">
                  <detail :row="scope.row" :item="child"></detail>
                </template>
                <template v-else-if="child.type === 'slot'">
                  <slot :name="child.prop" :scope="{row:scope.row}"></slot>
                </template>
                <template v-else>
                  <iep-div-detail :value="scope.row[child.prop]" :nullmsg="child.nullmsg"></iep-div-detail>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
      <template slot="empty">
        <IepEmpty :text="nodataText"></IepEmpty>
      </template>
    </el-table>
    <iep-pagination
      v-if="isPagination && pagedTable.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :pagination-option="pagination"
      :page-sizes="initPageSize"
      :layout="layout"
      prev-text="上一页"
      next-text="下一页"
      background
    ></iep-pagination>
  </div>
</template>

<script>
import { pageOption } from "@/const/pageConfig";
import { parseDate } from "@/filters/index";
import keyBy from "lodash/keyBy";
import store from "@/store";
import Detail from "./Detail";
import { validatenull } from "@/util/validate";
export default {
  name: "IepTable",
  inheritAttrs: false,
  components: { Detail },
  props: {
    isLoadTable: {
      type: Boolean,
      required: true,
    },
    isMutipleSelection: {
      type: Boolean,
      default: false,
    },
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
    isIndex: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => pageOption(),
    },
    pagedTable: {
      type: Array,
      required: true,
    },
    columnsMap: {
      type: Array,
      default: () => [],
    },
    dictsMap: {
      type: Object,
      default: () => {},
    },
    align: {
      type: String,
      default: "left",
    },
    checkboxInit: {
      type: Function,
      default: null,
    },
    pageOptionSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: "prev, pager, next",
    },
    headerCellStyle: {
      type: Function,
      default: ({ rowIndex }) => {
        if (rowIndex == 0) {
          return "background:#F2F4F5;color:#303031;font-family: Microsoft YaHei;";
        } else {
          return "";
        }
      },
    },
    nodataText: {
      type: String,
      default: "暂无数据",
    },
    expandHidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    initPageSize() {
      const { pageOptionSize } = this;
      return [
        pageOptionSize,
        pageOptionSize * 2,
        pageOptionSize * 3,
        pageOptionSize * 4,
      ];
    },
  },
  methods: {
    calculateCustom(item, scope) {
      return item.customFunction(scope.row);
    },
    calculateDate(item, scope) {
      return parseDate(scope.row[item.prop], item.formatString);
    },
    calculateDict(item, scope) {
      const dictGroup = store.state.common.dictGroup;
      if (!validatenull(scope.row[item.prop])) {
        const isExist = keyBy(dictGroup.get(item.dictName), "value")[
          scope.row[item.prop]
        ];
        if (isExist) {
          return isExist.label;
        } else {
          return "暂无";
        }
      } else {
        return "暂无";
      }
    },
    handleSizeChange(val) {
      this.$emit("pagination-size-change", val);
    },
    handleCurrentChange(val) {
      this.$emit("pagination-current-change", val);
    },
    toggleRowSelection(selectOption, records) {
      const index = [];
      selectOption.forEach(row => {
        // 不能自己自定义对象来设置选中
        this.$refs.IepTable.toggleRowSelection(
          records.find(item => {
            if (row.id == item.id) {
              index.push(item);
            }
            return row.id == item.id; // 注意这里寻找的字段要唯一，示例仅参考
          }),
          true,
        );
      });
      this.$emit("num", index.length);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.IepTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.IepTable.clearSelection();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.table ::v-deep .th {
  background: #ccc;
}
.table ::v-deep .cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.table-img {
  width: 40px;
  height: 40px;
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
}
</style>
