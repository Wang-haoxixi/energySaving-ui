<template>
  <!-- 事项填报统计 -->
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <IepPageHeader title="事项填报统计"></IepPageHeader>
        <el-radio-group v-model="type">
          <el-radio-button label="1">事项要素统计</el-radio-button>
          <el-radio-button label="2">按行政区划</el-radio-button>
          <el-radio-button label="3">按实施主体</el-radio-button>
        </el-radio-group>
        <TableMatter v-show="type === '1'" @open-detail="openDetail" />
        <TableStatistics v-show="type === '2'" :data="administrativeAreaData" />
        <TableStatistics v-show="type === '3'" :data="implementingSubjectData" />
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
  </div>
</template>
<script>
import {
  administrativeAreaData,
  implementingSubjectData,
} from "./components/mock";
import TableStatistics from "./components/tableStatistics";
import TableMatter from "./components/tableMatter";
import FormTpl from "./form";
export default {
  components: {
    TableStatistics,
    TableMatter,
    FormTpl,
  },
  data() {
    return {
      implementingSubjectData,
      administrativeAreaData,
      pageState: "list",
      type: "1",
    };
  },
  methods: {
    openDetail(row) {
      this.pageState = row.pageState;
      this.formStatus = row.formStatus;
      this.$nextTick(() => {
        this.$refs["form"].open(row.data);
      });
    },
    // 表单与页面也换
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
  },
};
</script>