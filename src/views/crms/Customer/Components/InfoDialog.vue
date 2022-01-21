<template>
  <div class="mlms">
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}资讯`" width="666px" @close="dialogShow=false">
      <el-form :model="form" ref="form" label-width="120px">
        <iep-form-item label-name="资讯标题" prop="title">
          <el-input v-model="form.title" placeholder="请填入资讯标题"></el-input>
        </iep-form-item>
        <!-- <iep-form-item label-name="标签" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请填入角色名称"></el-input>
        </iep-form-item> -->
        <iep-form-item label-name="链接" prop="linkAddress">
          <el-input v-model="form.linkAddress" placeholder="请填入链接"></el-input>
        </iep-form-item>
        <iep-form-item label-name="优先级" prop="roleName" tip="优先级数字越大展示越靠前">
          <el-input-number v-model="form.priority" :min="1" :max="10"></el-input-number>
        </iep-form-item>
      </el-form>
      <IepFooterBar>
        <el-button type="primary" slot @click="handleSave">保存</el-button>
      </IepFooterBar>
    </iep-dialog>
  </div>
</template>
<script>
const initForm = () => {
  return {
    clientId: 0,
    createBy: 0,
    informationId: 0,
    linkAddress: "",
    priority: 0,
    title: "",
    updateBy: 0,
    viewTimes: 0,
  };
};
import { getPageById } from "@/api/dms/custom_information.ts";
export default {
  data() {
    return {
      dialogShow: false,
      form: initForm(),
      methodName: "新增",
      fnRequest: () => {},
      informationId: "",
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    loadDetail() {
      getPageById(this.informationId).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
      });
    },
    handleSave() {
      this.form.clientId = this.id;
      this.fnRequest(this.form).then(res => {
        if (res.data) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.$emit("save");
          this.form = initForm();
          this.dialogShow = false;
        } else {
          this.$message({
            message: `${res.message}`,
            type: "error",
          });
        }
      });
    },
  },
};
</script>