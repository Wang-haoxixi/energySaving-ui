<template>
  <div class="iep-page-form">
    <iep-page-header title="评审库详情" :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-tabs type="card">
      <el-tab-pane label="预审基本信息"></el-tab-pane>
      <el-tab-pane label="预审文档信息"></el-tab-pane>
      <el-tab-pane label="预审过程信息"></el-tab-pane>
      <el-tab-pane label="预审评分信息"></el-tab-pane>
      <el-tab-pane label="预审方案评分信息"></el-tab-pane>
    </el-tabs>
    <div class="blockHeader">
      <h2>项目概况</h2>
    </div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <el-form-item label="项目性质：" prop="f1" class="half-line">
        <el-select v-model="formData.f1" maxlength="150" class="full-width">
          <el-option
            v-for="item in natureDic"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否涉密：" prop="f2" class="half-line">
        <el-select v-model="formData.f2" maxlength="150" class="full-width">
          <el-option :label="'是'" :value="'1'"></el-option>
          <el-option :label="'否'" :value="'0'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目开始年度：" prop="f3" class="half-line">
        <el-date-picker v-model="formData.f3" type="date" placeholder="请输入 项目开始年度"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目结束年度：" prop="f4" class="half-line">
        <el-date-picker v-model="formData.f4" type="date" placeholder="请输入 项目结束年度"></el-date-picker>
      </el-form-item>
      <el-form-item label="启动年限：" prop="f5" class="half-line">
        <el-select v-model="formData.f5" maxlength="150" class="full-width">
          <el-option :label="'当年补报项目'" :value="'1'"></el-option>
          <el-option :label="'下一年度项目'" :value="'2'"></el-option>
        </el-select>
      </el-form-item>
      <div class="blockHeader">
        <h2>建设单位信息</h2>
      </div>
      <el-form-item label="建设期：" prop="f6">
        <el-input v-model="formData.f6" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目管理分类：" prop="f7">
        <el-input v-model="formData.f7" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="f8">
        <el-input v-model="formData.f8" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="项目运行网络环境：" prop="f9">
        <el-checkbox-group v-model="formData.f9">
          <el-checkbox label="政务外网"></el-checkbox>
          <el-checkbox label="互联网"></el-checkbox>
          <el-checkbox label="政务专网"></el-checkbox>
          <el-checkbox label="政务内网"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="行业类型：" prop="f10">
        <el-checkbox-group v-model="formData.f10">
          <el-checkbox
            v-for="(item,index) of f10Dic"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户端：" prop="f11">
        <el-checkbox-group v-model="formData.f11">
          <el-checkbox
            v-for="(item,index) of f11Dic"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否调研：" prop="f12">
        <el-switch v-model="formData.f12"></el-switch>
      </el-form-item>
      <el-form-item label="建设内容简介：" prop="f13">
        <el-input type="textarea" v-model="formData.f13" maxlength="150"></el-input>
      </el-form-item>
    </el-form>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
    <iep-dialog :dialog-show="dialogShow" :title="`详情`" width="80%" @close="close">
      <!-- <detailForm ref="detailForm" :dialogStatus="`detail`" :isDialog="true"></detailForm> -->
    </iep-dialog>
  </div>
</template>
<script>
import { initForm, rules } from "./option";
import mixins from "@/mixins/mixins";
import { mockData2 } from "./const/mock";
import { mapGetters } from "vuex";
// import detailForm from "../modelDesign/form";
export default {
  mixins: [mixins],
  components: {},
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
    ...mapGetters(["dictGroup", "tableSize"]),
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
      dictsMap: {
        tableType: {
          "1": "接口表",
          "2": "外部表",
          "3": "纬度表",
          "4": "临时表",
          "5": "事实表",
          "6": "普通表",
        },
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      natureDic: [
        { label: "新建", value: "1" },
        { label: "续建", value: "2" },
        { label: "运维", value: "3" },
      ],
      f10Dic: [
        { label: "党建", value: "1" },
        { label: "教育", value: "2" },
        { label: "医疗", value: "3" },
        { label: "社保", value: "4" },
        { label: "社区", value: "5" },
        { label: "扶贫", value: "6" },
        { label: "体育", value: "7" },
        { label: "文化", value: "8" },
        { label: "旅游", value: "9" },
        { label: "农业", value: "10" },
      ],
      f11Dic: [
        { label: "PC端", value: "1" },
        { label: "移动端", value: "2" },
        { label: "自动端", value: "3" },
      ],
      columnsMap: [
        {
          label: "模型表中文名称",
          prop: "tableCn",
        },
        {
          label: "模型表英文名称",
          prop: "tableEn",
        },
        {
          label: "模型表类型",
          prop: "tableType",
          type: "slot",
        },
      ],
      mockData: mockData2,
    };
  },
  created() {
    this.loadPages();
  },
  methods: {
    close() {
      this.dialogShow = false;
    },
    handleDetail(row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs.detailForm.open(row);
      });
    },
    handleDeleteById(row, index) {
      this.pagedTable.splice(index, index + 1);
    },
    loadPages(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
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
          // this.dialogShow = false;
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
.blockHeader {
  margin: 10px;
  padding-bottom: 11px;
  border-bottom: 1px solid #cecece;
}
</style>
