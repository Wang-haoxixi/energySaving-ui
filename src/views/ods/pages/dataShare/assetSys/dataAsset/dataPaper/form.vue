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
      <el-form-item label="其他数据名称：" prop="name" class="half-line">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="编制人：" prop="headName" class="half-line">
        <el-input v-model="formData.headName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="类别：" prop="mold" class="half-line">
        <el-select v-model="formData.mold" class="full-width">
          <el-option
            v-for="item in moldDict"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属单位：" prop="deptId" class="half-line">
        <el-input v-model="formData.deptId" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="重要程度：" prop="degree" class="half-line">
        <el-select v-model="formData.degree" class="full-width">
          <el-option
            v-for="item in degreeDict"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资产存放位置：" prop="address" class="half-line">
        <el-input v-model="formData.address" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="资产使用状态：" prop="status" class="half-line">
        <el-select v-model="formData.status" class="full-width">
          <el-option
            v-for="item in statusDict"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="相关文档:" prop="fileList" class="half-line">
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
      <el-form-item label="附件:" prop="annexList" class="half-line">
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
      <el-form-item label="备注：" prop="remarks">
        <el-input v-model="formData.remarks" maxlength="1000" type="textarea"></el-input>
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
      fileList: [],
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
      statusDict: [
        { label: "使用中", value: "1" },
        { label: "已停用", value: "2" },
      ],
      degreeDict: [
        { label: "重要", value: "1" },
        { label: "关键", value: "2" },
        { label: "一般", value: "3" },
        { label: "其他", value: "4" },
      ],
      moldDict: [
        { label: "基础类", value: "1" },
        { label: "技术类", value: "2" },
        { label: "管理类", value: "3" },
      ],
      databaseMoldDict: [
        { label: "金仓", value: "1" },
        { label: "达梦", value: "2" },
        { label: "Mysql", value: "3" },
        { label: "DB2", value: "4" },
        { label: "Sqlserver", value: "5" },
        { label: "Oracle", value: "6" },
        { label: "其他", value: "7" },
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
