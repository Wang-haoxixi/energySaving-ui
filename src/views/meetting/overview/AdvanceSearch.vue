<template>
  <div>
    <el-form class="form" :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="关键字">
        <el-input v-model="form.name" placeholder="请输入关键字进行搜索" clearable></el-input>
      </iep-form-item>
      <iep-form-item label-name="活动状态">
        <el-select v-model="form.statusFlag" placeholder="请选择活动状态" clearable>
          <el-option
            v-for="item in statusFlagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="审核状态">
        <el-select v-model="form.auditStatus" placeholder="请选择审核状态" clearable>
          <el-option
            v-for="item in auditStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="开始时间">
        <iep-date-picker
          v-model="startTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00','23:59:59']"
          format="yyyy-MM-dd HH:mm"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="发布时间">
        <iep-date-picker
          v-model="publishTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00','23:59:59']"
          format="yyyy-MM-dd HH:mm"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item class="flex-start" label-name="其他">
        <el-checkbox v-model="checkSignUp">仅查看已报名活动</el-checkbox>
      </iep-form-item>
      <el-form-item>
        <iep-operation-wrapper>
          <el-button type="primary" @click="searchPage">搜索</el-button>
          <el-button @click="clearSearchParam">清空</el-button>
        </iep-operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm, dictsMap } from "./options";
export default {
  data() {
    return {
      form: initSearchForm(),
      checkSignUp: false,
      startTimeRange: null,
      publishTimeRange: null,
    };
  },
  computed: {
    statusFlagOptions() {
      const { statusFlag } = dictsMap;
      return Object.keys(statusFlag).map(m => ({
        value: m,
        label: statusFlag[m],
      }));
    },
    auditStatusOptions() {
      const { auditStatus } = dictsMap;
      return Object.keys(auditStatus).map(m => ({
        value: m,
        label: auditStatus[m],
      }));
    },
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.startTimeRange = null;
      this.publishTimeRange = null;
      this.checkSignUp = false;
      this.form = initSearchForm();
      this.$emit("clear-search-param");
    },
  },
  watch: {
    checkSignUp(v) {
      this.form.signUp = v ? "1" : "0";
    },
    startTimeRange: {
      handler(v) {
        if (v) {
          this.form.headStartTime = v[0];
          this.form.offalStartTime = v[1];
        } else {
          this.form.headStartTime = "";
          this.form.offalStartTime = "";
        }
      },
      deep: true,
    },
    publishTimeRange: {
      handler(v) {
        if (v) {
          this.form.headPublishTime = v[0];
          this.form.offalPublishTime = v[1];
        } else {
          this.form.headPublishTime = "";
          this.form.offalPublishTime = "";
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.checkSignUp = this.$route.query.signUp === "1";
  },
};
</script>
<style lang="scss" scoped>
.form {
  .flex-start {
    &.el-form-item {
      ::v-deep .el-form-item__content {
        justify-content: flex-start;
      }
    }
  }
}
</style>
