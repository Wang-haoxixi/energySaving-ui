<template>
  <iep-dialog :dialog-show="dialogShow" :title="`栏目${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" ref="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="所属栏目" prop="parentName">
        <el-input v-model="form.parentName" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="栏目编码" prop="nodeNumber">
        <el-input v-model="form.nodeNumber"></el-input>
      </iep-form-item>
      <iep-form-item label-name="栏目名称" prop="nodeName">
        <el-input v-model="form.nodeName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="标签" prop="tagKeyWords">
        <iep-tag v-model="form.tagKeyWords"></iep-tag>
      </iep-form-item>
      <iep-form-item label-name="栏目描述" prop="nodeDescribe">
        <el-input type="textarea" v-model="form.nodeDescribe"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="submitForm()">提交</el-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageById } from "@/api/conm/node_controller.ts";
import { initForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
// import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      rules,
      siteId: "",
      id: "",
    };
  },
  // },
  created() {},
  methods: {
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
      this.$emit("load-page");
    },
    loadTypeList() {
      getPageById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
    },
    async submitForm() {
      this.formRequestFn({
        id: this.id,
        siteId: this.siteId,
        ...this.form,
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success("操作成功");
          this.loadPage();
        } else {
          this.$message(data.message);
        }
      });
    },
  },
};
</script>
