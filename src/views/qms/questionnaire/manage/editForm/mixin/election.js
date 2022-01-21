export default {
  methods: {
    /**
     * 单选题和多选题有输入框的情况下，选项切换的时候去除输入框中的内容
     * @param {String} id 获取的值
     * @param {Array} data 选项内容
     * @param {Object} answer 答案
     */
    setMultipleInput(id, data, answer) {
      let result = null;
      if (id) {
        if (typeof id === "number" || typeof id === "string") {
          // 单选题
          result = data.find((item) => {
            return item.name === id;
          });
          if (result) {
            if (result[0].type === "1") {
              data.forEach((item) => {
                if (item.type === "2") {
                  delete answer[item.name];
                }
              });
            } else if (result[0].type === "2") {
              data.forEach((item) => {
                if (item.type === "2" && result[0].name !== item.name) {
                  delete answer[item.name];
                }
              });
            }
          }
        } else if (Array.isArray(id)) {
          // 多选题
          if (result) {
            data.forEach(item => {
              if (!id.includes(item.name)) {
                if (item.type === "2") {
                  delete answer[item.name];
                }
              }
            });
          }
        }
      }
    },
  },
};