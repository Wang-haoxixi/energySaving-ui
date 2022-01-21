<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="myCoursePcPage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :operationWidth="150"
      searchName="courseName"
    >
      <template #iep-crud-left>
        <div>您已完成了 {{countData[0]}} 门课程学习，已获得 {{countData[1]}} 学分。</div>
      </template>
    </iep-crud-table>

    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>
<script>
import {
  myCoursePcPage,
  myCoursePcCount,
} from "@/api/qms/course_study_situation";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
export default {
  components: {
    ExamViewDialog,
  },
  data() {
    return {
      dictsMap: {
        progress: {
          1: "未开始",
          2: "学习中",
          3: "已完成",
        },
        completeType: {
          1: "达到课程学时",
          2: "通过课程考试",
        },
      },
      countData: [0, 0],
      operationOptions: [
        {
          name: "继续学习",
          func: this.继续学习,
          hidden: (row) => {
            return row.progress === "3";
          },
        },
        {
          name: "查看明细",
          func: this.查看明细,
          hidden: (row) => {
            return row.progress !== "3";
          },
        },
      ],
      columnsMap: [
        {
          prop: "courseName",
          label: "课程名称",
        },
        {
          prop: "orgName",
          label: "发布组织",
        },
        {
          prop: "completeType",
          label: "完成条件",
          type: "dict",
        },
        {
          prop: "learningHour",
          label: "学习课时",
        },
        {
          prop: "progressValue",
          label: "学习进度",
        },
        {
          prop: "progress",
          label: "状态",
          type: "dict",
        },
        {
          prop: "credit",
          label: "学分",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    myCoursePcPage,
    async loadData() {
      const { data } = await myCoursePcCount();
      this.countData = data;
    },
    继续学习(row) {
      this.$openPage(`/channel/course/detail/${row.infoId}`);
    },
    查看明细(row) {
      this.$openPage(`/my/index/course_detail/${row.id}`);
    },
  },
};
</script>
