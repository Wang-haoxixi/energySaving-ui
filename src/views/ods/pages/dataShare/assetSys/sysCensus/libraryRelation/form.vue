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
      <el-form-item label="信息系统名称:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.commonDataMetaName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统访问地址:" class="half-line">
        <el-input v-model="formData.address" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="所属单位:" class="half-line">
        <el-input v-model="formData.Affiliated" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目立项审批部门:" class="half-line">
        <el-input v-model="formData.department" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目立项审批日期:" class="half-line">
        <el-input v-model="formData.ApprovalDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="预算项目名称:" class="half-line">
        <el-input v-model="formData.BudgetItemName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="预算涉及的年限起:" class="half-line">
        <el-input v-model="formData.budget" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="预算涉及的年度止:" class="half-line">
        <el-input v-model="formData.endBudget" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否为僵尸系统:" class="half-line">
        <el-radio-group v-model="formData.corpse">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统开始使用日期:" class="half-line">
        <el-input v-model="formData.startDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统停止使用日期:"  class="half-line">
        <el-input v-model="formData.serviceDate" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统状态:" class="half-line">
        <el-input v-model="formData.status" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="建设资金来源:" class="half-line">
        <el-input v-model="formData.Source" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统部署情况:" class="half-line">
        <el-input v-model="formData.SourceFunds" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="网络环境:" class="half-line">
        <el-input v-model="formData.environment" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="使用范围-区域:" class="half-line">
        <el-input v-model="formData.ScopeOfUse" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="使用范围-用户:" class="half-line">
        <el-input v-model="formData.ScopeOfUseUser" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统使用频率:" class="half-line">
        <el-input v-model="formData.frequency" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="使用频率测算依据:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.frequencyUse" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据产生方式:" class="half-line">
        <el-input v-model="formData.DataGeneration" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据更新频率:" class="half-line">
        <el-input v-model="formData.dataUpload" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据库格式:" class="half-line">
        <el-input v-model="formData.DatabaseFormat" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据规模（G）:" class="half-line">
        <el-input v-model="formData.DataSize" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据总量（条）:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.DataNum" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据增长情况（M）:" prop="commonDataMetaName" class="half-line">
        <el-input v-model="formData.Growth" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="存量数据年限:" class="half-line">
        <el-input v-model="formData.stockData" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="数据有效期:" class="half-line">
        <el-input v-model="formData.DataValidity" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否有数据字典:" prop="commonDataMetaName" class="half-line">
        <el-radio-group v-model="formData.dict">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统数据库位置:" class="half-line">
        <el-input v-model="formData.position" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统数据共享范围:" class="half-line">
        <el-input v-model="formData.Sharing" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="等级保护:" class="half-line">
        <el-input v-model="formData.GradeProtection" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="归口业务处室:" class="half-line">
        <el-input v-model="formData.Centralized" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="处室联系人:" class="half-line">
        <el-input v-model="formData.ContactPerson" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="处室联系方式:" class="half-line">
        <el-input v-model="formData.ContactPhone" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统负责人:" class="half-line">
        <el-input v-model="formData.Person" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系方式:" class="half-line">
        <el-input v-model="formData.PersonPhone" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统维护人员:"  class="half-line">
        <el-input v-model="formData.maintenance" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="维护人员联系方式:"  class="half-line">
        <el-input v-model="formData.maintenancePhone" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统开发时间:" class="half-line">
        <el-input v-model="formData.developmentTime" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统开发厂商:"  class="half-line">
        <el-input v-model="formData.Manufacturer" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="厂商联系人:"  class="half-line">
        <el-input v-model="formData.ManufacturerPerson" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="厂商联系方式:"  class="half-line">
        <el-input v-model="formData.ManufacturerPhone" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="系统功能、服务简介:" class="half-line">
        <el-input v-model="formData.ServiceIntroduction" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="备注:"  class="half-line">
        <el-input v-model="formData.content" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="在用其它部门数据:" prop="commonDataMetaName" class="half-line">
          <el-radio-group v-model="formData.other">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为业务系统:" prop="commonDataMetaName" class="half-line">
          <el-radio-group v-model="formData.isYw">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
      </el-form-item>
    </el-form>
    <h2>关联数据库</h2>
    <div style="width:80%;margin:0 auto;">
      <iep-table
          border
          :isPagination="false"
          :isLoadTable="false"
          :columnsMap="columnsMap"
          :pagedTable="formData.pagedTable"
        >
      </iep-table>
    </div>
    <h2>关联数据目录</h2>
    <div style="width:80%;margin:0 auto;">
      <iep-table
          border
          :isLoadTable="false"
          :isPagination="false"
          :columnsMap="columnsMap1"
          :pagedTable="formData.pagedTable1"
        >
      </iep-table>
    </div>
    <h2>历史版本</h2>
    <div style="width:80%;margin:0 auto;">
      <iep-table
          border
          :isPagination="false"
          :isLoadTable="false"
          :columnsMap="columnsMap2"
          :pagedTable="formData.pagedTable2"
        >
      </iep-table>
    </div>
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
      columnsMap: [
        {
          label: "数据库中文名",
          prop: "commonDataMetaName",
        },
        {
          label: "数据库英文名",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "数据库类型",
          prop: "commonDataMetaNameEn1",
        },
      ],
      columnsMap1: [
        {
          label: "信息资源名称",
          prop: "commonDataMetaName",
        },
        {
          label: "信息资源格式",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "共享类型",
          prop: "commonDataMetaNameEn1",
        },
        {
          label: "开放属性",
          prop: "commonDataMetaNameEn2",
        },
      ],
      columnsMap2: [
        {
          label: "版本号",
          prop: "commonDataMetaName",
        },
        {
          label: "操作时间",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "操作人",
          prop: "commonDataMetaNameEn1",
        },
      ],
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
</style>
