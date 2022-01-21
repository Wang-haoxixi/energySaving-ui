<template>
  <iep-dialog :dialog-show="dialogShow" :title="`字段新增`" width="80%" @close="close">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="140px" :rules="rules">
      <iep-form-item label-name="数据库连接方式" prop="connectionType" class="half-line">
        <el-select v-model="form.connectionType">
          <el-option
            v-for="item in connectionTypeDict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <template v-if="form.connectionType === '1'">
        <iep-form-item label-name="地址A" prop="connectionUrl" class="half-line">
          <el-input v-model.trim="form.connectionUrl"></el-input>
        </iep-form-item>
        <iep-form-item label-name="地址B" prop="dataTableNameEn" class="half-line">
          <el-input v-model="form.dataTableNameEn"></el-input>
        </iep-form-item>
        <iep-form-item label-name="账号" prop="connectionName" class="half-line">
          <el-input v-model="form.connectionName"></el-input>
        </iep-form-item>
        <iep-form-item label-name="密码" prop="connectionPassword" class="half-line">
          <el-input v-model="form.connectionPassword"></el-input>
        </iep-form-item>
        <iep-form-item label-name="请求类型" prop="requestType" class="half-line">
          <el-select v-model.trim="form.requestType">
            <el-option
              v-for="item in requestTypeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </iep-form-item>
      </template>
      <template v-if="form.connectionType === '0'">
        <iep-form-item label-name="地址" prop="connectionUrl" class="half-line">
          <el-input v-model.trim="form.connectionUrl"></el-input>
        </iep-form-item>
        <iep-form-item label-name="数据库名称" prop="dataName" class="half-line">
          <el-input v-model="form.dataName"></el-input>
        </iep-form-item>
        <iep-form-item label-name="端口号" prop="port" class="half-line">
          <el-input v-model="form.port"></el-input>
        </iep-form-item>
        <iep-form-item label-name="账号" prop="connectionName" class="half-line">
          <el-input v-model="form.connectionName"></el-input>
        </iep-form-item>
        <iep-form-item label-name="密码" prop="connectionPassword" class="half-line">
          <el-input v-model="form.connectionPassword"></el-input>
        </iep-form-item>
        <iep-form-item label-name="数据库类型" prop="requestType" class="half-line">
          <el-select v-model.trim="form.requestType">
            <el-option
              v-for="item in dbTypeDict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="表名称" prop="dataTableNameEn" class="half-line">
          <el-input v-model="form.dataTableNameEn"></el-input>
        </iep-form-item>
      </template>
    </el-form>
    <template slot="footer">
      <iep-operation-wrapper>
        <el-button type="primary" @click="handleSubmit()">连接</el-button>
      </iep-operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { rules, initForm } from "./option";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      methodName: "新增",
      connectionTypeDict: [
        {
          label: "数据库",
          value: "0",
        },
        {
          label: "前置机",
          value: "1",
        },
      ],
      requestTypeDict: [
        {
          label: "get",
          value: "0",
        },
        {
          label: "post",
          value: "9",
        },
      ],
      dbTypeDict: [
        {
          label: "mysql",
          value: "0",
        },
        {
          label: "其他",
          value: "9",
        },
      ],
      rules,
    };
  },
  props: {
    dialogStatus: {
      type: String,
      default: "detail",
    },
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.close();
        }
      });
    },
    open(row) {
      this.form = row;
    },
    close() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.half-line {
  width: 50%;
  display: inline-block;
}
.full-width {
  width: 100%;
}
</style>
