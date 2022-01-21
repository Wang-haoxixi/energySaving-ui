<template>
  <iep-dialog :dialog-show="dialogShow" :title="`栏目${methodName}`" width="500px" @close="close">
    <el-form class="form-detail" :model="form" ref="form" label-width="120">
      <el-form-item label="删除被合并的栏目：" prop="static">
        <el-radio-group v-model="form.static">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="oldOrNew">
        <el-radio-group v-model="form.oldOrNew">
          <el-radio :label="3">合并成新栏目</el-radio>
          <el-radio :label="6">合并到旧栏目</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="menus">
        <div>
          <span>待合并栏目</span>
          <menus></menus>
        </div>
        <div>
          <span>目标栏目</span>
          <menus></menus>
        </div>
      </div>
    </el-form>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="submitForm()">提交</el-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initMergeForm } from "./options.ts";
// import formMixins from '@/mixins/formMixins'
// import { mapGetters } from 'vuex'
import Menus from "./Menus";
export default {
  // mixins: [formMixins],
  components: { Menus },
  data() {
    return {
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initMergeForm(),
    };
  },
  // },
  methods: {
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style scoped lang="scss">
.menus {
  display: flex;
  & > * {
    width: 50%;
  }
}
</style>
