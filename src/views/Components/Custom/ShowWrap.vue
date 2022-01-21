<template>
  <div>
    <div v-show="!showForm" class="item-primary">
      <h3 class="title">
        {{title}}
        <el-link
          class="link-add"
          type="primary"
          icon="el-icon-circle-plus-outline"
          :underline="false"
          @click="handleAdd()"
        >添加</el-link>
      </h3>
      <iep-no-data v-if="!value.length" :message="`暂无${title}`" complex></iep-no-data>
      <!-- 查看多个实例 -->
      <div class="ul" v-else>
        <!-- 单个实例 -->
        <div class="li" v-for="item in value" :key="item.id">
          <slot name="item" :scope="item"></slot>
          <div class="op">
            <el-link
              class="link"
              type="primary"
              icon="el-icon-delete"
              :underline="false"
              @click="handleDel(item)"
            >删除</el-link>
            <el-link
              class="link"
              type="primary"
              icon="el-icon-edit"
              :underline="false"
              @click="handleEdit(item)"
            >编辑</el-link>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showForm" class="item-form">
      <h3 class="title">{{optName}}{{title}}</h3>
      <slot name="form" :scope="form"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "IepShowWrap",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    initDto: {
      type: Function,
      required: true,
    },
    traslateForm: {
      type: Function,
      default: row => {
        return { ...row };
      },
    },
    reverseForm: {
      type: Function,
      default: row => {
        return { ...row };
      },
    },
  },
  data() {
    return {
      isEdit: false,
      isAdd: true,
      showForm: false,
      form: this.initDto(),
    };
  },
  computed: {
    optName() {
      if (this.isAdd) {
        return "新增";
      }
      if (this.isEdit) {
        return "编辑";
      }
      return "";
    },
  },
  methods: {
    handleDel(item) {
      let jsonData = [...this.value];
      jsonData = jsonData.filter(m => m.id !== item.id);
      this.$emit("input", jsonData);
    },
    handleEdit(item) {
      this._toEdit();
      this.form = this.$mergeByFirst(this.initDto(), this.traslateForm(item));
      this.showForm = true;
    },
    handleAdd() {
      this._toAdd();
      this.form = this.initDto();
      this.showForm = true;
    },
    save() {
      let jsonData = [];
      if (this.isAdd) {
        jsonData = [...this.value];
      }
      if (this.isEdit) {
        jsonData = [...this.value];
        jsonData = jsonData.filter(m => m.id !== this.form.id);
      }
      this.form = this.reverseForm(this.form);
      jsonData.push(this.form);
      this.$emit("input", jsonData);
      this.showForm = false;
      this._toAdd();
    },
    _toAdd() {
      this.isAdd = true;
      this.isEdit = false;
    },
    _toEdit() {
      this.isEdit = true;
      this.isAdd = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-form {
  padding: 20px;
  border-radius: 10px;
  background-color: $--background-color;
  h3.title {
    color: #24272e;
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 15px 10px;
    padding: 0;
  }
}
.item-primary {
  position: relative;
  border-bottom: 1px solid #f2f3f3;
  padding: 26px 0 15px;
  min-height: 114px;
  box-sizing: content-box;
  .title {
    margin: 0;
    padding: 0;
    position: relative;
    padding-left: 12px;
    font-size: 16px;
    font-weight: 400;
    &:before {
      content: "";
      position: absolute;
      width: 3px;
      height: 14px;
      border-radius: $--border-radius-base;
      background-color: $--color-primary;
      left: 0;
      top: 7px;
    }
    .link-add {
      position: absolute;
      top: 2px;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .ul {
    margin-top: 10px;
    .li {
      padding: 0 10px 8px 10px;
      position: relative;
      min-height: 40px;
      border-radius: 10px;
      .op {
        position: absolute;
        display: none;
        bottom: unset;
        top: 8px;
        right: 8px;
        .link {
          padding: 0 5px;
        }
      }
      &:hover {
        background-color: $--background-color;
        cursor: pointer;
        transition: all 0.15s linear;
        .op {
          display: block;
        }
      }
    }
  }
}
::v-deep .iep-flow-root {
  margin: 0 -20px;
}
</style>
