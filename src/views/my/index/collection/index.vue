<template>
  <div class="collection">
    <div class="list" v-show="pageState === 'list'">
      <iep-tabs v-model="tabName" :tab-list="tabList"></iep-tabs>
      <iep-operation-container>
        <template slot="left">
          <el-button @click="handleCancelCollect" class="button">取消收藏</el-button>
        </template>
      </iep-operation-container>
      <TableTpl ref="table" @handle_detail="handleDetail"></TableTpl>
    </div>
    <material-detail-tpl
      ref="material"
      v-if="pageState === 'material'"
      @load-page="backPage"
      :cType="materialType"
    ></material-detail-tpl>
    <thought-detail-tpl ref="thought" v-if="pageState === 'thought'" @load-page="backPage"></thought-detail-tpl>
    <summary-detail-tpl
      ref="summary"
      v-if="pageState === 'summary'"
      @backPage="backPage"
      detailState
    ></summary-detail-tpl>
  </div>
</template>

<script>
import TableTpl from "./table";
import { tabList } from "./options";
import { deleteCollection, deleteCollectionById } from "@/api/dms/collection";
import MaterialDetailTpl from "@/views/mlms/material/detail";
import ThoughtDetailTpl from "./detail/thoughtDetail";
import SummaryDetailTpl from "@/views/mlms/summary/detail";

export default {
  name: "collection",
  components: {
    TableTpl,
    MaterialDetailTpl,
    ThoughtDetailTpl,
    SummaryDetailTpl,
  },
  data() {
    return {
      tabName: "3",
      tabList,
      pageState: "list",
      materialType: 0, // 材料类的类型 - 0：材料，1：文章
    };
  },
  methods: {
    handleCancelCollect() {
      const list = this.$refs.table.selectList;
      if (list.length > 0) {
        // 能聘就是离谱，要单独调用接口
        if (this.tabName === "7") {
          deleteCollectionById({
            targetIds: list.map((m) => m.recruitId),
            type: 7,
          }).then(({ data }) => {
            if (data) this.$refs.table.loadPage();
          });
        } else {
          deleteCollection(list.map((m) => m.id)).then(({ data }) => {
            if (data) this.$refs.table.loadPage();
          });
        }
      }
    },
    handleDetail(row, type) {
      this.pageState = type;
      this.$nextTick(() => {
        if (type === "material") {
          this.materialType = row.type;
          this.$refs[type].getDataById({ id: row.targetId });
        } else if (type === "thought") {
          this.$refs[type].loadData(row.targetId);
        } else if (type === "summary") {
          this.$refs[type].loadDetail(row.targetId);
        } else if (type === "activity") {
          this.$openPage(`/channel/activity/detail/${row.targetId}`);
        } else if (type === "product") {
          this.$openPage(`/channel/mo_fang/detail/${row.targetId}`);
        } else if (type === "course") {
          this.$openPage(`/channel/course/detail/${row.targetId}`);
        }
      });
    },
    backPage() {
      this.pageState = "list";
    },
  },
  mounted() {
    this.$refs.table.loadData({ type: this.tabName });
  },
  created() {
    this.tabName = this.$route.query.tabName || "3";
  },
  watch: {
    tabName(val) {
      this.$router.push({ query: { tabName: val } });
      this.$refs.table.loadData({ type: val });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection {
  padding: 20px;
  min-height: 471px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid $--border-color;
}
</style>
