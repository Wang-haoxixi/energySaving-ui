<template>
  <iep-basic-container class="iep-page-form">
    <iep-page-header title="合伙人招募" :backOption="backOption"></iep-page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="135px">
      <el-form-item label="合伙人项目名称：" prop="name">
        <el-input v-model="formData.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="所属行业：" prop="industry">
        <IndustrySelect v-model="formData.industry"></IndustrySelect>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作城市：" prop="workplace">
            <CascaderCity v-model="formData.workplace" placeholder="不限"></CascaderCity>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作地点：">
            <MapSelect v-model="workSpace" :workplace="formData.workplace"></MapSelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="提供支持：" prop="welfareSupportList">
        <WelfareSupport v-model="formData.welfareSupportList" type="1"></WelfareSupport>
      </el-form-item>
      <el-form-item label="项目关键词：" prop="tagKeyWords">
        <iep-tag-input v-model="formData.tagKeyWords"></iep-tag-input>
      </el-form-item>
      <el-form-item label="具体描述：" prop="describe">
        <el-input type="textarea" :row="3" v-model="formData.describe" maxlength="500" placeholder></el-input>
      </el-form-item>
      <el-form-item label="关联考试：">
        <RelationExamination v-model="formData.examList"></RelationExamination>
      </el-form-item>
      <el-form-item label="红度等级要求：" prop="redness">
        <el-input type="number" v-model="formData.redness" :min="1" :max="5"></el-input>
        <el-tooltip
          class="tooltip"
          effect="dark"
          content="红度等级反映用户基于节能宝平台的活跃程度与数字化技能水平，请输入您期望的最低红度等级"
          placement="top-start"
        >
          <i class="el-icon-woneng-zhushishixin"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="奖励宝贝：" prop="reward">
        <el-input v-model="formData.reward" type="number" placeholder="奖励的贝额最终需由您手动转账给推荐人">
          <template slot="append">贝/人</template>
        </el-input>
        <el-tooltip
          class="tooltip"
          effect="dark"
          content="设置奖励宝贝后，用户将可见该职位为有奖推荐职位；奖励的宝贝最终需有您手动转账给推荐人"
          placement="top-start"
        >
          <i class="el-icon-woneng-zhushishixin"></i>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <iep-footer-bar>
      <el-button type="primary" @click="handleSubmit" :loading="loadState">保存并发布</el-button>
      <iep-button @click="handleClose">取消</iep-button>
    </iep-footer-bar>
  </iep-basic-container>
</template>
<script>
import { initPartnerForm, partnerRules, dictsMap } from "../options";
import { mapGetters } from "vuex";
import { createPartner, updatePartner, getWelfare } from "@/api/dms/recruit";
import { getRecruitDetail } from "@/api/dms/recruit_query";
import IndustrySelect from "./components/industrySelect";
import CascaderCity from "./components/CascaderCity";
import { getOrgShowById } from "@/api/admin/org";
import WelfareSupport from "./components/welfareSupport";
import MapSelect from "./components/mapSelect";
import RelationExamination from "./components/relation/index";

export default {
  props: {},
  components: {
    IndustrySelect,
    CascaderCity,
    WelfareSupport,
    MapSelect,
    RelationExamination,
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      loadState: false,
      formData: initPartnerForm(),
      rules: partnerRules,
      dictsMap,
      welfareList: [],
      method: "create",
      methodList: {
        create: {
          requestFn: createPartner,
        },
        update: {
          requestFn: updatePartner,
        },
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.handleClose();
        },
      },
      workSpace: {
        detailedAddress: "",
      },
    };
  },
  methods: {
    loadData(row = {}) {
      if (row.recruitId) {
        this.method = "update";
        getRecruitDetail({
          recruitId: row.recruitId,
        }).then(({ data }) => {
          data.tagKeyWords = data.tags;
          data.redness = data.rednessDemand;
          // 地址
          this.workSpace = {
            detailedAddress: data.detailedAddress,
            longitude: data.longitude,
            latitude: data.latitude,
            addressImg: data.addressImg,
          };
          // 考试关联
          data.examIds = data.exam.map((m) => m.examId);
          data.examList = data.exam.map((m) => {
            m.id = m.examId;
            return m;
          });
          this.formData = { ...data };
        });
      } else {
        this.method = "create";
        this.getOrgInfo();
      }
    },
    handleSelect() {
      setTimeout(() => {
        console.log("name: ", this.formData.name);
      }, 1000);
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initPartnerForm();
    },
    handleClose() {
      this.resetForm();
      this.$emit("operate", "TableTpl");
    },
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.type = 1;
          row.orgId = this.userInfo.orgId;
          if (row.recruitId) {
            row.id = row.recruitId;
          }
          row.examIds = row.examList.map((m) => m.id);
          this.methodList[this.method].requestFn(row).then(({ data }) => {
            if (data) {
              this.$emit("load-page", true);
            }
            this.loadState = false;
          });
        } else {
          this.loadState = false;
          return false;
        }
      });
    },
    // 获取福利接口
    getWelfare() {
      getWelfare({
        orgId: this.userInfo.orgId,
        type: 1,
      }).then(({ data }) => {
        this.welfareList = [...data];
      });
    },
    // 获取组织信息
    getOrgInfo() {
      getOrgShowById(this.userInfo.orgId).then(({ data }) => {
        const { industry, region } = data;
        if (industry.length > 0) {
          const index = industry.indexOf("-");
          if (index > 0) {
            this.formData.industry = industry.slice(0, index);
          }
        }
        if (region.length > 0) this.formData.workplace = region;
      });
    },
  },
  created() {
    this.getWelfare();
  },
  watch: {
    workSpace: {
      handler(row) {
        this.formData = Object.assign({}, this.formData, row);
        if (row.place) this.formData.workplace = row.place;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.iep-page-form {
  .autocomplete {
    width: 100%;
  }
  .tooltip {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  ::v-deep .industry-select {
    width: 50%;
    .el-select,
    .el-input {
      width: 100%;
    }
  }
  ::v-deep .el-cascader {
    width: 100%;
  }
}
</style>
