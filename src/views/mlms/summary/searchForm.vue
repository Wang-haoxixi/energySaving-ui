<template>
  <iep-operation-search
    @search-page="searchPage"
    :paramForm="paramForm"
    prop="title"
    advance-search
  >
    <el-form :model="paramForm" label-width="120px" v-if="false">
      <el-form-item label="会议类型">
        <iep-dict-select v-model="paramForm.meetingType" dict-name="mlms_meeting_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="会议开始时间">
        <el-date-picker
          v-model="paramForm.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="会议结束时间">
        <el-date-picker
          v-model="paramForm.endTime"
          value-format="yyyy-MM-dd 23:59:59"
          type="date"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="paramForm.realName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </iep-operation-search>
</template>

<script>
import { initSearchForm } from "./options";

export default {
  components: {},
  data() {
    return {
      paramForm: initSearchForm(),
    };
  },
  methods: {
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
  },
};
</script>
