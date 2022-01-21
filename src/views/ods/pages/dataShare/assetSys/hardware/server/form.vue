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
      <el-form-item label="服务器名称:" prop="name" class="half-line">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属单位:" prop="deptId" class="half-line">
        <el-input v-model="formData.deptId" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属业务系统:" prop="systemId" class="half-line">
        <el-input v-model="formData.systemId" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="资产编号：" prop="code" class="half-line">
        <el-input v-model="formData.code" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="内网IP:" prop="innerIpList" class="half-line">
        <div class="full-width">
          <div class="lawTerms" v-for="(item,index) in innerIpList" :key="index">
            <el-input
              :disabled="formStatus=='detail'"
              v-model="innerIpList[index]"
              placeholder="请输入关联条目内容"
              maxlength="200"
              clearable
            ></el-input>
            <el-button
              type="primary"
              v-show="formStatus!='detail'"
              icon="el-icon-plus"
              circle
              v-if="index===0"
              class="btnMargin"
              @click="addInput('innerIpList')"
            ></el-button>
            <el-button
              type="danger"
              v-show="formStatus!='detail'"
              icon="el-icon-minus"
              circle
              v-else
              class="btnMargin"
              @click="cutInput(index,'innerIpList')"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="MAC地址:" prop="macAddrList" class="half-line">
        <div class="full-width">
          <div class="lawTerms" v-for="(item,index) in macAddrList" :key="index">
            <el-input
              :disabled="formStatus=='detail'"
              v-model="macAddrList[index]"
              placeholder="请输入关联条目内容"
              maxlength="200"
              clearable
            ></el-input>
            <el-button
              type="primary"
              v-show="formStatus!='detail'"
              icon="el-icon-plus"
              circle
              v-if="index===0"
              class="btnMargin"
              @click="addInput('macAddrList')"
            ></el-button>
            <el-button
              type="danger"
              v-show="formStatus!='detail'"
              icon="el-icon-minus"
              circle
              v-else
              class="btnMargin"
              @click="cutInput(index,'macAddrList')"
            ></el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="外网IP：" prop="outerIp" class="half-line">
        <el-input v-model="formData.outerIp" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="重要程度：" prop="degree" class="half-line">
        <el-select v-model="formData.degree" maxlength="150" class="full-width">
          <el-option
            v-for="item in degree"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维保开始时间：" prop="upholdStart" class="half-line">
        <el-date-picker v-model="formData.upholdStart" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="维保到期时间：" prop="upholdEnd" class="half-line">
        <el-date-picker v-model="formData.upholdEnd" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="资产使用状态：" prop="status" class="half-line">
        <el-select v-model="formData.status" maxlength="150" class="full-width">
          <el-option
            v-for="item in status"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人：" prop="contacter" class="half-line">
        <el-input v-model="formData.contacter" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="负责人电话：" prop="contacterTel" class="half-line">
        <el-input v-model="formData.contacterTel" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="资产位置：" prop="address" class="half-line">
        <el-input v-model="formData.address" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="入场时间：" prop="entranceTime" class="half-line">
        <el-date-picker v-model="formData.entranceTime" type="date" class="full-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="厂商：" prop="supplier" class="half-line">
        <el-select v-model="formData.supplier" maxlength="150" class="full-width">
          <el-option
            v-for="item in supplier"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="型号：" prop="productMold" class="half-line">
        <el-input v-model="formData.productMold" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="厂商联系人：" prop="supplierName" class="half-line">
        <el-input v-model="formData.supplierName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="厂商联系方式：" prop="supplierTel" class="half-line">
        <el-input v-model="formData.supplierTel" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="操作系统：" prop="operatingSystem" class="half-line">
        <el-select v-model="formData.operatingSystem" maxlength="150" class="full-width">
          <el-option
            v-for="item in operatingSystem"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="承载资源—数据库：" prop="databaseList" class="half-line">
        <el-input v-model="formData.databaseList" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="承载资源—中间件：" prop="savantList" class="half-line">
        <el-input v-model="formData.savantList" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="承载资源—应用：" prop="softwareList" class="half-line">
        <el-input v-model="formData.softwareList" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否国产：" prop="isDomestic" class="half-line">
        <el-select v-model="formData.isDomestic" maxlength="150" class="full-width">
          <el-option
            v-for="item in isDomestic"
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
        <el-input v-model="formData.remarks" maxlength="500" type="textarea"></el-input>
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
      innerIpList: [""],
      macAddrList: [""],
      degree: [
        { label: "重要", value: "1" },
        { label: "关键", value: "2" },
        { label: "一般", value: "3" },
        { label: "其他", value: "4" },
      ],
      status: [
        { label: "故障设备", value: "1" },
        { label: "库存备用", value: "2" },
        { label: "已停用", value: "3" },
        { label: "使用中", value: "4" },
      ],
      supplier: [
        { label: "联想", value: "1" },
        { label: "ZTE", value: "2" },
        { label: "DELL", value: "3" },
        { label: "IBM", value: "4" },
        { label: "浪潮", value: "5" },
        { label: "华为", value: "6" },
        { label: "其它", value: "7" },
      ],
      operatingSystem: [
        { label: "红旗Linux", value: "1" },
        { label: "AIX", value: "2" },
        { label: "CENTOS", value: "3" },
        { label: "SUSE LINUX", value: "4" },
        { label: "UNIX", value: "5" },
        { label: "LINUX", value: "6" },
        { label: "WINDOWS", value: "7" },
      ],
      isDomestic: [
        { label: "是", value: "1" },
        { label: "否", value: "0" },
      ],
      fileList: [],
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    addInput(name) {
      const obj = {
        id: null,
        lawId: null,
        content: "",
      };
      this[name].push(obj);
    },
    cutInput(idx, name) {
      this[name].splice(idx, 1);
    },
    open(row) {
      this.formData = row;
      this.innerIpList = row.innerIpList;
      this.macAddrList = row.macAddrList;
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
.lawTerms {
  display: flex;
  width: 100%;
  .btnMargin {
    margin-left: 10px;
  }
}
.full-width {
  width: 100%;
}

.lawTerms + .lawTerms {
  margin-top: 20px;
}
</style>
