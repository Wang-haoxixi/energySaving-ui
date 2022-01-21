<template>
  <iep-dialog :dialog-show="dialogShow" title="下载附件" width="500px" @close="_close()">
    <div class="attach-list">
      <div v-for="(item,i) in attachList" :key="i" class="attacth-item">
        <el-link icon="el-icon-link" @click="handleDownload(item)">{{item.original}}</el-link>
      </div>
    </div>
  </iep-dialog>
</template>
<script>
import { downloadUrl } from "@/api/common";
export default {
  data() {
    return {
      dialogShow: false,
      attachList: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleDownload(item) {
      this.$message("附件下载中");
      downloadUrl(item.attachFile, item.original);
    },
  },
};
</script>
