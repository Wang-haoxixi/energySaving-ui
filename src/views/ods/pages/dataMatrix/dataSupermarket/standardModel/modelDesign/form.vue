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
      <el-form-item label="模型表中文名称：" prop="tableCn" class="half-line">
        <el-input v-model="formData.tableCn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="模型表英文名称：" prop="tableEn" class="half-line">
        <el-input v-model="formData.tableEn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="模型表类型：" prop="tableType" class="half-line">
        <el-select v-model="formData.tableType" maxlength="150" class="full-width">
          <el-option
            v-for="item in tableTypeDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属模型库：" prop="modelBuildIds" class="half-line">
        <el-input v-model="formData.modelBuildIds" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="注释：" prop="tableNotes">
        <el-input v-model="formData.tableNotes" type="textarea"></el-input>
      </el-form-item>
      <iep-button type="primary" plain @click="handleAdd" v-if="formStatus != 'detail'">字段自定义新增</iep-button>
      <iep-button
        type="primary"
        plain
        @click="handleChoose"
        style="margin-left: 10px;"
        v-if="formStatus != 'detail'"
      >选择数据源</iep-button>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :isPagination="false"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :dictsMap="dictsMap"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        style="margin-top: 10px;"
      >
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDeleteById(scope.row, scope.$index)">删除</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </el-form>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
    <dataSourceDialog ref="dataSourceDialog"></dataSourceDialog>
    <fieldCustomDialog ref="fieldCustomDialog" :dialogStatus="dialogStatus"></fieldCustomDialog>
  </div>
</template>
<script>
import { initForm, rules, dictsMap } from "./option";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { mockData2 } from "./const/mock";
import dataSourceDialog from "./dataSourceDialog";
import fieldCustomDialog from "./fieldCustomDialog";
export default {
  mixins: [mixins],
  components: { dataSourceDialog, fieldCustomDialog },
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
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      columnsMap: [
        {
          label: "字段中文名称",
          prop: "dataCn",
        },
        {
          label: "字段英文名称",
          prop: "dataEn",
        },
      ],
      tableTypeDict: [
        { label: "接口表", value: "1" },
        { label: "外部表", value: "2" },
        { label: "纬度表", value: "3" },
        { label: "临时表", value: "4" },
        { label: "事实表", value: "5" },
        { label: "普通表", value: "6" },
      ],
      mockData: mockData2,
    };
  },
  created() {
    this.loadPages();
  },
  methods: {
    loadPages(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } =
        this.formStatus === "create"
          ? {
              records: [],
              total: 0,
              size: 10,
              current: 1,
              orders: [],
              searchCount: true,
              pages: 1,
            }
          : this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    handleChoose() {
      this.$refs.dataSourceDialog.dialogShow = true;
    },
    handleAdd() {
      this.dialogStatus = "create";
      this.$refs.fieldCustomDialog.dialogShow = true;
      this.$refs.fieldCustomDialog.open({});
    },
    handleDetail(row) {
      this.dialogStatus = "detail";
      this.$refs.fieldCustomDialog.dialogShow = true;
      this.$refs.fieldCustomDialog.open(row);
    },
    handleEdit(row) {
      this.dialogStatus = "edit";
      this.$refs.fieldCustomDialog.dialogShow = true;
      this.$refs.fieldCustomDialog.open(row);
    },
    handleDeleteById(row, index) {
      this.pagedTable.splice(index, index + 1);
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
