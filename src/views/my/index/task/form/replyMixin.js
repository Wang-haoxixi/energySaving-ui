import {
  getReplyPage,
  createReply,
} from "@/api/qms/cooperation_comment";
export default {
  data() {
    return {
      replyForm: "",
      replyRIndex: -1,
      replyLoadState: false,
      replyPageOption: {
        current: 1,
        size: 10,
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
      });
    },
    // 提交评论
    handleCommentSubmit(id) {
      if (this.commentForm === "") return;
      this.submitReply(this.commentForm, id);
    },
    // 提交回复
    handleReplySubmit(id) {
      if (this.replyForm === "") return;
      this.submitReply(this.replyForm, id);
    },
    submitReply(val, id) {
      createReply({
        content: val,
        commentId: id,
      }).then(({
        data,
      }) => {
        if (data) {
          this.replyRIndex = -1;
          this.replyForm = "";
          this.commentForm = "";
          this.pageOption.current = 1;
          this.loadPage(true);
          this.replyCurrentChange(this.replyPageOption.current);
        }
      });
    },
    // 回复按钮（图标）
    handleReply(type, index) {
      this.replyPageOption.current = 1;
      this.replyForm = "";
      if (this[type] === index) {
        // 收拢
        this[type] = -1;
        this.replyList = [];
      } else {
        // 展开
        this[type] = index;
        this.replyCurrentChange();
      }
    },
  },
};
