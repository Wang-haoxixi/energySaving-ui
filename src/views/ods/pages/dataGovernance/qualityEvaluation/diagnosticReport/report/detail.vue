<template>
  <div>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template slot="state" slot-scope="scope">
        <div class="point" :class="!scope.row.state ? 'success' : 'danger'"></div>
        <span>{{ !scope.row.state ? '正常' : '异常' }}</span>
      </template>
      <template slot="time" slot-scope="scope">
        <div>{{ scope.row.startTime }}/{{ scope.row.endTime }}</div>
      </template>
      <template slot="outtime" slot-scope="scope">
        <div>{{ formatDuring(scope.row.consumeTime) }}</div>
      </template>
    </iep-table>
  </div>
</template>
<script>
import mixin from "./option";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { mockData2 } from "../const/mock";
export default {
  mixins: [mixin, mixins],
  props: ["list"],
  data() {
    return {
      data: [],
      obj: {},
      columnsMap: [
        {
          label: "诊断字段名称",
          prop: "dataFieldName",
        },
        {
          label: "是否异常",
          prop: "state",
        },
        {
          label: "诊断实体数据数量",
          prop: "total",
        },
        {
          label: "脏数据数量",
          prop: "errorTotal",
        },
        {
          label: "诊断时间(开始/结束)",
          prop: "time",
        },
        {
          label: "耗时",
          prop: "outtime",
        },
      ],
      mockData: mockData2,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    formatDuring(msd) {
      let time = parseFloat(msd) / 1000; //先将毫秒转化成秒
      if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
          time =
            parseInt(time / 60.0) +
            "分钟" +
            parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
            "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time =
            parseInt(time / 3600.0) +
            "小时" +
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
            ) +
            "分钟" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
              ) -
                parseInt(
                  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
                )) *
                60,
            ) +
            "秒";
        } else {
          time = parseInt(time) + "秒";
        }
      }
      return time;
    },
  },
};
</script>
<style lang="scss" scoped>
.point {
  width: 10px;
  margin: 7px 10px 0 10px;
  display: inline-block;
  width: 10px;
  display: inline-block;
  border-radius: 50%;
  height: 10px;
  line-height: 23px;
  background: #0dabf2;
}
.success {
  background-color: #67c22a;
}

.danger {
  background-color: #e64356;
}
</style>