<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="form-detail">
      <el-form-item label="标题：" prop="materialName">
        <el-input v-model="formData.materialName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="文章来源：" prop="isOriginal">
        <el-radio-group v-model="formData.isOriginal">
          <el-radio label="0">转载</el-radio>
          <el-radio label="1">原创</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="平台来源：" prop="platformSource" v-if="formData.isOriginal === '0'">
        <el-input v-model="formData.platformSource" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="原文链接：" v-if="formData.isOriginal === '0'">
        <el-input v-model="formData.originalLink" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="createUser">
        <el-input v-model="formData.createUser" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="materialIntro">
        <el-input type="textarea" :rows="5" v-model="formData.materialIntro" maxlength="300"></el-input>
      </el-form-item>
      <el-form-item label="正文：" prop="materialContent">
        <iep-jodit-editor v-model="formData.materialContent" :limitChars="60000"></iep-jodit-editor>
      </el-form-item>
      <el-row>
        <!-- <el-col :span=12>
          <el-form-item label="类型：" prop="materialType">
            <el-select v-model="formData.materialType" placeholder="请选择">
              <el-option v-for="item in dictGroup.get('dms_material_type')" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item label="支付贝额：" prop="downloadCost">
            <!-- <el-input v-model="formData.downloadCost" type="number">
              <template slot="append">贝</template>
            </el-input>-->
            <IepInputAmount class="bei-unit" v-model="formData.downloadCost"></IepInputAmount>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标签：" prop="tag">
        <iep-tag-input v-model="formData.tag"></iep-tag-input>
      </el-form-item>
      <el-form-item label="是否开放：" prop="isOpen">
        <el-radio-group v-model="formData.isOpen">
          <el-radio :label="1">平台开放</el-radio>
          <el-radio :label="0">不开放</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="版权认证：" prop="isCertified">
        <el-radio-group v-model="formData.isCertified">
          <el-radio :label="1">认证</el-radio>
          <el-radio :label="0">不认证</el-radio>
        </el-radio-group>
        <p class="isCertified-tip" v-if="formData.isCertified === 1">区块链版权认证将会收取一宝贝，请慎重认证！</p>
      </el-form-item>-->
      <el-form-item label>
        <el-checkbox v-model="isAgree">同意</el-checkbox>
        <span class="notice" @click.stop="() => {$openPage('/my/index/material/5', 2)}">《节能保材料协议》</span>
      </el-form-item>
      <!-- <el-form-item label="附件：">
        <iep-upload v-model="formData.attachMultiFileList" :limit="1" action="/api/admin/file/upload"></iep-upload>
      </el-form-item>-->
    </el-form>

    <iep-footer-bar v-if="!isDialog">
      <el-button
        type="primary"
        @click="submitForm"
        :loading="loadState"
        :style="!isAgree ? 'cursor: not-allowed;' : ''"
      >保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
  </div>
</template>
<script>
import { initForm, rules, dictsMap } from "./option";
import { createForm, updateForm, getDataById } from "@/api/dms/material";
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
          requestFn: createForm,
        },
        update: {
          name: "编辑",
          requestFn: updateForm,
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
      isAgree: false,
    };
  },
  methods: {
    loadData(state, row) {
      this.isAgree = false;
      this.methodName = state;
      if (state === "update") {
        getDataById(row.id).then(({ data }) => {
          const row = { ...data };
          if (row.attachFile) {
            row.attachMultiFileList = [
              {
                name: row.original,
                url: row.attachFile,
              },
            ];
          } else {
            row.attachMultiFileList = [];
          }
          this.formData = Object.assign({}, this.formData, row);
          this.isAgree = true;
        });
      } else {
        // this.formData.createUser = this.userInfo.realName;
      }
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
      if (!this.isAgree) {
        this.$message.warning("发布前请先同意协议");
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          if (row.attachMultiFileList.length > 0) {
            row.attachFile = this.formData.attachMultiFileList[0].url;
            row.original = this.formData.attachMultiFileList[0].name;
          }
          this.methodList[this.methodName].requestFn(row).then(({ data }) => {
            this.loadState = false;
            if (!data) {
              this.$message.error(data.msg);
            } else {
              if (this.methodName == "create") {
                this.$message.success("恭喜您成功新建了一篇专栏，继续努力！");
              } else {
                this.$message.success("编辑成功");
              }
              this.loadPage();
              this.dialogShow = false;
            }
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
  },
  created() {},
  watch: {
    "formData.isOriginal"(val) {
      if (val === "1") {
        this.formData.createUser = this.userInfo.realName;
      }
    },
  },
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
.iep-page-form ::v-deep .title-wrapper {
  position: absolute;
  top: -67px;
  right: 0;
}
.notice {
  cursor: pointer;
  color: $--color-secondary;
}
</style>
