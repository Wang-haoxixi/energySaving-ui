<template>
  <div>
    <div class="form-item" v-for="(item,index) of form" :key="item.label+'item'+index">
      <div class="label">
        <span v-if="item.must" class="must">*</span>
        <span class="text">{{item.label}}：</span>
      </div>
      <template v-if="item.type===type.input">
        <el-input
          v-model="item.value"
          :placeholder="disabled?'暂无':item.placeholder"
          :maxlength="inputMaxlength(item)"
          :show-word-limit="!disabled"
          :disabled="disabled"
        ></el-input>
      </template>
      <template v-if="item.type===type.radio">
        <div>
          <el-radio
            v-model="item.value"
            v-for="m of item.optionsList"
            :key="item.label+m.label+'option'"
            :label="m.value"
            :disabled="disabled"
            @change="radioChange(item.optionsList,item.value)"
          >{{m.label}}</el-radio>
        </div>
      </template>
      <template v-if="item.type===type.checkbox">
        <div>
          <el-checkbox
            v-for="m of item.optionsList"
            :key="item.label+m.label+'option'"
            v-model="m.select"
            :label="m.value"
            :disabled="disabled"
          >{{m.label}}</el-checkbox>
        </div>
      </template>
      <template v-if="item.type===type.textarea">
        <el-input
          type="textarea"
          v-model="item.value"
          :placeholder="disabled?'暂无':item.placeholder"
          maxlength="300"
          :show-word-limit="!disabled"
          :resize="disabled?'none':'vertical'"
          :autosize="disabled"
          :disabled="disabled"
        ></el-input>
      </template>
    </div>
  </div>
</template>
<script>
import { isMobile } from "@/util/validate";
import { formType as type } from "../options";
// const type = {
//   input: "input",
//   radio: "radio",
//   checkbox: "checkbox",
//   textarea: "textarea",
// };
export default {
  props: {
    form: {
      type: Array,
      required: true,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      type,
    };
  },
  methods: {
    // 单行文本 手机号长度11位其他30位
    inputMaxlength(m) {
      return m.code === "phone_number" ? 11 : 30;
    },
    radioChange(list, value) {
      list.forEach(m => {
        m.select = m.value === value;
      });
    },
    _validate(form = this.form, showMessage = true) {
      let phoneFlag = true;
      let validFlag = true;
      let message = "请输入";
      let phoneNum = "";
      for (const m of form) {
        if (!m.must) continue;
        if ([type.input, type.textarea].includes(m.type)) {
          if (m.value) {
            if (m.code === "phone_number") {
              phoneNum = m.value;
              if (!isMobile(m.value)) {
                phoneFlag = false;
                validFlag = false;
                message = `手机号格式不正确`;
                break;
              }
            }
            continue;
            // if (m.code === "phone_number" && !isMobile(m.value)) {
            //   phoneFlag = false;
            //   validFlag = false;
            //   message = `手机号格式不正确`;
            //   break;
            // } else {
            //   continue;
            // }
          }
          validFlag = false;
          message = `请输入${m.label}`;
          break;
        }
        if ([type.radio, type.checkbox].includes(m.type)) {
          const flag = m.optionsList.findIndex(m => m.select) !== -1;
          if (flag) continue;
          validFlag = false;
          message = `请选择${m.label}`;
          break;
        }
      }
      if (!validFlag && showMessage) {
        this.$message.warning(message);
      }
      return { validFlag, phoneFlag, phoneNum };
    },
  },
};
</script>
<style lang="scss" scoped>
.form-item {
  margin-bottom: 20px;
  position: relative;
  &:last-of-type {
    margin-bottom: 0;
  }
  .label {
    margin-bottom: 10px;
    .text {
      margin-left: 10px;
    }
    .must {
      position: absolute;
      color: $--color-primary;
    }
  }
}
</style>