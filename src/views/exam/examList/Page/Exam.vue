<template>
  <div>
    <el-row>
      <div style="float:right;">
        <iep-operation-search
          ref="operationSearch"
          @search-page="searchPage"
          prop="examName"
          placeholder="请输入关键词进行搜索"
        >
          <slot name="iep-crud-advance-search">
            <advance-search @search-page="searchPage"></advance-search>
          </slot>
        </iep-operation-search>
      </div>
    </el-row>
    <el-row>
      <list style="margin-top:50px" :data="tableList" isSO></list>
      <IepNoData v-if="!tableList.length" complex></IepNoData>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          style="float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import examItem from "./Components/examItem";
import { getAppPage } from "@/api/qms/examList";
import { answerExam, editExam } from "@/api/qms/exam_answer";
import list from "@/views/channel/Exam/components/list";
import AdvanceSearch from "./Components/AdvanceSearch";
export default {
  data() {
    return {
      tableList: [],
      pagination: {
        current: 1,
        total: 0,
        size: 10,
      },
      tableColumnsMap: [],
      disabled: false,
      answerData: {},
    };
  },
  computed: {},
  components: {
    // examItem,
    AdvanceSearch,
    list,
  },
  created() {
    this.getList();
  },
  methods: {
    searchPage(params) {
      const newPms = {};
      if (params.qTypeString) {
        newPms.type = params.qTypeString;
        this.getList(newPms);
      } else {
        this.getList(params);
      }
    },
    getList(params) {
      getAppPage({
        ...this.pagination,
        source: "1",
        ...params,
      }).then(({ data }) => {
        this.pagination = {
          current: data.current,
          size: data.size,
          total: data.total,
        };
        this.tableList = data.records;
      });
    },
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getList();
    },
    joinExam(id) {
      this.disabled = false;
      answerExam({ examinationId: id }).then(({ data }) => {
        this.answerData = data;
      });
    },
    editExam(id) {
      this.disabled = false;
      editExam(id).then(({ data }) => {
        this.answerData = data;
      });
    },
    viewExam(id) {
      this.disabled = true;
      editExam(id).then(({ data }) => {
        this.answerData = data;
      });
    },
    close() {
      this.getList();
    },
  },
};
</script>
