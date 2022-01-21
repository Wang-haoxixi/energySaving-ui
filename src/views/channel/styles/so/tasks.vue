<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">任务</div>
    <div class="task-container">
      <el-card
        v-for="item of pagedTable"
        :key="item.id"
        shadow="never"
        :body-style="{padding:'5px 20px'}"
      >
        <iep-task-column isComplex :data="item"></iep-task-column>
      </el-card>
    </div>
    <div class="page" v-if="pagedTable.length > 0">
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        :layout="layout"
        background
      ></iep-pagination>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getSoTaskPage } from "@/api/qms/cooperation_list";
import { dictMaps } from "@/views/task/taskList/options";
export default {
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 13,
      layout: "prev, pager, next",
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      const params = {
        orgId: this.$route.params.id,
        sort: dictMaps.sort[2].value, // [0] 按截至时间排序 [1] 按创建时间 [2]按优先级
        states: dictMaps.stateTask[0].value, // 0 进行中
        isWorkshop: dictMaps.isWorkshop[1].value, // 1 同步到工厂
      };
      this.loading = true;
      await this.loadTable({ ...param, ...params }, getSoTaskPage);
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped >
.styles-wrap {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.task-container {
  display: grid;
  // grid-template-rows: repeat(13, 1fr);
  row-gap: 20px;
}
</style>
