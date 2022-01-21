// 为减小问卷详情页index.vue 代码体积 提取部分校验和处理方法至此处
import { quesType } from "@/views/qms/questionnaire/manage/const/ques";

export default {
  data() {
    return {};
  },
  methods: {
    quesIndex(index = 0, data = []) {
      if (data[index].type === "10") return 0;
      let newIndex = +index + 1;
      for (let i = 0; i < index; i++) {
        if (data[i].type === "10") newIndex -= 1;
        if (data[i].isShow === "2") newIndex -= 1;
      }
      return newIndex;
    },
    // 验证
    _validate(data) {
      let result = true;
      for (let i = 0, len = data.length; i < len; i++) {
        const val = data[i];
        if (val.isShow === "2") {
          continue;
        }
        if (val.isRequire === "1") {

          if (
            val.type === quesType.multipleElection ||
            val.type === quesType.multipleImgSelect
          ) {

            if (
              !(val.answer && val.answer.value && val.answer.value.length > 0)
            ) {
              this.$message({
                // message: `第${val.orderNumber}题未做答`,
                message: `第${this.quesIndex(i, data)}题未做答`,
                type: "warning",
              });
              result = false;
              break;
            } else {
              const min = val.minNum;
              const max = val.maxNum;
              if (max > 0 && max >= min) {
                const len = val.answer.value.length;
                if (!(len <= max && len >= min)) {
                  this.$message({
                    message: `第${this.quesIndex(i, data)}题至少选择${min}个最多选择${max}个`,
                    type: "warning",
                  });
                  result = false;
                  break;
                }
              }
            }
          } else if (val.type === quesType.multipleFillBlank) {
            const arr = val.optionList.map(item => {
              return item.name;
            });
            let status = false;
            arr.forEach(item => {
              if (!(val.answer[item] && val.answer[item].trim() !== "")) {
                status = true;
                return false;
              }
            });
            if (status) {
              this.$message({
                message: `第${this.quesIndex(i, data)}题未做答`,
                type: "warning",
              });
              result = false;
              break;
            }
          } else if (val.type === quesType.scoring) {
            const arr = val.optionList.map(item => {
              return item.name;
            });
            let status = false;
            arr.forEach(item => {
              if (val.answer[item] < 0) {
                status = true;
                return false;
              }
            });
            if (status) {
              this.$message({
                message: `第${this.quesIndex(i, data)}题未做答`,
                type: "warning",
              });
              result = false;
              break;
            }
          } else if (val.type === quesType.fileUpload) {
            if (!(val.answer.value && val.answer.value.length > 0)) {
              this.$message({
                message: `第${this.quesIndex(i, data)}题未做答`,
                type: "warning",
              });
              result = false;
              break;
            }
          } else {
            if (!(val.answer && val.answer.value)) {
              this.$message({
                message: `第${this.quesIndex(i, data)}题未做答`,
                type: "warning",
              });
              result = false;
              break;
            }
          }
        }
      }
      return result;
    },
    _getGrade(item) {
      let str = 0;
      if (
        item.type == 1 ||
        item.type == 2 ||
        item.type == 3 ||
        item.type == 4 ||
        item.type == 5
      ) {
        const answer = item.answer.value;
        if (answer) {
          for (const item2 of item.optionList) {
            if (item2.name == answer) {
              str = item2.grade;
            }
          }
        }
      }
      return str;
    },
    //答案序列化
    _getContent(type, answer, isShow) {
      const strArr = [];
      if (isShow === "2") {
        return "";
      }
      if (type == quesType.fileUpload) {
        return JSON.stringify(answer);
      }
      if (type == quesType.multipleFillBlank) {
        const obj = {
          ...answer,
        };
        delete obj.value;
        return JSON.stringify(obj);
      }
      if (type == quesType.scoring) {
        const obj = {
          ...answer,
        };
        delete obj.value;
        return JSON.stringify(obj);
      }
      if (answer.value instanceof Array && answer.value.length > 0) {
        for (const item of answer.value) {
          if (Object.prototype.hasOwnProperty.call(answer, item)) {
            strArr.push(item + "^" + answer[item]);
          } else {
            strArr.push(item);
          }
        }
      } else {
        if (answer.value) {
          if (Object.prototype.hasOwnProperty.call(answer, answer.value)) {
            strArr.push(answer.value + "^" + answer[answer.value]);
          } else {
            strArr.push(answer.value);
          }
        } else {
          for (const key in answer) {
            if (key != "value") {
              strArr.push(key + "^" + answer[key]);
            }
          }
        }
      }
      return strArr.join(",");
    },
  },

};
