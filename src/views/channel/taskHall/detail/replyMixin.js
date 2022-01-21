import {
  getReplyPage,
} from "@/api/qms/cooperation_comment";
import {
  downloadFile,
} from "@/api/common";
export default {
  data() {
    return {
      replyForm: "",
      replyRIndex: -1,
      replyLoadState: false,
      replyPageOption: {
        current: 1,
        size: 10,
        total: 0,
      },
      replyList: [],
    };
  },
  mounted() {},
  methods: {
    // 回复翻页
    replyCurrentChange(val = 1) {
      this.replyLoadState = true;
      this.replyPageOption.current = val;
      getReplyPage(
        Object.assign({}, this.replyPageOption, {
          commentId: this.list[this.replyIndex].id,
        }),
      ).then(({
        data,
      }) => {
        this.replyLoadState = false;
        this.replyList = data.records;
        this.replyPageOption.total = data.total;
      });
    },
    // 附件下载
    downLoad(row) {
      downloadFile({
        url: row.attachFile,
        name: row.original,
      });
    },
  },
};
