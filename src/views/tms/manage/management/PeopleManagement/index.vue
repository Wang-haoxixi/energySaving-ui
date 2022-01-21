
<template>
  <div>
    <el-form ref="form" label-width="120px" width="300px">
      <el-form-item class="form-item" label="记录时间：">
        <el-date-picker
          class="input"
          v-model="changeTime"
          type="date"
          placeholder="请选择记录时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <ul class="recording">
      <li v-for="(item,index) in recordingList" :key="index">
        <span class="time">{{item.createTime}}</span>
        <span>{{item.creatorName}}</span>
        <span>{{item.description}}</span>
      </li>
    </ul>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="params.total"
        :page-size="params.size"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getManageRecordPage } from "@/api/tms/management";
export default {
  mixins: [mixins],
  data() {
    return {
      changeTime: "",
      recordingList: [],
      params: {
        current: 1,
        size: 10,
        total: 0,
      },
    };
  },
  computed: {},
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.loading = true;
      getManageRecordPage(
        Object.assign({}, { createTime: this.changeTime }, this.params),
      ).then(data => {
        this.recordingList = data.records;

        this.params.total = data.total;
        this.loading = false;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
  },
  watch: {
    changeTime: function() {
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.recording {
  > li {
    margin: 10px 0;
    list-style: none;
    > span {
      color: #444;
      margin-right: 30px;
    }
    .time {
      color: $--color-text-secondary;
    }
  }
}
.input ::v-deep .el-input__inner {
  height: 36px;
  text-indent: 20px;
}
.form-item ::v-deep .el-form-item__label {
  height: 36px;
  line-height: 36px;
}
</style>

