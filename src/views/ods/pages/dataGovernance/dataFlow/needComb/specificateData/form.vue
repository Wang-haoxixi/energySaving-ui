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
      <el-form-item label="事项名称：" prop="taskName" class="half-line">
        <el-input v-model="formData.taskName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="需求部门：" prop="deptName" class="half-line">
        <el-input v-model="formData.deptName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="基本编码：" prop="catalogCode" class="half-line">
        <el-input v-model="formData.catalogCode" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="事项类型：" prop="typeKey" class="half-line">
        <el-cascader v-model="formData.typeKey" :options="typeKeyDict" class="full-width"></el-cascader>
      </el-form-item>
      <el-form-item label="行使层级：" prop="useLevelList">
        <el-checkbox-group v-model="formData.useLevelList">
          <el-checkbox
            v-for="item in useLevelDict"
            :key="item.value"
            :label="item.value"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    ></iep-table>
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
import { mockData2 } from "./const/mock";
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
    ...mapGetters(["dictGroup", "tableSize"]),
  },
  created() {
    this.loadPages();
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
      typeKeyDict: [
        {
          value: "1",
          label: "行政权力",
          children: [
            {
              value: "3",
              label: "行政许可",
            },
            {
              value: "4",
              label: "行政处罚",
            },
            {
              value: "5",
              label: "行政强制",
            },
            {
              value: "6",
              label: "行政征收",
            },
            {
              value: "7",
              label: "行政给付",
            },
            {
              value: "8",
              label: "行政检查",
            },
            {
              value: "9",
              label: "行政确认",
            },
            {
              value: "10",
              label: "行政奖励",
            },
            {
              value: "11",
              label: "行政裁决",
            },
            {
              value: "12",
              label: "其他行政权力",
            },
          ],
        },
        {
          value: "2",
          label: "公共服务",
        },
      ],
      useLevelDict: [
        {
          value: "1",
          label: "国家级",
        },
        {
          value: "2",
          label: "省级",
        },
        {
          value: "3",
          label: "地市级",
        },
        {
          value: "4",
          label: "区县级",
        },
        {
          value: "5",
          label: "乡镇级",
        },
        {
          value: "6",
          label: "村（社区）级",
        },
      ],
      mockData: mockData2,
      columnsMap: [
        {
          label: "材料名称",
          prop: "materialName",
        },
        {
          label: "信息项名称",
          prop: "itemName",
        },
      ],
    };
  },
  methods: {
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
