<template>
  <div class="card-wrap" title="点击编辑联系人信息" @click="handleEdit">
    <div>联系人{{index+1}}</div>
    <div class="iep-ellipsis-flex" :title="value[0].value">
      姓名：
      <span>{{value[0].value}}</span>
    </div>
    <div class="iep-ellipsis-flex" :title="value[1].value">
      手机：
      <span>{{value[1].value}}</span>
    </div>
    <i
      v-if="contactList.length>1"
      title="删除联系人"
      class="el-icon-woneng-guanbihuozheshibaishixin"
      @click.stop="handleDel"
    ></i>
    <DialogForm ref="dialogForm" :index="index" :contactList="contactList" @editForm="editForm"></DialogForm>
  </div>
</template>
<script>
import DialogForm from "@/views/meetting/publish/Components/DialogForm.vue";
export default {
  name: "ConcactCard",
  components: {
    DialogForm,
  },
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
    index: {
      type: Number,
      default: -1,
    },
    contactList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    handleDel() {
      this.$emit("delConcact", this.index);
    },
    handleEdit() {
      this.$refs["dialogForm"].form = JSON.parse(JSON.stringify(this.value));
      this.$refs["dialogForm"].dialogTitle = "编辑表单";
      this.$refs["dialogForm"].status = "edit";
      this.$refs["dialogForm"].dialogShow = true;
    },
    editForm(form) {
      this.$emit("updateValue", { form, index: this.index });
    },
  },
};
</script>
<style lang="scss" scoped>
.card-wrap {
  box-sizing: border-box;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  width: 100%;
  height: 100px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px -6px $--color-primary;
    i {
      display: block;
    }
  }
  div {
    font-size: 14px;
    &:first-of-type {
      color: $--color-text-primary;
    }
    span {
      color: $--color-text-secondary;
    }
  }
  i {
    display: none;
    position: absolute;
    cursor: pointer;
    top: -8px;
    right: -8px;
    font-size: 16px;
    color: $--color-primary;
    &:hover {
      font-size: 18px;
      top: -9px;
      right: -9px;
    }
  }
}
</style>