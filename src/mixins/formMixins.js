// 表单验证
export default {
  data() {
    return {
      submitFormLoading: false,
    };
  },
  methods: {
    mixinsValidate(formRefName = "form") {
      return new Promise((resolve, reject) => {
        this.$refs[formRefName].validate((v, o) => {
          if (v) {
            resolve(v);
          } else {
            reject(o);
          }
        });
      });
    },
    mixinsMessage(error) {
      let message = "";
      for (const key in error) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
          const i = Object.keys(error).indexOf(key);
          if (i === 0) {
            const element = error[key];
            message = element[0].message;
            this.$message(message);
            break;
          }
        }
      }
    },
    async mixinsForm(formRefName = "form") {
      this.submitFormLoading = true;
      try {
        const valid = await this.mixinsValidate(formRefName);
        if (valid) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.mixinsMessage(error);
        this.submitFormLoading = false;
        return false;
      } finally {
        this.submitFormLoading = false;
      }
    },
    async *mixinsFormGen(formRefName = "form") {
      this.submitFormLoading = true;
      try {
        const valid = await this.mixinsValidate(formRefName);
        if (valid) {
          yield true;
        } else {
          yield false;
        }
      } catch (error) {
        this.mixinsMessage(error);
        yield false;
      } finally {
        this.submitFormLoading = false;
      }
    },
    /**
     * 需要 form 表单 ref ='form', 可自定义
     * 需要 rules 规则
     * 需要 submitForm 方法同步,包括里面的请求函数
     */
    async mixinsSubmitFormGen(formRefName = "form") {
      const mixinsFormGen = this.mixinsFormGen(formRefName);
      let mixinsResult = false;
      try {
        const valid = (await mixinsFormGen.next()).value;
        if (valid) {
          mixinsResult = await this.submitForm();
        }
      } finally {
        await mixinsFormGen.next();
      }
      return mixinsResult;
    },
  },
};
