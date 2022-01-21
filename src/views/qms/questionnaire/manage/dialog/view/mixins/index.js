import {
  getDataById,
  getOuterDataById,
} from "@/api/qms/questionnaire";
import { getPageByQuesId } from "@/api/qms/answer";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
    isHeader: {
      type: Boolean,
      default: true,
    },
    isFooter: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      defalult: "",
    },
    statusType: {
      type: String,
      default: "editable",
    },
  },
  data() {
    return {
      data: {},
      loading: false,
      answerData: [],
    };
  },
  // mounted () {
  //   this.getPage();
  // },
  methods: {
    getPage() {
      const id = this.$route.params.id;
      if (id) {
        this._open(id);
      }
    },
    // 无token
    getList(id) {
      this.loading = true;
      getOuterDataById(id).then(data => {
        if (data.code === 0) {
          const result = data.data;
          result.quesQuestionDTO = this._setData(result.quesQuestionDTO);
          this.data = result;
          this.$emit("getData", result);
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });

    },
    // 获取答题
    getPageByQuesId(id, batchNo) {
      this.loading = true;
      getPageByQuesId({ questionnaireId: id, batchNo: batchNo, current: 1, size: 10000 }).then(data => {
        if (data.code === 0) {
          const result = data.data;
          this._setAnswer(result.records);
          // result.quesQuestionDTO = this._setData(result);
          // this.data = result;
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    // 有token
    _open(id) {
      this.getDataById(id);
    },
    // 赋值答案
    _setAnswer(data) {
      const qusList = this.data.quesQuestionDTO;
      const ansList = data;
      for (let i = 0, len = qusList.length; i < len; i++) {
        const queVal = qusList[i];
        const index = ansList.findIndex((item) => {
          return queVal.id === item.questionId;
        });
        const ansVal = ansList[index];
        if (index > -1) {
          const result = this._getAnswerData(ansVal.content, queVal.type);
          this.$set(queVal, "answer", result);
        }
      }
    },
    // 为每道题设置答案
    // _setSingAnswer (ques, ans) {
    //   if (ques.type === "1" || ques.type === "3" || ques.type === "5" || ques.type === "6") {
    //     ques.answer.value = ans.content;
    //   } else if (val.type === "2" || val.type === "4") {
    //     if (ans.content) {
    //       ques.answer.value = JSON.parse(ans.content);
    //     } else {
    //       ques.answer.value = [];
    //     }
    //   } else if (val.type === "3") { }
    // },
    // 获取问卷和问卷答题内容
    getQusAndAnswer(quesId, batchNo) {
      this.getDataById(quesId, () => {
        this.getPageByQuesId(quesId, batchNo);
      });
    },
    getDataById(id, callback) {
      this.loading = true;
      getDataById(id).then(data => {
        if (data.code === 0) {
          const result = data.data;
          result.quesQuestionDTO = this._setData(result.quesQuestionDTO);
          this.data = result;
          this.$emit("getData", result);
          callback && callback();
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
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
    // 提交
    submit() { },
    close() {
      this.$emit("close");
    },
    //答案反序列化
    _getAnswerData(str, type) {
      if (type == "9") {
        try {
          const fileList = JSON.parse(str);
          return fileList;
        } catch (err) {
          console.log(err);
          return {};
        }
      }
      if (type == "7" || type == "8") {
        return JSON.parse(str);
        // debugger
      }
      const obj = {};
      // ,分割
      const arr1 = str.split(",");
      if (arr1.length > 1) {
        const dataArr = [];
        for (const item of arr1) {
          let arr = [];
          if (type == "3" || type == "4" || type == "9") {
            arr = [item];
          } else {
            arr = item.split("^");
          }
          if (arr.length > 1) {
            dataArr.push(arr[0]);
            obj[arr[0]] = arr[1];
          } else {
            dataArr.push(arr[0]);
          }
        }
        obj.value = dataArr;
      } else {
        let arr = [];
        if (type == "3" || type == "4" || type == "9") {
          arr = [str];
        } else {
          arr = str.split("^");
        }
        if (arr.length > 1) {
          if (type == "2" || type == "4") {
            obj.value = [arr[0]];
          } else {
            obj.value = arr[0];
          }
          obj[arr[0]] = arr[1];
        } else {
          if (type == "2" || type == "4") {
            obj.value = [arr[0]];
          } else {
            obj.value = arr[0];
          }
        }
      }
      return obj;
    },
  },
};
