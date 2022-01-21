<template>
  <iep-dialog :dialog-show="dialogShow" :title="`广告位${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" :rules="rules" label-width="105px">
      <iep-form-item label-name="上级站点">
        <el-input v-model="siteId" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告位名称" prop="name">
        <el-input v-model="form.name" maxlength="100" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告位编码" prop="adslotNumber">
        <el-input v-model="form.adslotNumber" maxlength="100" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告位描述">
        <el-input v-model="form.adslotDescription" type="textarea" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文字</el-radio>
          <el-radio :label="0">图片</el-radio>
        </el-radio-group>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="submitForm()">提交</el-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from "@/api/conm/adslot_controller.ts";
import { initForm, dictsMap, rules } from "./options.ts";
import formMixins from "@/mixins/formMixins";
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
      id: 0,
      siteId: 0,
    };
  },
  // },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
    },
    async submitForm() {
      this.formRequestFn({ siteId: this.siteId, ...this.form }).then(data => {
        if (data.code === 0) {
          this.$message.success("操作成功");
          this.loadPage();
          this.$emit("load-page");
        } else {
          this.$message(data.message);
        }
      });
    },
  },
};
</script>
