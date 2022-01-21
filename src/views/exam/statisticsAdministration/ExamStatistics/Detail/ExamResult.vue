<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getExamResultPage"
      searchName="realName"
      placeholder="请输入人员姓名进行搜索"
      :isMutipleSelection="false"
      :useRoutePage="false"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
    </iep-crud-table>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import { getExamResultPageById } from "@/api/exam/exam_statistics";
import { mapGetters } from "vuex";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      dictsMap: {
        isSo: {
          1: "组织内成员",
          2: "平台成员",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    getExamResultPage() {
      const type = this.isPlatform ? "operate" : "org";
      return getExamResultPageById(this.$route.params.id, type);
    },

    columnsMap() {
      const addColumns = !this.isPlatform
        ? [
            {
              prop: "isSo",
              label: "是否组织内成员",
              type: "dict",
            },
          ]
        : [];
      return [
        {
          prop: "realName",
          label: "姓名",
        },
        ...addColumns,
        {
          prop: "createTime",
          label: "答题时间",
        },
        {
          prop: "commitTime",
          label: "交卷时间",
        },
        {
          prop: "alreadyAnswerTime",
          label: "答题时长",
        },
        {
          prop: "score",
          label: "分数",
        },
        {
          prop: "result",
          label: "成绩状态",
        },
      ];
    },
  },
  methods: {
    getExamResultPageById,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
