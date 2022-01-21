<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="选择模板"
    width="700px"
    @close="_close()"
    @mounted="load()"
  >
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item,index) in templateList"
        :key="item.categoryId"
        :title="item.title"
        :name="''+index"
      >
        <div class="wrap">
          <div class="content" v-html="item.template"></div>
          <div class="btn">
            <el-button @click="handleSelect(item)">选择</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </iep-dialog>
</template>
<script>
import { getTemplateWaringList } from "@/api/ims/template";
export default {
  data() {
    return {
      dialogShow: false,
      activeName: "0",
      templateList: [],
    };
  },
  methods: {
    async load() {
      const { data } = await getTemplateWaringList();
      this.templateList = data;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    handleSelect(item) {
      this.$emit("submit", item);
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  .btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 100px;
  }
}
</style>
