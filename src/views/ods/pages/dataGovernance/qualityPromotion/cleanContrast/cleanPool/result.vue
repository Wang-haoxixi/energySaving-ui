<template>
  <div class="iep-page-form">
    <iep-page-header :title="`清洗结果统计`" :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="true"
    >
      <el-form-item label="部门：" prop="dataDeptName" class="half-line">
        <el-input v-model="formData.dataDeptName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="表名：" prop="dataTableName" class="half-line">
        <el-input v-model="formData.dataTableName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="字段名称：" prop="dataFieldName" class="half-line">
        <el-input v-model="formData.dataFieldName" maxlength="150"></el-input>
      </el-form-item>
      <div class="gray-line">
        <span style="padding-left: 10px;">脏数据数量：</span>
        <span style="color: red;">2条</span>
      </div>
    </el-form>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      border
      :pagination="pagination"
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
import { mockData3 } from "./const/mock";
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
      mockData: mockData3,
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "脏数据",
          prop: "sourceData",
        },
        {
          label: "错误原因",
          prop: "cleanResult",
        },
      ],
    };
  },
  created() {
    this.loadPages();
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
.gray-line {
  height: 40px;
  background-color: rgb(242, 244, 245);
  border-radius: 5px;
  margin-bottom: 10px;
  line-height: 40px;
}
</style>
