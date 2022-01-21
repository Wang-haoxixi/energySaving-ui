<template>
  <div class="subject-setting-wrapper">
    <div>
      <p class="title">题目设置</p>
      <draggable v-model="formData" :animation="100" :move="onmove">
        <edit-form
          ref="mainContainer"
          v-for="(item,index) in formData"
          :key="index"
          :data="item"
          :index="index"
          :quesIndex="quesIndex(index)"
          @handleCopy="handleCopy"
          :list="formData"
          :star="showGrade"
          @handleDelete="handleDelete"
          @pushQuestion="insertSubject"
        ></edit-form>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import EditForm from "../../../editForm/index";
// import { cloneDeep } from "lodash";//
export default {
  components: {
    draggable,
    EditForm,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showGrade: false,
      formData: [
        //   {
        //     title: "结束语",
        //     type: "11",
        //     timeType: 1,
        //     logic: {},
        //     isShow: "1",
        //     optionList: [
        //       {
        //         name: "答卷成功，感谢您的帮助与支持！",
        //         type: 2,
        //       },
        //       {
        //         name: "",
        //         type: 2,
        //       },
        //     ],
        //     isRequire: "2",
        //     answer: {
        //       value: "",
        //     },
        //   },
      ],
    };
  },
  watch: {
    data: {
      handler(newVal) {
        this.formData = newVal;
      },
      deep: true,
      immediate: true,
    },
    formData: {
      handler(newVal) {
        this.$emit("changeQuesData", newVal);
      },
      deep: true,
    },
  },
  methods: {
    // 拖拽
    onmove({ draggedContext, relatedContext }) {
      // 可解构relatedContext
      draggedContext.element = this.transCopyData(
        //拖拽之后清除该题逻辑配置
        JSON.parse(JSON.stringify(draggedContext.element)),
      );
      relatedContext.element = this.transCopyData(
        //拖拽之后清除被替换题逻辑配置
        JSON.parse(JSON.stringify(relatedContext.element)),
      );
      this.formData[draggedContext.index] = draggedContext.element;
      this.formData[relatedContext.index] = relatedContext.element;
    },
    // 复制
    handleCopy(index) {
      const data = this.transCopyData(
        JSON.parse(JSON.stringify(this.formData[index])),
      );
      // this.formData.splice(-1, 0, data);
      this.formData.push(data);
      this.$emit("scrollToBottom");
    },
    //删除题目中的逻辑和指标关联
    transCopyData(data) {
      const obj = {
        ...data,
      };
      obj.logic = {};
      delete obj.evaluateId;
      // obj.isGrade = "2";
      if (obj.optionList.length > 0) {
        for (const item of obj.optionList) {
          item.grade = 0;
        }
      }
      return obj;
    },
    // 删除
    handleDelete(index) {
      this.formData.splice(index, 1);
    },
    // 插入数据
    insertSubject(row, index) {
      this.formData.splice(index + 1, 0, JSON.parse(JSON.stringify(row)));
      this.$nextTick(() => {
        this.$emit(
          "scrollToAnchor",
          this.$refs["mainContainer"][index + 1].$el.offsetTop,
        );
      });
    },
    getQuesData() {
      return this.formData;
    },
    quesIndex(index = 0) {
      if (this.formData[index].type === "10") return 0;
      let newIndex = +index + 1;
      for (let i = 0; i < index; i++) {
        if (this.formData[i].type === "10") newIndex -= 1;
      }
      return newIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>