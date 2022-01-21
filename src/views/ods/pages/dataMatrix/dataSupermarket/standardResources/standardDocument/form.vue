<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="标准文件名称：" prop="name">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="标准号：" prop="number" class="half-line">
        <el-input v-model="formData.number" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="发布机构：" prop="pubAgency" class="half-line">
        <el-input v-model="formData.pubAgency" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="提出单位：" prop="proposalUnit" class="half-line">
        <el-input v-model="formData.proposalUnit" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="归口单位：" prop="putunderUnit" class="half-line">
        <el-input v-model="formData.putunderUnit" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="起草单位：" prop="draftingUnit">
        <el-input v-model="formData.draftingUnit" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="标准分类：" prop="classification" class="half-line">
        <el-select v-model="formData.classification" class="full-width">
          <el-option
            v-for="item in classificationDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标准性质：" prop="nature" class="half-line">
        <el-select v-model="formData.nature" class="full-width">
          <el-option
            v-for="item in natureDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ICS编码1：" prop="icsCodeFirst" class="half-line">
        <el-input v-model="formData.icsCodeFirst" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="ICS编码2：" prop="icsCodeSecond" class="half-line">
        <el-input v-model="formData.icsCodeSecond" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="CCS编码1：" prop="ccsCodeFirst" class="half-line">
        <el-input v-model="formData.ccsCodeFirst" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="CCS编码2：" prop="ccsCodeSecond" class="half-line">
        <el-input v-model="formData.ccsCodeSecond" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="UDC编码：" prop="udcCode" class="half-line">
        <el-input v-model="formData.udcCode" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否采标：" prop="isMark" class="half-line">
        <el-select v-model="formData.isMark" class>
          <el-option
            v-for="item in yesNoDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采标方式：" prop="markWay" v-if="formData.isMark === '1'" class="half-line">
        <el-select v-model="formData.markWay" class="full-width">
          <el-option
            v-for="item in markWayDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采标号：" prop="markCode" v-if="formData.isMark === '1'" class="half-line">
        <el-input v-model="formData.markCode" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：" prop="publishTime" class="half-line">
        <el-date-picker v-model="formData.publishTime" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="实施时间：" prop="implementationTime" class="half-line">
        <el-date-picker v-model="formData.implementationTime" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="版本(年代)号：" prop="version" class="half-line">
        <el-input v-model="formData.version" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="代替版本：" prop="repalceVersion" class="half-line">
        <el-input v-model="formData.repalceVersion" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="备注信息：" prop="remark">
        <el-input v-model="formData.remark" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
  </div>
</template>
<script>
import { initForm, rules, dictsMap } from "./option";

import { mapGetters } from "vuex";

export default {
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      loadState: false,
      dialogShow: false,
      methodName: "create",
      methodList: {
        create: {
          name: "新增",
          //requestFn: createForm,
        },
        update: {
          name: "编辑",
          //requestFn: updateForm,
        },
      },
      formData: initForm(),
      rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      fileList: [],
      classificationDict: [
        { label: "国家标准", value: "1" },
        { label: "行业标准", value: "2" },
        { label: "地方标准", value: "3" },
      ],
      natureDict: [
        { label: "强制性标准", value: "1" },
        { label: "推荐性标准", value: "2" },
      ],
      yesNoDict: [
        { label: "是", value: "1" },
        { label: "否", value: "2" },
      ],
      markWayDict: [
        { label: "等同(直接翻译)", value: "1" },
        { label: "等效(翻译+部分修改)", value: "2" },
        { label: "参照(依照国籍标准重新编写)", value: "3" },
      ],
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    open(row) {
      this.formData = row;
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadState = true;
          // // const row = { ...this.formData };
          // this.methodList[this.methodName].requestFn(row).then(({ data }) => {
          //   this.loadState = false;
          //   if (!data) {
          //     this.$message.error(data.msg);
          //   } else {
          if (this.formStatus == "create") {
            this.$message.success("新增成功");
          } else {
            this.$message.success("编辑成功");
          }
          this.loadPage();
          this.dialogShow = false;
        }
        //   });
        // } else {
        //   this.loadState = false;
        //   return false;
        // }
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.download {
  cursor: pointer;
}
.isCertified-tip {
  position: absolute;
  top: 25px;
  font-size: 12px;
  color: $--color-primary;
}
.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
