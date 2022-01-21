const _checkTime = (rule, value, callback) => {
  if (Array.isArray(value)) {
    value.map(function (item) {
      if (item === "") {
        return callback(new Error("日期不能为空"));
      }
    });
  } else {
    if (value === "") {
      return callback(new Error("日期不能为空"));
    }
  }
  return callback();
};
const _checkClassificationName = (rule, value, callback) => {
  value.forEach((m) => {
    if (!m) {
      return callback(new Error("分类不能为空"));
    }
  });
  return callback();
};
const _checkLabel = (rule, value, callback) => {
  if (value.length) {
    value.forEach((m) => {
      if (m.length > 6) {
        return callback(new Error("活动标签不能大于6个字"));
      }
    });
    return callback();
  }
  return callback(new Error("标签不能为空"));
};

export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "活动标题不能为空", trigger: "blur" },
        ],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
        // cityId: [
        //   { required: true, message: "城市不能为空", trigger: "change" },
        // ],
        // field: [{ required: true, message: "场地不能为空", trigger: "blur" }],
        classificationName: [
          { type: "array", required: true, message: "分类不能为空", trigger: "change" },
          { validator: _checkClassificationName, trigger: "blur" },
        ],
        label: [
          {
            required: true,
            validator: _checkLabel,
            trigger: "change",
          },
        ],
        spot: [
          { required: true, message: "活动亮点不能为空", trigger: "blur" },
        ],
        details: [
          { required: true, message: "活动详情不能为空", trigger: "change" },
        ],
        poster: [
          { required: true, message: "活动海报不能为空", trigger: "change" },
        ],
        time: [
          { required: true, message: "时间不能为空" },
          { validator: _checkTime, trigger: "blur" },
        ],
        cityField: [{ required: true, validator: this._checkCityField, trigger: "blur" }],
      },
    };
  },
  methods: {
    _checkCityField(rule, value, callback) {
      if (this.form.onLine) return callback();
      if (!value.cityId.length) return callback(new Error("举办地不能为空"));
      if (!value.field) return callback(new Error("活动地址不能为空"));
      callback();
    },
    // 线上时 清除地址验证
    handleChangeOnline(v) {
      if (v) {
        this.form.field = "";
        this.form.cityId = [];
        this.$refs["form"].clearValidate("cityField");
      }
    },
  },
};