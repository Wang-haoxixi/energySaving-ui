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
      <el-form-item label="事项名称：" prop="matterName" class="half-line">
        <el-input v-model="formData.matterName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="需求部门：" prop="deptIdName" class="half-line">
        <el-input v-model="formData.deptIdName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="材料名称：" prop="materialName" class="half-line">
        <el-input v-model="formData.materialName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="材料类别：" prop="materialKind" class="half-line">
        <el-select v-model="formData.materialKind" class="full-width" :disabled="true">
          <el-option
            v-for="item in materialKindDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数源部门：" prop="markOrgName" class="half-line">
        <el-input v-model="formData.markOrgName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="需求部门信息项：" prop="itemName" class="half-line">
        <el-input v-model="formData.itemName" maxlength="150" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否共享：" prop="sourceState" class="half-line">
        <el-select v-model="formData.sourceState" class="full-width">
          <el-option
            v-for="item in isYes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="理由："
        prop="refuseReason"
        class="half-line"
        v-if="formData.sourceState === '0'"
      >
        <el-input v-model="formData.refuseReason"></el-input>
      </el-form-item>
      <el-form-item
        label="理由："
        prop="refuseReason1"
        class="half-line"
        v-if="formData.sourceState === '1'"
      >
        <el-input v-model="formData.refuseReason1"></el-input>
      </el-form-item>
    </el-form>
    <iep-operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd">添加材料</iep-button>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :isPagination="false"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template #cmaterialKind="{scope}">{{dictsMap.cmaterialKind[scope.row.cmaterialKind] || "暂无"}}</template>
    </iep-table>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
    <materialDialog ref="materialDialog" :dialogStatus="dialogStatus"></materialDialog>
  </div>
</template>
<script>
import { initForm, rules } from "./option";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { mockData2 } from "./const/mock";
import materialDialog from "./materialDialog";
export default {
  mixins: [mixins],
  components: { materialDialog },
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
      dialogStatus: "detail",
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
      isYes: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
        },
      ],
      mockData: mockData2,
      columnsMap: [
        {
          label: "数源部门材料名称",
          prop: "cmaterialName",
        },
        {
          label: "数源部门材料类别",
          prop: "cmaterialKind",
          type: "slot",
        },
        {
          label: "数源部门信息项",
          prop: "citemName",
        },
        {
          label: "数源部门备注",
          prop: "cdesc",
          width: "200px",
        },
      ],
      dictsMap: {
        cmaterialKind: {
          "1": "表格类",
          "2": "证明类",
          "3": "批文类",
          "4": "证照类",
          "5": "其他类",
        },
      },
    };
  },
  methods: {
    handleAdd() {
      this.dialogStatus = "edit";
      this.$refs.materialDialog.dialogShow = true;
      this.$refs.materialDialog.open({});
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
