<template>
  <div>
    <div v-if="editFlag" class="form-card">
      <!-- 系统预设 -->
      <div class="default-box">
        <div>
          <div class="item" v-for="dItem of defaultList" :key="dItem.label">
            <div>
              <el-checkbox v-model="dItem.must" :disabled="disabled(dItem)">必填</el-checkbox>
              <span class="item-label">{{dItem.label}}</span>
            </div>
          </div>
        </div>
        <div class="general-box">
          <div class="title">常规项</div>
          <div class="choose-box">
            <iep-button
              v-for="gItem of defaultFormList.slice(2)"
              type="primary"
              :plain="!findSame(gItem,defaultList)"
              :key="gItem.label"
              :title="`添加${gItem.label}`"
              @click="handleSwitch(gItem)"
            >{{gItem.label}}</iep-button>
          </div>
        </div>
      </div>
      <!-- 更多选项 -->
      <div class="more-box">
        <div class="title">更多选项</div>
        <div class="option-box">
          <el-button
            v-for="mItem of formItemType"
            :key="mItem.value"
            @click="handleAdd(mItem)"
            :title="`添加${mItem.label}`"
          >{{mItem.label}}</el-button>
        </div>
        <div class="custom-box">
          <div v-for="(cItem,index) of customList" :key="'custom'+index">
            <div class="custom-item">
              <el-checkbox v-model="cItem.must">必填</el-checkbox>
              <div>
                <el-input
                  v-model="cItem.label"
                  maxlength="50"
                  show-word-limit
                  :placeholder="formItemTypeMap[cItem.type]"
                  @blur="handleBlur(cItem,index)"
                ></el-input>
              </div>
              <i class="el-icon-woneng-tuichushixin" title="删除" @click="handleDelete(index)"></i>
            </div>
            <div v-if="cItem.optionsList" class="option-list">
              <div class="title">选项列表</div>
              <OptionInput v-model="cItem.optionsList"></OptionInput>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-box">
        <el-button type="primary" plain @click="handleView">预览表单</el-button>
      </div>
    </div>
    <div v-else class="form-none form-card" @click="handleEdit">
      <i class="el-icon-woneng-jiahao"></i>
      如果您需要收集参与者的必要信息，请添加；若没有则跳过
    </div>
    <DialogForm ref="dialogForm"></DialogForm>
  </div>
</template>
<script>
// import { getFormConfig } from "@/api/meetting/config";
import { mapGetters } from "vuex";
import { defaultFormList, customFormMap } from "../options";
import OptionInput from "./OptionInput";
import DialogForm from "./DialogForm";
import { formType as type } from "../options";

export default {
  name: "CustomForm",
  components: {
    OptionInput,
    DialogForm,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultList: [],
      customList: [],
      defaultFormList,
      editFlag: false,
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    formItemType() {
      const activityFormItemType = this.dictGroup.get(
        "activity_form_item_type",
      );
      return (
        (activityFormItemType &&
          activityFormItemType.map((m) => ({
            value: m.value,
            label: m.label,
          }))) ||
        []
      );
    },
    formItemTypeMap() {
      const map = {};
      this.formItemType.forEach((m) => {
        map[m.value] = m.label;
      });
      return map;
    },
    customFormList: {
      get: function () {
        return this.form.conferenceFormList;
      },
      set: function (newValue) {
        this.form.conferenceFormList = newValue;
        if (this.form.conferenceFormList.length && !this.editFlag) {
          this.editFlag = true;
        }
      },
    },
  },
  methods: {
    findSame(item, list) {
      if (!item || !list) return true;
      return (
        list.findIndex(
          (m) => item.label === m.label && item.type === m.type,
        ) !== -1
      );
    },
    disabled(v) {
      return this.findSame(v, this.defaultFormList.slice(0, 2));
    },
    init() {
      this.defaultFormList.splice(0, 2, ...this.customFormList.slice(0, 2));
      this.defaultList = this.customFormList.filter((m) =>
        this.findSame(m, defaultFormList),
      );
      this.customList = this.customFormList.filter(
        (m) => !this.findSame(m, defaultFormList),
      );
      if (this.customFormList.length > 2) {
        this.editFlag = true;
      }
    },
    handleCombine() {
      this.customFormList = [...this.defaultList, ...this.customList];
      return this.customFormList;
    },
    handleEdit() {
      this.defaultList = this.defaultFormList.slice(0, 2);
      this.editFlag = true;
    },
    handleSwitch(item) {
      const index = this.defaultList.findIndex(
        (m) => item.label === m.label && item.type === m.type,
      );
      if (index === -1) {
        this.defaultList.push(item);
      } else {
        this.defaultList.splice(index, 1);
      }
    },
    handleAdd(item) {
      const { length } = this.customList;
      if (length >= 10) {
        this.$message.warning("自定义项最多可以添加10条");
        return;
      }
      this.customList.push(customFormMap[item.value]());
    },
    handleDelete(index) {
      this.customList.splice(index, 1);
    },
    handleBlur(item, index) {
      const hasFlag = this.findSame(item, this.defaultFormList);
      const repeatFlag =
        this.customList.findIndex(
          (m) => item.label === m.label && item.type === m.type,
        ) !== index;
      item.placeholder = "";
      if (hasFlag) {
        this.$message.warning("该选项已存在于常规项中");
        item.label = "";
        return false;
      }
      if (repeatFlag) {
        this.$message.warning("该选项已存在");
        item.label = "";
        return false;
      }
      if ([type.input, type.textarea].includes(item.type)) {
        item.placeholder = `请输入${item.label}`;
      } else if ([type.radio, type.checkbox].includes(item.type)) {
        item.placeholder = `请选择${item.label}`;
      } else {
        item.placeholder = ``;
      }
      return true;
    },
    handleValid() {
      let flag = true;
      this.customList.forEach((m) => {
        const condition =
          ["radio", "checkbox"].includes(m.type) && m.optionsList.length === 0;
        if (!m.label || condition) {
          flag = false;
        }
      });
      if (flag) {
        this.handleCombine();
      } else {
        this.$message.warning("请补全报名表单选项信息");
      }
      return flag;
    },
    handleView() {
      if (this.handleValid()) {
        this.$refs["dialogForm"].form = JSON.parse(
          JSON.stringify(this.customFormList),
        );
        this.$refs["dialogForm"].dialogTitle = "预览表单";
        this.$refs["dialogForm"].status = "preview";
        this.$refs["dialogForm"].dialogShow = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-card {
  border-radius: $--border-radius-base;
  border: 1px solid $--border-color;
  padding: 20px;
  &.form-none {
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: $--color-text-secondary;
    i {
      vertical-align: middle;
      font-size: 20px;
      color: $--color-third;
    }
    &:hover {
      box-shadow: 0px 0px 10px -7px $--color-primary;
    }
    &:active {
      background-color: $--custom-menu-background-color;
    }
  }
  .title {
    font-size: 14px;
    color: $--color-text-primary;
    margin-bottom: 15px;
  }
  .default-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .item {
      .item-label {
        font-size: 14px;
        margin-left: 30px;
        color: $--color-text-secondary;
      }
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .general-box {
      width: 200px;
      padding: 15px;
      border: 1px dashed $--border-color;
      border-radius: $--border-radius-base;
      .choose-box {
        display: grid;
        gap: 20px 15px;
        grid-template-columns: 1fr 1fr;
        .el-button {
          margin-left: 0;
          &.el-button--primary.is-plain:focus {
            // color: #f74437;
            color: $--color-primary;
            border-color: #fcb4af;
            background-color: #fff;
          }
        }
      }
    }
  }
  .more-box {
    .option-box {
      margin-bottom: 20px;
    }
    .custom-box {
      & > div {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      .option-list {
        margin-top: 15px;
        margin-left: 75px;
        .title {
          color: $--color-text-regular;
        }
      }
      .custom-item {
        display: flex;
        align-items: center;
        & > div {
          margin-left: 20px;
          flex: 1;
        }
        i {
          margin-left: 10px;
          color: $--color-primary;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .footer-box {
    margin-top: 30px;
    .el-button {
      padding: 12px 15px;
    }
  }
}
</style>
