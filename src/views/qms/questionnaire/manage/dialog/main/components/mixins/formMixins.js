import { formInit } from "../const/base";
import { trim } from "lodash";
// 问题设置页表单验证规则
const validateRemarks = (rule, value, callback) => {
  if (trim(value)) callback();
  callback(new Error("请输入问卷描述"));
};
export default {
  data() {
    return {
      form: formInit(),
      rules: {
        name: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
        remarks: [
          { required: true, message: "请输入问卷描述", trigger: "blur" },
          { validator: validateRemarks, trigger: "blur" }
        ],
        scope: [
          { required: true, message: "请选择问卷范围", trigger: "change" }
        ],
        openAward: [
          { required: true, message: "请选择答案宝贝奖励", trigger: "change" }
        ],
        timeSetting: [
          { required: true, message: "请选择时间设置", trigger: "change" }
        ],
        timeRange: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        awardNumber: [
          {
            required: true,
            // message: "奖励宝贝必须大于0且最多2位小数",
            validator: this.checkAwardNumber,
            trigger: "change"
          }
        ],
        awardScope: [
          {
            required: true,
            // message: "奖励范围必须是大于0的整数",
            validator: this.checkAwardScope,
            trigger: "change"
          }
        ],
        awardTotal: [
          {
            // message: "总奖励宝贝不能超出组织已有宝贝",
            validator: this.checkAwardTotal,
            trigger: "change"
          }
        ],
        isMobile: [
          {
            required: true,
            message: "请选择是否限制手机号填写",
            trigger: "change"
          }
        ],
        mobileListText: [
          {
            required: true,
            validator: this.checkMobileListText,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    regAwardNumber(num) {
      //宝贝奖励数量的正则
      num = String(num);
      num = num.replace(/[^\d.]/g, "");
      num = num.replace(/\.{2,}/g, ".");
      num = num
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      num = num.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      if (num.indexOf(".") < 0 && num != "") {
        num = parseFloat(num);
      }
      return num;
    },
    regAwardScope(scope) {
      //宝贝奖励范围的正则
      scope = String(scope);
      if (scope.length == 1) {
        scope = scope.replace(/[^1-9]/g, "");
      } else {
        scope = scope.replace(/\D/g, "");
      }
      return scope;
    },
    setOpenAward(value) {
      //初始化宝贝奖励参数
      if (value === 2) {
        this.form.awardNumber = 1;
        this.form.awardScope = 1;
      } else {
        this.form.awardNumber = 0;
        this.form.awardScope = 0;
      }
    },
    checkAwardNumber(rule, v, callback) {
      //奖励宝贝校验控制
      this.form.awardNumber = this.regAwardNumber(this.form.awardNumber);
      if (!Number(this.form.awardNumber)) {
        callback(new Error("请输入合理的奖励宝贝"));
      }
      callback();
    },
    checkAwardScope(rule, v, callback) {
      //奖励范围校验控制
      this.form.awardScope = this.regAwardScope(this.form.awardScope);
      if (!this.form.awardScope) {
        callback(new Error("请输入奖励范围"));
      }
      callback();
    },
    checkAwardTotal(rule, v, callback) {
      //校验宝贝消耗
      let temp = false;
      if (typeof this.getAwardTotal === "number") {
        temp = this.getAwardTotal > this.balance ? true : false;
        if (temp) {
          callback(new Error(`宝贝超额，当前可用宝贝：${this.balance}贝`));
        } else {
          callback();
        }
      } else {
        callback(new Error("奖励宝贝或奖励范围输入有误"));
      }
    },
    checkMobileListText(rule, v, callback) {
      if (this.form.isMobile) {
        if (v) {
          const reg = /^(\d{11}\/)*\d{11}$/;
          if (!reg.test(v)) {
            return callback(
              new Error("输入格式错误，示例：15895867484/15895867999")
            );
          }
        } else {
          return callback(new Error("限制手机号不能为空"));
        }
      }
      callback();
    }
  }
};
