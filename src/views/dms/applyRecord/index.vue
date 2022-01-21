<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        searchName="realName"
        :isMutipleSelection="false"
        :isInitLoad="false"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getApplyRecordPage"
      >
        <template #iep-crud-left>
          <el-radio-group v-model="resourceType" @change="handleChange">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="1">代理</el-radio>
            <el-radio label="2">试用</el-radio>
            <el-radio label="3">体验</el-radio>
          </el-radio-group>
        </template>

        <!-- 意向产品 -->
        <template #resourceName="{scope}">{{_templateResourceName(scope.row)}}</template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { dictsMap as commonDictsMap } from "@/util/common";
import { getApplyRecordPage } from "@/api/dms/apply_record";
export default {
  data() {
    return {
      resourceType: null,
      dictsMap: {
        sex: commonDictsMap.sex,
        type: {
          1: "代理",
          2: "试用",
          3: "体检",
        },
      },
      columnsMap: [
        {
          prop: "realName",
          label: "合伙人姓名",
        },
        {
          prop: "sex",
          label: "性别",
          type: "dict",
        },
        {
          prop: "industry",
          label: "行业",
        },
        {
          prop: "title",
          label: "头衔",
        },
        {
          prop: "workPlace",
          label: "所属地区",
        },
        {
          prop: "mobile",
          label: "手机",
        },
        {
          prop: "type",
          label: "申请类型",
          type: "dict",
        },
        {
          prop: "resourceName",
          label: "意向产品",
          type: "slot",
        },
      ],
    };
  },
  created() {
    this.resourceType = this.$route.query.resourceType ?? null;
  },
  mounted() {
    this._setQueryForm();
    this.$refs["CrudTable"].searchPage();
    this.$refs["CrudTable"].clearSearch();
  },
  methods: {
    _templateResourceName(row) {
      if (row.resourceType === "1") {
        return "暂无明确意向";
      } else {
        return row.resourceName;
      }
    },
    handleChange() {
      this._setQueryForm();
      this.$refs["CrudTable"].searchPage();
      this.$refs["CrudTable"].clearSearch();
    },
    getApplyRecordPage,
    _setQueryForm() {
      this.$refs["CrudTable"].queryForm = {
        resourceType: this.resourceType,
      };
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
