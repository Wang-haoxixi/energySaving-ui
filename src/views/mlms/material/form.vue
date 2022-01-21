<template>
  <iep-basic-container class="iep-page-form">
    <iep-page-header :title="`${methodList[methodName].name}材料`" :backOption="backOption"></iep-page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="140px" class="form-detail">
      <el-form-item label="名称：" prop="materialName">
        <el-input v-model="formData.materialName" maxlength="150" @blur="checkMaterialName"></el-input>
        <div class="el-form-item__error" v-if="checkName">此材料名已存在</div>
      </el-form-item>
      <el-form-item label="文章来源：" prop="isOriginal">
        <el-radio-group
          v-model="formData.isOriginal"
          :disabled="formData.beenModifiedTwice !== '0'"
        >
          <el-radio label="0">转载</el-radio>
          <el-radio label="1">原创</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="平台来源："
        prop="platformSource"
        v-if="formData.isOriginal === '0' || formData.beenModifiedTwice !== '0'"
      >
        <el-input
          v-model="formData.platformSource"
          maxlength="20"
          :disabled="formData.beenModifiedTwice !== '0'"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="原文链接："
        v-if="formData.isOriginal === '0' || formData.beenModifiedTwice !== '0'"
      >
        <el-input
          v-model="formData.originalLink"
          maxlength="200"
          :disabled="formData.beenModifiedTwice !== '0'"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="createUser">
        <el-input
          v-model="formData.createUser"
          maxlength="30"
          :disabled="formData.beenModifiedTwice !== '0' || formData.isOriginal === '1'"
        ></el-input>
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
            <IepInputAmount :precision="0" class="bei-unit" v-model="formData.downloadCost"></IepInputAmount>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属分类：">
            <el-col :span="24">
              <el-cascader
                style="width:100%"
                ref="cascader"
                v-model="formData.materialLevelId"
                :options="fileList"
                :props="cascaderProps"
                @change="handleChange"
              ></el-cascader>
            </el-col>
            <!-- <el-input v-model="formData.type" ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标签：" prop="tag">
        <iep-tag-input v-model="formData.tag"></iep-tag-input>
      </el-form-item>
      <!-- <el-form-item label="版权认证：" prop="isCertified">
        <el-radio-group v-model="formData.isCertified">
          <el-radio :label="1">认证</el-radio>
          <el-radio :label="0">不认证</el-radio>
        </el-radio-group>
        <p class="isCertified-tip" v-if="formData.isCertified === 1">区块链版权认证将会收取一宝贝，请慎重认证！</p>
      </el-form-item>-->
      <el-form-item label="附件：">
        <iep-upload
          v-model="formData.attachMultiFileList"
          :limit="3"
          action="/api/admin/file/oss/upload"
        ></iep-upload>
          <!-- action="/api/admin/file/upload" -->
      </el-form-item>
      <el-form-item label="是否共享到生态：">
        <el-switch
          v-model="formData.isOpen"
          active-color="#13CE66"
          inactive-color="#ddd"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否允许二次修改：">
        <el-switch
          v-model="formData.isAllowSecondary"
          active-color="#13CE66"
          inactive-color="#ddd"
          active-value="0"
          inactive-value="1"
        ></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-checkbox v-model="isAgree">同意</el-checkbox>
        <span class="notice" @click.stop="() => {$openPage('/my/index/material/5', 2)}">《节能保材料协议》</span>
      </el-form-item>
    </el-form>

    <iep-footer-bar>
      <el-button
        type="primary"
        @click="submitForm"
        :loading="loadState"
        :style="!isAgree ? 'cursor: not-allowed;' : ''"
      >保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
  </iep-basic-container>
</template>
<script>
import { initForm, rules, dictsMap, getLevelIds } from "./option";
import {
  createSoForm,
  updateSoForm,
  getDataById,
  checkMaterialName,
  createShareData,
} from "@/api/dms/material";
import { mapGetters } from "vuex";
import { getLevelTree } from "@/api/dms/materialLevel";

export default {
  props: {
    // 是否为组件引入
    isTpl: {
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
      isAgree: false,
      methodName: "create",
      methodList: {
        create: {
          name: "新增",
          requestFn: createSoForm,
        },
        update: {
          name: "编辑",
          requestFn: updateSoForm,
        },
        collectUpdate: {
          name: "编辑",
          requestFn: createShareData,
        },
      },
      formData: initForm(),
      rules,
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.backPage(false);
        },
      },
      cascaderProps: {
        checkStrictly: true,
        value: "id",
        label: "levelName",
        children: "childrens",
      },
      fileList: [],
      checkName: false, // 材料名称查重
    };
  },
  methods: {
    getLevelIds,
    loadData(state, row = {}) {
      this.isAgree = false;
      this.methodName = state;
      if (state === "update") {
        getDataById(row.id).then(({ data }) => {
          const row = { ...data };
          row.materialLevelId = this.getLevelIds(
            this.fileList,
            row.materialLevelId,
          );
          row.attachMultiFileList = row.attachMultiFileList.map((m) => {
            m.name = m.original;
            m.url = m.attachFile;
            return m;
          });
          this.formData = Object.assign({}, this.formData, row);
          this.isAgree = true;
        });
      } else if (state === "create") {
        this.formData = Object.assign({}, { ...row }, initForm());
        // this.formData.createUser = this.userInfo.realName;
      } else if (state === "collectUpdate") {
        getDataById(row.id).then(({ data }) => {
          const form = {
            materialName: data.materialName + "_副本",
            materialIntro: data.materialIntro,
            materialContent: data.materialContent,
            tag: data.tag || [],
            attachMultiFileList: data.attachMultiFileList,
            isOriginal: "1",
            platformSource: "节能保平台",
            originalLink: `${window.location.protocol}//${window.location.host}/channel/material/detail/${data.id}`,
            createUser: this.userInfo.realName,
            beenModifiedTwice: data.isOriginal === "0" ? "1" : "2",
            oldCreateUploadName:
              data.isOriginal === "0" ? data.realName : data.createUser,
            originalMaterialId: data.id,
          };
          this.formData = Object.assign({}, initForm(), form);
        });
      }
    },
    backPage(state) {
      if (!this.isTpl) {
        this.$router.push("/mlms/material");
      } else {
        this.$emit("load-page", state);
      }
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.checkName = false;
    },
    submitForm() {
      if (this.checkName) {
        return;
      }
      if (!this.isAgree) {
        this.$message.warning("发布前请先同意协议");
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.materialLevelId =
            row.materialLevelId[row.materialLevelId.length - 1] || "";
          row.attachMultiFileList = row.attachMultiFileList.map((m) => {
            m.attachFile = m.url;
            m.original = m.name;
            return m;
          });
          this.methodList[this.methodName]
            .requestFn(row)
            .then(({ data, msg }) => {
              this.loadState = false;
              if (!data) {
                this.$message.error(msg);
              } else {
                if (this.methodName == "create") {
                  this.$message.success("恭喜您成功新建了一篇材料，继续努力！");
                } else {
                  this.$message.success("编辑成功");
                }
                this.backPage(true);
              }
            });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
    handleChange() {
      this.$refs["cascader"].toggleDropDownVisible();
    },
    checkMaterialName() {
      if (!this.formData.materialName) {
        this.checkName = false;
        return;
      }
      checkMaterialName({
        id: this.formData.id,
        materialName: this.formData.materialName,
        orgId: this.userInfo.orgId,
      }).then(({ data }) => {
        this.checkName = data;
      });
    },
    getLevelTree() {
      getLevelTree().then(({ data }) => {
        const fn = (list) => {
          for (const item of list) {
            if (item.childrens) {
              if (item.childrens.length === 0) {
                delete item.childrens;
              } else {
                fn(item.childrens);
              }
            }
          }
        };
        fn(data);
        this.fileList = data;
        this.formData.materialLevelId = [];
      });
    },
  },
  created() {
    if (!this.isTpl) {
      this.loadData("create");
    }
    this.getLevelTree();
  },
  watch: {
    "formData.isOriginal"(val) {
      if (val === "1") {
        this.formData.createUser = this.userInfo.realName;
      }
    },
    "formData.isOpen"(val) {
      if (val === 2) {
        this.formData.isAllowSecondary = "1";
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
::v-deep .right-wrapper {
  padding: 0 20px 0 122px;
}
.notice {
  cursor: pointer;
  color: $--color-secondary;
}
</style>
