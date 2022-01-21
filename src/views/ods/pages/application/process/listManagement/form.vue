<template>
  <div class="iep-page-form">
    <iep-page-header title :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="190px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <h2 class="title">基础信息</h2>
      <el-form-item label="事项名称:" prop="val1" class="half-line">
        <el-input v-model="formData.val1" readonly @focus="onAddMatter" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项类别:" prop="val2" class="half-line">
        <el-cascader
          :props="{emitPath: true}"
          style="width: 100%;"
          v-model="formData.val2"
          :options="status.matter_type"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="设立依据:" prop="val3" class="half-line">
        <el-input autosize v-model="formData.val3" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="权力来源:" prop="val4" class="half-line">
        <el-radio-group v-model="formData.val4">
          <el-radio
            :label="item.value"
            v-for="item in status.power"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="行使层级:" prop="val5" class="half-line">
        <el-radio-group v-model="formData.val5">
          <el-radio
            :label="item.value"
            v-for="item in status.level"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="事项状态:" prop="val6" class="half-line">
            <el-radio-group v-model="formData.val6">
              <el-radio
                :label="item.value"
                v-for="item in status.matter_status"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实施主体:" prop="val7" class="half-line">
            <el-input v-model="formData.val7" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="实施主体性质:" prop="val8" class="half-line">
            <el-radio-group v-model="formData.val8">
              <el-radio
                :label="item.value"
                v-for="item in status.nature_subject"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-col :span="16">
            <el-form-item label="法定办结时限:" prop="val9" class="half-line">
              <el-input placeholder type="number" v-model="formData.val9"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="half-line" label-width="0">
              <el-select placeholder v-model="formData.val61" style="width: 100%;">
                <el-option label="工作日" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-form-item label="法定办结时限说明:" prop="val10" class="half-line">
        <el-input placeholder v-model="formData.val10"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="20">
          <el-form-item label="承诺办结时限:" prop="val11" class="half-line">
            <el-input placeholder type="number" v-model="formData.val11"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="half-line" label-width="0">
            <el-select placeholder v-model="formData.val61" style="width: 100%;">
              <el-option label="工作日" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="承诺办结时限说明:" prop="val12" class="half-line">
        <el-input placeholder type="number" v-model="formData.val12"></el-input>
      </el-form-item>
      <el-form-item label="受理条件:" prop="val13" class="half-line">
        <el-input autosize v-model="formData.val13" maxlength="150" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="办理流程:" prop="val14">
        <div style="width: 100%;">
          <div>
            <el-button @click="handleOpenHandlingProcess">新增</el-button>
          </div>
          <ProcessTable :data="formData.val71"></ProcessTable>
        </div>
      </el-form-item>
      <el-form-item label="服务对象:" prop="val15" class="half-line">
        <el-checkbox-group v-model="formData.val15">
          <el-checkbox
            name="val15"
            v-for="item in status.service"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="办件类型:" prop="val16" class="half-line">
            <el-radio-group v-model="formData.val16">
              <el-radio
                :label="item.value"
                v-for="item in status.handling"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理形式:" prop="val17" class="half-line">
            <el-checkbox-group v-model="formData.val17">
              <el-checkbox
                :label="item.value"
                v-for="item in status.handling_form"
                :key="item.value"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="实施主体性质:" prop="val18" class="half-line">
            <el-input placeholder type="number" v-model="formData.val18"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="特别程序:" prop="val19" class="half-line">
            <el-input placeholder v-model="formData.val19"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="移动端是否对接单点登录:" prop="val20" class="half-line">
        <el-radio-group v-model="formData.val20">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="计算机是否对接单点登录:" prop="val21" class="half-line">
        <el-radio-group v-model="formData.val21">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="办理地点:" prop="val22" class="half-line">
            <el-input placeholder v-model="formData.val22"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理时间:" prop="val23" class="half-line">
            <el-input placeholder v-model="formData.val23"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="咨询方式:" prop="val24" class="half-line">
        <el-checkbox-group v-model="formData.val24">
          <el-checkbox
            :label="item.value"
            v-for="item in status.consultation_mode"
            :key="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="监督投诉方式:" prop="val25" class="half-line">
        <el-checkbox-group v-model="formData.val25">
          <el-checkbox
            :label="item.value"
            v-for="item in status.supervision_complaint_mode"
            :key="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划生效日期:" prop="val26" class="half-line">
            <el-date-picker style="width: 100%;" v-model="formData.val6" type="date" placeholder></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划取消日期:" prop="val27" class="half-line">
            <el-date-picker style="width: 100%;" v-model="formData.val6" type="date" placeholder></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <h2 class="title">扩展信息</h2>
      <el-form-item label="是否进驻政务大厅:" prop="val28" class="half-line">
        <el-radio-group v-model="formData.val28">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通办范围:" prop="val29" class="half-line">
        <el-radio-group v-model="formData.val29">
          <el-radio
            :label="item.value"
            v-for="item in status.range"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联办机构:" prop="val30" class="half-line">
        <el-input v-model="formData.val30" maxlength="150"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="中介服务:" prop="val31" class="half-line">
            <el-input v-model="formData.val31" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数量限制:" prop="val32" class="half-line">
            <el-input v-model="formData.val32" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="办理结果类型:" prop="val33" class="half-line">
        <el-checkbox-group v-model="formData.val33">
          <el-checkbox
            :label="item.value"
            v-for="item in status.handling_result_type"
            :key="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="办理结果名称:" prop="val34" class="half-line">
            <el-input v-model="formData.val34" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理结果样本:" prop="val35" class="half-line">
            <el-input v-model="formData.val35" maxlength="150"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否支持预约办理:" prop="val36" class="half-line">
            <el-radio-group v-model="formData.val36">
              <el-radio
                :label="item.value"
                v-for="item in status.is_not"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否支持自助终端办理:" prop="val37" class="half-line">
            <el-radio-group v-model="formData.val37">
              <el-radio
                :label="item.value"
                v-for="item in status.is_not"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否支持网上支付:" prop="val38" class="half-line">
            <el-radio-group v-model="formData.val38">
              <el-radio
                :label="item.value"
                v-for="item in status.is_not"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否支持物流快递:" prop="val39" class="half-line">
            <el-radio-group v-model="formData.val39">
              <el-radio
                :label="item.value"
                v-for="item in status.is_not"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="是否网办:" prop="val40" class="half-line">
        <el-radio-group v-model="formData.val40">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="必须现场办理原因说明:" prop="val41" class="half-line">
        <el-input v-model="formData.val41" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="乡镇街道名称:" prop="val42" class="half-line">
        <el-input v-model="formData.val42" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="乡镇街道代码:" prop="val43" class="half-line">
        <el-input v-model="formData.val43" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="村居社区名称:" prop="val44" class="half-line">
        <el-input v-model="formData.val44" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="村居社区代码:" prop="val45" class="half-line">
        <el-input v-model="formData.val45" maxlength="150"></el-input>
      </el-form-item>

      <h2 class="title">材料目录信息</h2>
      <el-form-item label="材料目录（可拖拽排序）:" prop="val47" class="half-line">
        <div style="width: 100%;">
          <el-button @click="handleOpenMaterialDialog">新增</el-button>
          <MaterialTable :data="formData.val72" @get-data="handleGetMaterialData" />
        </div>
      </el-form-item>

      <h2 class="title">收费项目信息</h2>
      <el-form-item label="是否收费:" prop="val48" class="half-line">
        <el-radio-group v-model="formData.val40">
          <el-radio
            :label="item.value"
            v-for="item in status.is_not"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <h2 class="title">常见问题解答</h2>
      <el-form-item label="问题解答（可拖拽排序）:" prop="val49" class="half-line">
        <div style="width: 100%;">
          <el-button @click="handleOpenQuestionDialog">新增</el-button>
          <QuestionTable :data="formData.val73" />
        </div>
      </el-form-item>

      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
        <el-button type="primary" @click="submitDraftForm" :loading="loadState">保存草稿</el-button>
        <el-button @click="close" :loading="loadState">取消</el-button>
      </iep-footer-bar>
    </el-form>
    <!-- 事项弹窗 -->
    <MatterDialog ref="matterDialog" @get-data="handleGetMatterData" />
    <!-- 办理流程弹窗 -->
    <HandlingProcessDialog ref="handlingProcessDialog" @get-data="handleGetHandlingProcessData" />
    <!-- 材料弹窗 -->
    <MaterialDialog ref="materialDialog" @get-data="handleGetMaterialData" />
    <!-- 问题弹窗 -->
    <QuestionDialog ref="questionDialog" @get-data="handleGetQuestionData" />
  </div>
</template>
<script>
import { initForm, rules, status } from "./const/options";
import ProcessTable from "./components/processTable";
import MaterialTable from "./components/materialTable";
import QuestionTable from "./components/questionTable";
import MatterDialog from "./matterDialog";
import HandlingProcessDialog from "./handlingProcessDialog";
import MaterialDialog from "./materialDialog";
import QuestionDialog from "./questionDialog";
import formMixin from "./const/form";
export default {
  mixins: [formMixin],
  components: {
    ProcessTable,
    MaterialTable,
    QuestionTable,
    MatterDialog,
    HandlingProcessDialog,
    MaterialDialog,
    QuestionDialog,
  },
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      val: [],
      status,
      formData: {
        val15: [],
        val17: [],
        val24: [],
        val25: [],
        val33: [],
        val71: [],
        val72: [],
        val73: [],
      },
      loadState: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      rules,
    };
  },
  methods: {
    // 打开
    open(row) {
      if (row) {
        this.formData = row;
      }
    },
    close() {
      this.dialogShow = false;
      this.loadPage();
    },
    // 保存草稿
    submitDraftForm() {
      this.$message.success("保存草稿成功");
      this.dialogShow = false;
      this.loadPage();
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    // 提交
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
</style>