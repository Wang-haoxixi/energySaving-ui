<template>
  <iep-basic-container class="iep-page-form">
    <iep-page-header title="职位发布" :backOption="backOption"></iep-page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="职位名称：" prop="name">
            <JobSelect v-model="formData.name" @getIntroduction="getIntroduction"></JobSelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属行业：" prop="industry">
            <IndustrySelect v-model="formData.industry"></IndustrySelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作城市：" prop="workplace">
            <CascaderCity v-model="formData.workplace"></CascaderCity>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作地点：" prop="detailedAddress">
            <MapSelect v-model="workSpace" :workplace="formData.workplace"></MapSelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作类型：">
            <el-select v-model="formData.jobType" placeholder="请选择">
              <el-option label="不限" value></el-option>
              <el-option
                v-for="item in dictGroup.get('dms_recruit_job_type')"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历要求：">
            <el-select v-model="formData.education" placeholder="请选择">
              <el-option label="不限" value></el-option>
              <el-option
                v-for="item in dictGroup.get('common_highest_educational')"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业要求：">
            <IepCascaderProfession v-model="formData.major"></IepCascaderProfession>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作经验：">
            <el-select v-model="formData.experience" placeholder="请选择">
              <el-option label="不限" value></el-option>
              <el-option
                v-for="item in dictGroup.get('dms_recruit_experience')"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="语言要求：">
            <el-select v-model="formData.language" placeholder="请选择">
              <el-option label="不限" value></el-option>
              <el-option
                v-for="item in dictGroup.get('languageability')"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="薪资待遇：" prop="salaryStart">
            <div class="salary">
              <div class="salary-item">
                <el-input v-model="formData.salaryStart" type="number" :disabled="toFace" :max="99">
                  <template slot="append">K</template>
                </el-input>
              </div>
              <span>-</span>
              <div class="salary-item">
                <el-input v-model="formData.salaryEnd" type="number" :disabled="toFace" :max="99">
                  <template slot="append">K</template>
                </el-input>
              </div>
              <el-checkbox v-model="toFace" style="margin-left:15px">面议</el-checkbox>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司福利：" prop="welfareSupportList">
            <WelfareSupport v-model="formData.welfareSupportList"></WelfareSupport>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位描述：" prop="describe">
            <el-input type="textarea" :rows="3" v-model="formData.describe" maxlength="1000"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位关键词：" prop="tagKeyWords">
            <iep-tag-input v-model="formData.tagKeyWords"></iep-tag-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="关联考试：">
            <RelationExamination v-model="formData.examList"></RelationExamination>
          </el-form-item>
        </el-col>
        <el-col :span="24">
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
        </el-col>
        <el-col :span="24">
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
        </el-col>
      </el-row>
    </el-form>

    <iep-footer-bar>
      <el-button type="primary" @click="handleSubmit" :loading="loadState">保存并发布</el-button>
      <iep-button @click="handleClose">取消</iep-button>
    </iep-footer-bar>
  </iep-basic-container>
</template>
<script>
import { initJobForm, jobRules, dictsMap } from "../options";
import { mapGetters } from "vuex";
import { createPosition, updatePosition } from "@/api/dms/recruit";
import { getRecruitDetail } from "@/api/dms/recruit_query";
import IndustrySelect from "./components/industrySelect";
import CascaderCity from "./components/CascaderCity";
import { getOrgShowById } from "@/api/admin/org";
import WelfareSupport from "./components/welfareSupport";
import MapSelect from "./components/mapSelect";
import JobSelect from "./components/JobSelect";
import RelationExamination from "./components/relation/index";

export default {
  props: {},
  components: {
    IndustrySelect,
    CascaderCity,
    WelfareSupport,
    MapSelect,
    JobSelect,
    RelationExamination,
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    // 需求多次修改，以下验证可能不一定精准
    const salaryStartRule = (rule, value, callback) => {
      // 首先判断，是否是面议
      if (this.toFace) {
        callback();
      } else {
        const start = Number(this.formData.salaryStart);
        const end = Number(this.formData.salaryEnd);
        if (start <= 0 || end <= 0) {
          // 输入了负数
          callback(new Error("请输入正数"));
        } else if (start === 0) {
          if (end === 0) {
            // 当两个数据都为0，即面议
            callback();
          } else {
            // 当start为0，end不为0时
            callback(new Error("薪资起止范围不能为0"));
          }
        } else if (end === 0) {
          // end为0
          callback(new Error("请合理控制薪资范围"));
        } else if (start > end) {
          // start > end
          callback(new Error("请合理控制薪资范围"));
        } else if (String(start).indexOf(".") >= 0) {
          // 起始小数点
          callback(new Error("请输入正整数"));
        } else if (String(end).indexOf(".") >= 0) {
          // 中止小数点
          callback(new Error("请输入正整数"));
        } else {
          callback();
        }
      }
    };
    jobRules.salaryStart = [{ validator: salaryStartRule, trigger: "blur" }];
    const rules = jobRules;
    return {
      loadState: false,
      formData: initJobForm(),
      rules,
      dictsMap,
      method: "create",
      methodList: {
        create: {
          requestFn: createPosition,
        },
        update: {
          requestFn: updatePosition,
        },
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.handleClose();
        },
      },
      toFace: true, // 面议
      welfareList: [],
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
          // 处理职位招聘字段
          if (data.type === "0") {
            if (data.salaryEnd === 0 && data.salaryStart === 0) {
              this.toFace = true;
            } else {
              this.toFace = false;
            }
          }
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
    handleSelect() {},
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initJobForm();
    },
    handleClose() {
      if (this.$route.path === "/recruit/job_create") {
        this.$router.go(-1);
      } else {
        this.resetForm();
        this.$emit("operate", "TableTpl");
      }
    },
    handleSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loadState = true;
          const row = { ...this.formData };
          row.type = 0;
          row.orgId = this.userInfo.orgId;
          if (row.recruitId) {
            row.id = row.recruitId;
          }
          row.salaryStart = row.salaryStart || 0;
          row.salaryEnd = row.salaryEnd || 0;
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
    // 获取职位详情
    getIntroduction(row) {
      this.$set(this.formData, "describe", row);
    },
  },
  created() {},
  watch: {
    toFace(val) {
      if (val) {
        this.$set(this.formData, "salaryStart", "");
        this.$set(this.formData, "salaryEnd", "");
      }
    },
    "formData.salaryStart"(val) {
      const start = Number(val);
      if (start > 99) {
        this.$set(this.formData, "salaryStart", 99);
      }
    },
    "formData.salaryEnd"(val) {
      const end = Number(val);
      if (end > 99) {
        this.$set(this.formData, "salaryEnd", 99);
      }
    },
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
  .salary {
    display: flex;
    .salary-item {
      width: 150px;
    }
    span {
      padding: 0 20px;
      font-size: 22px;
    }
  }
  .tooltip {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
}
::v-deep .el-input-group--append {
  border: 1px solid $--border-color;
  border-radius: 10px;
  &:hover,
  &:focus {
    border-color: $--color-primary;
  }
  .el-input__inner {
    border: 0;
  }
}
::v-deep .el-input-group--append.is-disabled {
  border: 0;
}
.iep-page-form ::v-deep .el-cascader,
.iep-page-form ::v-deep .el-select,
.iep-page-form ::v-deep .industry-select {
  width: 100%;
}
</style>
