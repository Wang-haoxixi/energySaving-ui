<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="30%" @close="close">
    <div v-if="dialogType==='highSeas'">
      <el-form :model="highSeasform">
        <iep-form-item label-name="分配给">
          <IepUserInput v-model="user"></IepUserInput>
        </iep-form-item>
      </el-form>
    </div>
    <div v-else class="user">
      <el-form :model="form">
        <iep-form-item label-name="新负责人">
          <IepUserInput v-model="user"></IepUserInput>
        </iep-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <iep-button class="btn" @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  name: "collaborator",
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      fnRequest: () => {},
      methodName: "转移客户",
      dialogType: "",
      ids: [],
      user: {},
      highSeasform: {
        user: {
          id: "",
          name: "",
        },
      },
      form: {
        user: {
          id: "",
          name: "",
        },
      },
    };
  },
  methods: {
    close() {
      this.form.user = {
        id: "",
        name: "",
      };
      this.dialogShow = false;
    },
    submitForm() {
      this.fnRequest(this.ids, this.user.id).then(res => {
        if (res.data) {
          this.$message({
            message: "转移成功",
            type: "success",
          });
          this.$emit("save");
          this.close();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  float: left;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 37px;
}
.list span {
  padding: 0 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 38px;
}
.search {
  margin-bottom: 10px;
}
.user {
  padding: 20px 0;
  display: flex;
  align-items: baseline;
}
.el-form {
  width: 100%;
}
.btn {
  margin-right: 5px;
}
</style>
