<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table ref="CrudTable" :dictsMap="dictsMap" :commonOptions="commonOptions" :operationOptions="operationOptions" :columnsMap="columnsMap" searchName="jobName" rowId="id" :loadFunction="getSysJobPage" :isMutipleSelection="false">
      </iep-crud-table>
    </iep-basic-container>
    <DialogForm ref="DialogForm" @load-page="loadPage"></DialogForm>
  </div>
</template>
<script>
import DialogForm from "./DialogForm.vue";
import { columnsMap, dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import {
  getSysJobPage,
  postSysJob,
  startSysJobById,
  shutdownSysJobById,
  runSysJobById,
  delSysJobById,
  shutdownAllSysJob,
  startAllSysJob,
  refreshAllSysJob,
  putSysJob,
} from "@/api/job/sys-job";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          icon: "el-icon-video-pause",
          name: "暂停全部任务",
          func: this.handleShutDownAll,
        },
        {
          icon: "el-icon-video-play",
          name: "启动全部任务",
          func: this.handleStartAll,
        },
        {
          icon: "el-icon-refresh",
          name: "重置全部任务",
          func: this.handleRestartAll,
        },
      ],
      operationOptions: [
        {
          name: "日志",
          func: this.handleLog,
        },
        {
          name: "启动",
          func: this.handleStart,
        },
        {
          name: "暂停",
          func: this.handleShutDown,
        },
        {
          name: "修改",
          func: this.handleEdit,
        },
        {
          name: "执行",
          func: this.handleRun,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      columnsMap,
      dictsMap,
    };
  },
  methods: {
    getSysJobPage,
    handleAdd() {
      this.$refs["DialogForm"].formRequestFn = postSysJob;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit(row) {
      this.$refs["DialogForm"].form = { ...row };
      this.$refs["DialogForm"].formRequestFn = putSysJob;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleLog() {},
    handleShutDownAll() {
      this._handleComfirm(null, shutdownAllSysJob, "暂停全部");
    },
    handleStartAll() {
      this._handleComfirm(null, startAllSysJob, "启动全部");
    },
    handleRestartAll() {
      this._handleComfirm(null, refreshAllSysJob, "重置全部");
    },
    handleStart(row) {
      this._handleComfirm(row.jobId, startSysJobById, "启动");
    },
    handleShutDown(row) {
      this._handleComfirm(row.jobId, shutdownSysJobById, "暂停");
    },
    handleRun(row) {
      this._handleComfirm(row.jobId, runSysJobById, "执行");
    },
    handleDel(row) {
      this._handleComfirm(row.jobId, delSysJobById, "删除");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
