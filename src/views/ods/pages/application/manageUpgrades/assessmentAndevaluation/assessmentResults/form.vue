<template>
  <div class="iep-page-form">
    <iep-page-header title="滨洲市营商环境考核2评估项目" :backOption="backOption" v-if="!isDialog"></iep-page-header>
    <el-form
      v-if="typeSelect==='analysis'"
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <div style="display:flex;justify-content: space-between;">
        <div>
          选择部门：
          <el-select v-model="formData.val1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary">导出</el-button>
      </div>
      <span class="state">评测得分情况</span>
      <div>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" label="一级" width="180"></el-table-column>
          <el-table-column prop="name" label="权重"></el-table-column>
          <el-table-column prop="amount1" label="二级"></el-table-column>
          <el-table-column prop="amount2" label="权重"></el-table-column>
          <el-table-column prop="amount3" label="三级"></el-table-column>
          <el-table-column prop="amount4" label="权重"></el-table-column>
          <el-table-column prop="amount5" label="得分"></el-table-column>
        </el-table>
      </div>
      <span class="state">问题属性分布</span>
      <div>
        <img style="width:100%" src="./img/1.png" alt />
      </div>
      <span class="state">详细测评说明</span>
      <div>
        <img style="width:100%" src="./img/2.png" alt />
      </div>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button>取消</el-button>
        <iep-button type="primary" @click="submitForm">确定</iep-button>
      </iep-footer-bar>
    </el-form>
    <el-form
      v-if="typeSelect==='result'"
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="150px"
      class="form-detail"
      :disabled="formStatus==='detail'"
    >
      <span class="state">结果对比</span>
      <div>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" label="一级" width="180"></el-table-column>
          <el-table-column prop="name" label="二级"></el-table-column>
          <el-table-column prop="amount1" label="三级"></el-table-column>
          <el-table-column prop="amount2" label="平均分/满分"></el-table-column>
          <el-table-column prop="amount3" label="省办公厅"></el-table-column>
          <el-table-column prop="amount4" label="省公安部"></el-table-column>
          <el-table-column prop="amount5" label="省消防部"></el-table-column>
          <el-table-column prop="amount6" label="省文化部"></el-table-column>
        </el-table>
      </div>
      <span class="state">问题属性分布</span>
      <div>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" label width="180"></el-table-column>
          <el-table-column prop="name" label="省办公厅"></el-table-column>
          <el-table-column prop="amount1" label="省公安部"></el-table-column>
          <el-table-column prop="amount2" label="省消防部"></el-table-column>
          <el-table-column prop="amount3" label="省文化部"></el-table-column>
        </el-table>
      </div>
      <iep-footer-bar v-if="!isDialog && formStatus != 'detail'">
        <el-button>取消</el-button>
        <iep-button type="primary" @click="submitForm">确定</iep-button>
      </iep-footer-bar>
    </el-form>
  </div>
</template>
<script>
import { initForm, status, rules } from "./const/options";
import mixin from "./const/mixin";
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "create",
    },
  },
  mixins: [mixin],
  data() {
    return {
      status,
      rules,
      typeSelect: "analysis",
      options: [],
      formData: {},
      loadState: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      tableData: [
        {
          id: "政务公开1",
          name: "15",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
          amount4: 122,
          amount5: 1011,
        },
        {
          id: "政务公开2",
          name: "16",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
          amount4: 122,
          amount5: 1011,
        },
        {
          id: "政务公开1",
          name: "12",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
          amount4: 122,
          amount5: 1011,
        },
        {
          id: "政务公开1",
          name: "14",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 122,
          amount5: 1011,
        },
        {
          id: "政务公开3",
          name: "16",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 122,
          amount5: 1011,
        },
      ],
    };
  },
  methods: {
    // 打开
    open(row) {
      this.formData = row;
    },
    // 重置
    resetForm() {
      this.$refs["form"].resetFields();
      this.formData = initForm();
      this.dialogShow = false;
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
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
.state {
  display: inline-block;
  margin-top: 36px;
  font-family: Microsoft YaHei;
  color: #303031;
}
</style>
