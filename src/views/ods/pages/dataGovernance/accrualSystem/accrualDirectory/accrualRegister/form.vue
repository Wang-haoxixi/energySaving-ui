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
      <h3>基础信息</h3>
      <hr />
      <el-form-item label="权责名称" prop="dutyName" class="half-line">
        <el-input v-model="formData.dutyName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="权责编码" prop="dutyCode" class="half-line">
        <el-input v-model="formData.dutyCode" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="实施主体" prop="orgName" class="half-line">
        <el-input v-model="formData.orgName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="行使层级" prop="authLevel" class="half-line">
        <el-select v-model="formData.authLevel" class="full-width">
          <el-option
            v-for="item in authLevelDict"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="dutyTypeArras" class="half-line">
        <el-cascader v-model="formData.dutyTypeArras" :options="typeKeyDict" class="full-width"></el-cascader>
      </el-form-item>
      <el-form-item label="中央指导部门" prop="orgTypeName" class="half-line">
        <el-input v-model="formData.orgTypeName" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="是否有省级实施权限" prop="isProvince" class="half-line">
        <el-select v-model="formData.isProvince" class="full-width">
          <el-option
            v-for="item in yesNoDict"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有市级实施权限" prop="isCity" class="half-line">
        <el-select v-model="formData.isCity" class="full-width">
          <el-option
            v-for="item in yesNoDict"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有县级实施权限" prop="isCounty" class="half-line">
        <el-select v-model="formData.isCounty" class="full-width">
          <el-option
            v-for="item in yesNoDict"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省级实施内容" prop="powerProvince" class="half-line">
        <el-input v-model="formData.powerProvince" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="市级实施内容" prop="powerCity" class="half-line">
        <el-input v-model="formData.powerCity" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="县级实施内容" prop="powerCounty" class="half-line">
        <el-input v-model="formData.powerCounty" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="权责具体内容" prop="content" class="half-line">
        <el-input v-model="formData.content" maxlength="150"></el-input>
      </el-form-item>
      <h3>
        法定依据
        <span style="color: red;font-size: 12px;">（不能为空）</span>
      </h3>
      <hr />
      <iep-operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="chooseLegal">选择法律条目</iep-button>
        </template>
      </iep-operation-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :isPagination="false"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
              <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <h3>关联事项</h3>
      <hr />
      <iep-operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="chooseLMatter">选择事项</iep-button>
        </template>
      </iep-operation-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :columnsMap="columnsMap1"
        :pagedTable="pagedTable"
        :isPagination="false"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
              <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </el-form>
    <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm">重置</iep-button>
    </iep-footer-bar>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import { initForm, rules, dictsMap } from "./option";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
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
      mockData,
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
      authLevelDict: [
        { value: "1", label: "国家级" },
        { value: "2", label: "省级" },
        { value: "3", label: "市级" },
        { value: "4", label: "县级" },
      ],
      yesNoDict: [
        { value: "1", label: "是" },
        { value: "2", label: "否" },
      ],
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
      columnsMap: [
        {
          label: "法律名称",
          prop: "name",
        },
        {
          label: "条目内容",
          prop: "content",
        },
        {
          label: "文件类型",
          prop: "basisType",
        },
        {
          label: "文件种类",
          prop: "lawType",
        },
      ],
      columnsMap1: [
        {
          label: "事项名称",
          prop: "taskName",
        },
        {
          label: "事项编码",
          prop: "catalogCode",
        },
        {
          label: "行政区域",
          prop: "division",
        },
        {
          label: "实施主体",
          prop: "deptName",
        },
      ],
    };
  },
  created() {
    this.loadPage1();
  },
  methods: {
    chooseLMatter() {},
    chooseLegal() {},
    loadPage1(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = {
        records: [],
        total: 3,
        size: 10,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1,
      };
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
