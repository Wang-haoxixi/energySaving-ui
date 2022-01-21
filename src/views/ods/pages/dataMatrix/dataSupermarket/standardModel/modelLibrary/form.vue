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
      <el-form-item label="模型库中文名称：" prop="dbCn" class="half-line">
        <el-input v-model="formData.dbCn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="模型库英文名称：" prop="dbEn" class="half-line">
        <el-input v-model="formData.dbEn" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="模型库类型：" prop="dbType" class="half-line">
        <el-select v-model="formData.dbType" maxlength="150" class="full-width">
          <el-option
            v-for="item in dbTypeDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注释：" prop="dbNotes">
        <el-input v-model="formData.dbNotes" type="textarea"></el-input>
      </el-form-item>
      <iep-table
        v-if="formStatus != 'create'"
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
        <template #tableType="{scope}">{{dictsMap.tableType[scope.row.tableType] || "暂无"}}</template>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
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
    <iep-dialog :dialog-show="dialogShow" :title="`详情`" width="80%" @close="close">
      <detailForm ref="detailForm" :dialogStatus="`detail`" :isDialog="true"></detailForm>
    </iep-dialog>
  </div>
</template>
<script>
import { initForm, rules } from "./option";
import mixins from "@/mixins/mixins";
import { mockData2 } from "./const/mock";
import { mapGetters } from "vuex";
import detailForm from "../modelDesign/form";
export default {
  mixins: [mixins],
  components: { detailForm },
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
      dbTypeDict: [
        { label: "MySql", value: "1" },
        { label: "MSSql", value: "2" },
        { label: "Oracle", value: "3" },
        { label: "Sybase", value: "4" },
        { label: "DB2", value: "5" },
        { label: "Hbase", value: "6" },
        { label: "Access", value: "7" },
        { label: "其他", value: "8" },
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
</style>
