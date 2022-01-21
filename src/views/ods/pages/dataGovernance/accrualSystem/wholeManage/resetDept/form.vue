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
      <el-form-item label="需求部门" prop="deptIdName" class="half-line">
        <el-input v-model="formData.deptIdName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="事项名称" prop="matterName" class="half-line">
        <el-input v-model="formData.matterName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="材料名称" prop="materialName" class="half-line">
        <el-input v-model="formData.materialName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="材料类别" prop="materialKind" class="half-line">
        <el-select v-model="formData.materialKind" class="full-width" :disabled="true">
          <el-option
            v-for="item in materialKindDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求部门信息项" prop="itemName" class="half-line">
        <el-input v-model="formData.itemName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="推荐数源部门" prop="recomedOrgName" class="half-line">
        <el-input v-model="formData.recomedOrgName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="标记数源部门" prop="markOrg" class="half-line">
        <el-input v-model="formData.markOrg" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数源部门确认情况" prop="auditState" class="half-line">
        <el-select v-model="formData.auditState" class="full-width">
          <el-option
            v-for="item in auditStateDict"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求部门备注" prop="desc" class="half-line">
        <el-input v-model="formData.desc" type="textarea" maxlength="250"></el-input>
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
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
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
    ...mapGetters(["dictGroup"]),
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
      materialKindDict: [
        { label: "表格类", value: "1" },
        { label: "证明类", value: "2" },
        { label: "批文类", value: "3" },
        { label: "证照类", value: "4" },
        { label: "其他类", value: "5" },
      ],
      auditStateDict: [
        { value: "2", label: "待确认" },
        { value: "4", label: "已拒绝" },
      ],
    };
  },
  methods: {
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
