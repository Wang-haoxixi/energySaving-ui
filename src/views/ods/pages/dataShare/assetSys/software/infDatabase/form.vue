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
      <el-form-item label="数据库名称：" prop="name" class="half-line">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属单位：" prop="deptId" class="half-line">
        <el-input v-model="formData.deptId" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属业务系统：" prop="systemId" class="half-line">
        <el-input v-model="formData.systemId" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="维保开始时间：" prop="upholdStart" class="half-line">
        <el-date-picker v-model="formData.upholdStart" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="维保到期时间：" prop="upholdEnd" class="half-line">
        <el-date-picker v-model="formData.upholdEnd" type="date" class="full-width"></el-date-picker>
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
      <el-form-item label="软件厂商：" prop="supplier" class="half-line">
        <el-input v-model="formData.supplier" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="负责人：" prop="headName" class="half-line">
        <el-input v-model="formData.headName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系方式：" prop="headTel" class="half-line">
        <el-input v-model="formData.headTel" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="IP：" prop="ip" class="half-line">
        <el-input v-model="formData.ip" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="端口号：" prop="port" class="half-line">
        <el-input v-model="formData.port" maxlength="150" class="full-width"></el-input>
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
      <el-form-item label="采购时间：" prop="purchaseTime" class="half-line">
        <el-date-picker v-model="formData.purchaseTime" type="datetime" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="采购人员：" prop="purchaserName" class="half-line">
        <el-input v-model="formData.purchaserName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据库类型:" prop="databaseMold" class="half-line">
        <el-select v-model="formData.databaseMold" class="full-width">
          <el-option
            v-for="item in databaseMoldDict"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本：" prop="edition" class="half-line">
        <el-input v-model="formData.edition" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否国产:" prop="isDomestic" class="half-line">
        <el-select v-model="formData.isDomestic" class="full-width">
          <el-option
            v-for="item in isDomesticDict"
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
      isDomesticDict: [
        { label: "是", value: "1" },
        { label: "否", value: "0" },
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
