<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">
        上传题
        <span class="tips">提示：该题型暂时无法在移动端显示</span>
      </h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="150" placeholder="最多输入150个字"></el-input>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <!-- {{data}} -->
        <h3 class="sub-title" :id="'a'+data.orderNumber" :name="'a'+data.orderNumber">
          {{(data.index || index)+ ". "}}
          <span>{{data.title}}(上传题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <el-upload
          :action="uploadUrl"
          :headers="header"
          :file-list="disabled?data.answer.value:[]"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          :on-error="handleError"
          :before-upload="beforeImgUpload"
          :show-file-list="true"
          :limit="1"
          :disabled="disabled"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
        >
          <el-button type="primary" :disabled="disabled">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传1份文件，且不超过10MB</div>
        </el-upload>
      </div>
    </template>
  </div>
</template>

<script>
import uploadMixin from "./mixin/upload";
import baseMixin from "./mixin/base";
// import { downloadUrl } from "@/api/common";

export default {
  mixins: [uploadMixin, baseMixin],
  methods: {
    async handleSuccess(response) {
      const data = response.data;
      // data.name = data.original;
      data.name = data.fileName;
      this.data.answer.value.splice(0, this.data.answer.value.length, data);
      // this.data.optionList.push(data);
    },
    handleDelete(index) {
      // let fileList = [...this.data.optionList];
      this.data.answer.value.splice(index, 1);
      // this.$set(this.data, "optionList", fileList);
    },
    handleRemove() {
      this.data.answer.value.splice(0, 1);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      if (!this.disabled) {
        file = file.response.data;
      }
      const newPage = this.$router.resolve({
        path: file.url,
      });
      window.open(newPage.href, "_blank");
      // if (file.newFileName) {
      //   downloadUrl(file.newFileName, file.fileName);
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css/style.scss";
</style>
