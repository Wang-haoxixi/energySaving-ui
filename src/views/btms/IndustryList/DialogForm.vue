<template>
  <iep-dialog :dialog-show="dialogShow" :title="`行业${methodName}`" width="480px" @close="loadPage">
    <el-form class="form-detail" :model="form" ref="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="行业名称" class="form-half" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="行业等级" prop="type">
        <el-input v-model="form.type" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="行业说明" prop="introduction">
        <el-input type="textarea" v-model="form.introduction"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="dialogShow=false" plain>取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
import { initForm, dictsMap, rules } from "./options";
import formMixins from "@/mixins/formMixins";
import { getPageDetailById } from "@/api/dms/industry.ts";
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
      id: null,
      parentId: "",
    };
  },
  methods: {
    loadPage() {
      this.dialogShow = false;
      this.form = initForm();
      this.$emit("load-page");
    },
    getValueByKey() {
      this.form.type = dictsMap.type[this.form.type];
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
        this.getValueByKey();
      });
    },
    async submitForm() {
      this.form.parentId = this.parentId;
      this.form.type = getKeyByValue(dictsMap.type, this.form.type);
      this.formRequestFn({ ...this.form, id: this.id }).then(data => {
        if (data.data) {
          this.$message.success("操作成功");
          this.loadPage();
        } else {
          this.$message(data.msg);
        }
      });
    },
  },
};
</script>
