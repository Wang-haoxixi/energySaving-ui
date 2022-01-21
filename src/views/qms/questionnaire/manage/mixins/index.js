import { deleteDataById, endPage, getDataById } from "@/api/qms/questionnaire";
import { getAppletsQRCode } from "@/api/admin/social";

// import { pageOption } from "@/const/pageConfig";
import { getDownload } from "@/api/qms/answer";
import { encryption } from "@/util/util";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoadTable: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    openFullScreenDialog() {
      this.$refs.fullScreenDialog.open();
    },
    closeFullScreenDialog() {
      this.$refs.fullScreenDialog.close();
    },
    afterSubmitMain() {
      // 未使用参数 data,status
      // if (status === "create") {
      //   const query = { ...pageOption };
      //   this.$router.push({
      //     query,
      //   });
      //   console.log("create");
      // }
      // 创建完问卷返回第一页
      const query = { size: this.$route.query.size, current: 1 };
      this.searchForm = { ...this.searchForm, ...query };
      this.$router.push({
        query
      });
      this.loadPage(this.searchForm);
      this.closeFullScreenDialog();
    },
    getUrl(row) {
      // let disabled = row.status !== "1";
      return `${window.location.protocol}//${window.location.host}/questionnaire_edit/${row.id}`;
    },
    // 问卷提交后操作
    submitMain() {
      this.closeFullScreenDialog();
    },
    // 创建问卷
    handleAdd() {
      // 未使用参数 row
      this.type = "add";
      this.openFullScreenDialog();
    },
    // 结束
    handleEnd(row) {
      this._handleComfirm(row.id, endPage, "结束问卷");
    },
    // 导出
    handleExport(row) {
      this.$confirm("是否导出问卷", "导出问卷", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        getDownload(
          {
            questionnaireId: row.id
          },
          row.name
        );
      });
    },
    // 预览
    handleView(row) {
      this.type = "view";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.dialogView.open(row.id);
      });
    },
    // 删除
    handleDelete(row) {
      if (row.createBy === this.userInfo.userId) {
        this._handleComfirm(row.id, deleteDataById, "删除问卷");
      } else {
        this._handleComfirmINPUT(row.id, deleteDataById, "删除问卷");
      }
    },
    // 统计
    handleStatistics(row) {
      this.type = "statistics";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.dialogStatistics.open(row.id);
      });
    },
    // 分析报告
    handleAnalysis(row) {
      this.type = "analysis";
      this.openFullScreenDialog();
      this.$nextTick(() => {
        this.$refs.dialogAnalysis.open(row);
      });
    },
    //更改问卷信息
    handleRefdate(row) {
      this.$nextTick(() => {
        this.$refs.dialogRefdate.open(row.id);
      });
    },
    //复制
    handleCopy(row) {
      this.type = "add";
      this.openFullScreenDialog();
      this.$nextTick(async () => {
        this.$refs.mainDialog.loading = true;
        const { data } = await getDataById(row.id);
        if (data) {
          this.$refs.mainDialog.$children[1].$children[0].onChoose(data);
        }
        this.$refs.mainDialog.loading = false;
      });
    },
    // 查看二维码
    async handleQrCode(row) {
      this.isLoadTable = true;
      const { data } = await getAppletsQRCode(row.id, "questionnaire");
      let img = new Image();
      img.onload = () => {
        const imgRatio = img.naturalWidth / img.naturalHeight;

        // 创建一个画布容器；
        const cvs = document.createElement("canvas");

        // 获取容器中的画板；
        const ctx = cvs.getContext("2d");
        cvs.width = 500;
        cvs.height = cvs.width / imgRatio;

        // 将原图等比例绘制到缩放后的画布上；
        ctx.drawImage(img, 0, 0, 500, 500);
        ctx.fillStyle = "white";
        ctx.fillRect(180, 180, 150, 150);

        const b64 = cvs.toDataURL("image/jpeg", 0.9);
        this.$refs["imgViewer"].imgList = [b64];
        this.$refs["imgViewer"].showViewer = true;

        // 使用完后清空该对象，释放内存；
        setTimeout(() => {
          img = null;
        }, 1000);
      };
      img.onerror = () => {
        console.error("img load error");
        this.isLoadTable = false;
      };
      this.isLoadTable = false;
      img.src = data;
    },
    async _handleComfirmNOID(
      row,
      optFunction,
      msg,
      title = "提示",
      detailMsg,
      feelbackMsg
    ) {
      try {
        await this.$confirm(detailMsg || `是否${msg}`, title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const data = await optFunction(row);
        if (data.data) {
          this.$message({
            type: "success",
            message: feelbackMsg || `${msg}成功!`
          });
          this.loadPage();
        } else {
          this.$message({
            type: "info",
            message: `${data.message}` || "失败"
          });
        }
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    //驳回
    _handleComfirmINPUT(id, optFunction, msg, detailMsg, feelbackMsg) {
      this.$prompt(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputType: "textarea",
        inputPlaceholder: `若${msg}，请填写${msg}理由，不超过200字`,
        inputValidator: val => {
          if (val && val.length > 200) {
            return `${msg}理由不能超过200字，当前${val.length}字`;
          } else if (!val) {
            return `${msg}理由不能为空`;
          } else {
            return true;
          }
        },
        closeOnClickModal: false
      })
        .then(async ({ value }) => {
          const data = await optFunction(id, value);
          if (data.data) {
            this.$message({
              type: "success",
              message: feelbackMsg || `${msg}成功!`
            });
          }
          // Like this
          this.loadPage();
        })
        .catch(() => {});
    },
    //发布提交输入支付密码
    _handleComfirmBySafePassword(
      id,
      optFunction,
      msg,
      placeholder,
      detailMsg,
      feelbackMsg
    ) {
      this.$prompt(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputType: "password",
        inputPlaceholder: placeholder || `请输入支付密码`,
        inputValidator: val => {
          return val ? true : placeholder || `请输入支付密码`;
        },
        closeOnClickModal: false
      })
        .then(async ({ value }) => {
          // 宝贝支付加密
          const res = encryption({ data: { value }, param: ["value"] });
          const data = await optFunction(id, res.value);
          if (data.data) {
            this.$message({
              type: "success",
              message: feelbackMsg || `${msg}成功!`
            });
          }
          this.loadPage();
        })
        .catch(() => {});
    }
  }
};
