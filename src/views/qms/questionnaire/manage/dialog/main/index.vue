<template>
  <div>
    <div-header :title="title"></div-header>
    <div-content v-loading="loading">
      <main-content ref="mainContent"></main-content>
    </div-content>
    <div-footer @view="handleView" @save="handleSave" @close="close" ref="footer"></div-footer>
    <dialog-view ref="dialogView" :disabled="false" title="预览"></dialog-view>
  </div>
</template>
<script>
import DialogView from "../view/dialog";
import DivHeader from "../components/header";
import DivFooter from "./components/footer";
import DivContent from "../components/content";
import MainContent from "./components/content";
import { createPage, updatePage } from "@/api/qms/questionnaire";
import { quesType } from "../../const/ques";
const TITLES = {
  create: "创建问卷",
  edit: "编辑问卷",
};
export default {
  data() {
    return {
      title: TITLES.create,
      id: "",
      loading: false,
    };
  },
  components: {
    DivHeader,
    DivFooter,
    DivContent,
    MainContent,
    DialogView,
  },
  methods: {
    open(id) {
      this.title = id ? TITLES.edit : TITLES.create;
      if (id) {
        this.id = id;
        this.$refs.mainContent.getData(id);
      }
    },
    close() {
      this.$emit("close");
    },
    clearForm() {
      this.$refs.mainContent.clearForm();
      this.$refs.mainContent.resetResult();
      this.id = "";
    },
    _setData(row) {
      const arr = ["2", "4", "9"];
      for (let i = 0, len = row.length; i < len; i++) {
        if (arr.includes(row[i].type)) {
          row[i].answer.value = [];
        }
      }
      return row;
    },
    // 预览
    handleView() {
      const data = this.$refs.mainContent.getResult();
      // 处理多选题答案 防止checkbox报错
      data.quesQuestionDTO = this._setData(data.quesQuestionDTO);
      // 深拷贝防止预览时的答案留存
      this.$refs.dialogView.open(JSON.parse(JSON.stringify(data)));
    },
    // 保存
    handleSave() {
      this.loading = true;
      this.$refs.mainContent.submit().then(data => {
        if (data) {
          const params = this.$refs.mainContent.getResult();
          params.awardNumber = Number(params.awardNumber);
          params.awardScope = Number(params.awardScope);
          params.status = "2";
          const result = params.quesQuestionDTO;
          if (this._uploadPosition(result)) {
            this.loading = false;
            return false;
          }
          if (this._validateTag(params.tag) && this._validate(result)) {
            // return false;
            if (result) {
              params.isLogic = 0;
              result.forEach(item => {
                if (item.logic) {
                  if (
                    Object.prototype.toString.call(item.logic) ===
                    "[object Object]"
                  ) {
                    item.logic = JSON.stringify(item.logic);
                  }
                } else {
                  item.logic = "{}";
                }
                if (params.isLogic === 0 && item.logic !== "{}") {
                  params.isLogic = 1;
                }
              });
            }
            this.$emit("before-submit", params);
            const apiPage = this.id ? updatePage : createPage;
            this.$refs.footer.openLoading();
            apiPage(params)
              .then(data => {
                if (data.code === 0) {
                  // this.$notify({
                  //   title: "提示",
                  //   message: this.id ? "修改成功" : "保存成功",
                  //   type: "success",
                  // });
                  this.$message({
                    message: this.id ? "修改成功" : "保存成功",
                    type: "success",
                  });
                  this.clearForm();
                  const status = this.id ? "update" : "create";
                  this.$emit("after-submit", data.data, status);
                } else {
                  // this.$message({
                  //   message: data.msg || "失败",
                  //   type: "warning",
                  // });
                }
                this.loading = false;
                this.$refs.footer.closeLoading();
              })
              .catch(() => {
                this.loading = false;
                this.$refs.footer.closeLoading();
              });
          } else {
            this.loading = false;
          }
        } else {
          this.$message.warning("请填写必填项");
          this.$refs["mainContent"].$children[0].$children[1].$el.scrollTop = 0;
          this.loading = false;
        }
      });
    },
    // 标签验证
    _validateTag(data = []) {
      if (data.length > 3) {
        this._message("标签个数不能超过3个");
        return false;
      }
      return true;
    },
    // 提示
    _message(message) {
      this.$message({
        message: message,
        type: "warning",
      });
    },
    //上传题排最后验证
    _uploadPosition(result) {
      let flagUpload = false;
      let flagUpload2 = false;
      result.forEach(item => {
        if (item.type === "9") flagUpload = true;
        if (item.type !== "9" && flagUpload) {
          flagUpload2 = true;
        }
      });
      if (flagUpload2) {
        this.$message({
          message: "上传题必须排在最后",
          type: "warning",
        });
        return true;
      }
      return false;
    },
    // 验证
    _validate(data) {
      let result = true;
      let mustFlag = false;
      let showFlag = false;
      if (data.length < 1) {
        this._message("问卷题目不能为空");
        return false;
      }
      for (let i = 0, len = data.length; i < len; i++) {
        const val = data[i];
        if (val.isRequire === "1") {
          mustFlag = true;
        }
        if (val.isShow === "1") {
          showFlag = true;
        }
        if (!val.title || val.title.length === 0) {
          this._message(`第${i + 1}题标题未填写`);
          result = false;
          break;
        }
        if (
          val.type === quesType.singleElection ||
          val.type === quesType.multipleElection ||
          val.type === quesType.imgSelect ||
          val.type === quesType.multipleImgSelect ||
          val.type === quesType.select ||
          val.type === quesType.multipleFillBlank ||
          val.type === quesType.scoring
        ) {
          if (val.optionList.length === 0) {
            this._message(`第${i + 1}题选项未设置`);
            result = false;
            break;
          } else {
            if (val.type === "3" || val.type === "4") {
              const optionList = val.optionList;
              let optionListResult = true;
              for (let j = 0, len = optionList.length; j < len; j++) {
                if (
                  !optionList[j].description ||
                  optionList[j].description.trim() === ""
                ) {
                  optionListResult = false;
                  break;
                }
              }
              if (!optionListResult) {
                this._message(`第${i + 1}题选项内容未填写`);
                result = false;
                break;
              }
            } else {
              const optionList = val.optionList;
              let optionListResult = true;
              for (let j = 0, len = optionList.length; j < len; j++) {
                if (optionList[j].name.trim() === "") {
                  optionListResult = false;
                  break;
                }
              }
              if (!optionListResult) {
                this._message(`第${i + 1}题选项内容未填写`);
                result = false;
                break;
              }
            }
          }
          if (this._validateAnswer(val, i)) {
            result = false;
            break;
          }
        }
      }
      if (!mustFlag) {
        this._message("问卷至少一道必填题");
        result = false;
      }
      if (!showFlag) {
        this._message("问卷至少一道题显示");
        result = false;
      }
      return result;
    },
    // 验证选项是否有重复
    _validateAnswer(data, index) {
      let result = false;
      if (
        data.type === quesType.singleElection ||
        data.type === quesType.multipleElection ||
        data.type === quesType.select ||
        data.type === quesType.multipleFillBlank ||
        data.type === quesType.scoring
      ) {
        const optionList = data.optionList;
        if (optionList && optionList.length > 1) {
          for (let i = 0, len = optionList.length; i < len; i++) {
            const val = optionList.some((item, index) => {
              if (index !== i) {
                return optionList[i].name === item.name;
              }
              return false;
            });
            if (val) {
              this._message(`第${index + 1}题选项内容不能重复`);
              result = true;
              break;
            }
          }
        }
      } else if (
        data.type === quesType.imgSelect ||
        data.type === quesType.multipleImgSelect
      ) {
        const optionList = data.optionList;
        if (optionList && optionList.length > 1) {
          for (let i = 0, len = optionList.length; i < len; i++) {
            const val = optionList.some((item, index) => {
              if (index !== i) {
                return optionList[i].description === item.description;
              }
              return false;
            });
            if (val) {
              this._message(`第${index + 1}题选项内容不能重复`);
              result = true;
              break;
            }
          }
        }
      }
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
