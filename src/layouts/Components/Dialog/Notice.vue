<template>
  <iep-dialog :dialog-show="dialogShow" title="公告" width="800px" @close="_close()">
    <iep-no-data v-if="!pagedTable.length"></iep-no-data>
    <el-collapse v-else v-model="activeNames" accordion>
      <el-collapse-item
        v-for="(item,key) in pagedTable"
        :key="item.id"
        :title="item.title"
        :name="key+1+''"
      >
        <div>{{item.content}}</div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;" v-if="pagedTable.length > 0">
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        prev-text="上一页"
        next-text="下一页"
        background
      ></iep-pagination>
    </div>
  </iep-dialog>
</template>
<script>
import { getNoticePage } from "@/api/admin/notice";
import { mapGetters, mapMutations, mapState } from "vuex";
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      activeNames: "1",
      queryForm: {
        status: "2",
      },
    };
  },
  computed: {
    ...mapGetters(["noticeReadStatus"]),
    ...mapState({
      dialogShow: state => state.user.noticeDialogShow,
    }),
  },
  created() {
    if (!this.noticeReadStatus) {
      this.loadPage();
      this.setNoticeReadStatus(true);
    }
  },
  methods: {
    ...mapMutations({
      setNoticeReadStatus: "SET_NOTICE_READ_STATUS",
      setNoticeDialogShow: "SET_NOTICE_DIALOGSHOW",
    }),
    _close() {
      this.setNoticeDialogShow(false);
    },
    async loadPage(param = { ...this.queryForm }) {
      await this.loadTable(param, getNoticePage);
    },
  },
  watch: {
    dialogShow() {
      this.loadPage();
    },
  },
};
</script>
