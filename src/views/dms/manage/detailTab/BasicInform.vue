<template>
  <div class="info">
    <el-form ref="form" class="form-detail" :model="formData" label-width="120px">
      <h4 class="iep-sub-title">基本信息</h4>
      <div class="info-con">
        <iep-form-item label-name="身份证号码" class="form-half">
          <iep-div-detail :value="formData.id"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="联系电话" class="form-half">
          <iep-div-detail :value="formData.mobile"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="联系地址" class="form-half">
          <iep-div-detail :value="formData.orgAddress"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="所属组织" class="form-half">
          <iep-div-detail :value="formData.orgName"></iep-div-detail>
        </iep-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { operationColumnsMap, dictsMap } from "./options.js";
export default {
  mixins: [mixins],
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    id: {
      type: String,
      default: "",
    },
    createBy: {
      type: Number,
      default: null,
    },
    agentType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      operationColumnsMap,
      dictsMap,
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.base {
  padding: 20px;
}
.iep-sub-title {
  margin-top: 5px;
  font-size: 14px;
}
.info-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.info-con ::v-deep .el-form-item {
  width: 50%;
}
.form-half ::v-deep .el-form-item__content {
  height: 42px;
}
</style>
