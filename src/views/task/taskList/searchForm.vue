<template>
  <iep-operation-search
    @search-page="searchPage"
    :paramForm="paramForm"
    prop="name"
    advance-search
    class="search"
  >
    <el-form :model="paramForm" label-width="120px" label-position="top" class="search-form">
      <el-form-item label="创建人：">
        <el-input
          v-model="paramForm.publisherName"
          disabled
          class="publisher"
          @click.native="handlePublisher"
        >
          <i
            slot="suffix"
            class="el-icon-woneng-guanbihuozheshibai"
            @click.stop="()=>{paramForm.publisherObj={}}"
          ></i>
        </el-input>
        <IepContactInput
          ref="contact"
          isClosed
          v-model="paramForm.publisherObj"
          :showFriend="false"
          v-show="false"
        ></IepContactInput>
      </el-form-item>
      <el-form-item label="截止时间：">
        <el-date-picker
          v-model="paramForm.rangtime"
          value-format="yyyy-MM-dd hh:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="任务状态：">
        <el-radio-group v-model="paramForm.states">
          <el-radio
            :label="item.value"
            v-for="(item, index) in dictMaps.stateTask"
            :key="index"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优先级：">
        <el-radio-group v-model="paramForm.urgency">
          <el-radio
            :label="item.value"
            v-for="(item, index) in dictMaps.urgency"
            :key="index"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </iep-operation-search>
</template>

<script>
import { initSearchForm, dictMaps } from "./options";

export default {
  components: {},
  data() {
    return {
      dictMaps,
      paramForm: initSearchForm(),
    };
  },
  methods: {
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      delete obj.rangtime;
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
    handlePublisher() {
      this.$refs.contact.handleEdit();
    },
  },
  watch: {
    "paramForm.publisherObj"(row) {
      this.paramForm.publisherName = row.name;
      this.paramForm.userIds = row.id;
    },
    "paramForm.rangtime"(row) {
      if (row && row.length > 1) {
        this.paramForm.startTime = row[0];
        this.paramForm.endTime = row[1];
      } else {
        this.paramForm.startTime = "";
        this.paramForm.endTime = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  .publisher {
    i {
      cursor: pointer;
    }
    &::v-deep .el-input__inner {
      background-color: #fff;
      cursor: text;
    }
  }
}
</style>
