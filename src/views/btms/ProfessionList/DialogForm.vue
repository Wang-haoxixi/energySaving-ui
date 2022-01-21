<template>
  <iep-dialog :dialog-show="dialogShow" :title="`专业${methodName}`" width="480px" @close="loadPage">
    <el-form class="form-detail" :model="form" ref="form" :rules="rules" label-width="95px">
      <iep-form-item class="form-half" label-name="专业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item class="form-half" label-name="专业等级" prop="type">
        <el-input v-model="form.type" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="专业说明" prop="introduction">
        <el-input type="textarea" v-model="form.introduction"></el-input>
      </iep-form-item>
      <!-- <el-form-item label="专业描述">
        <div style="display:flex">
          <el-input placeholder="请输入内容" v-model="form.rep" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </el-input>
          <div class="btn-item">
            <i class="el-icon-remove-outline"></i>
            <i v-if="form.rep==''" @click="handleMoreRep" class="el-icon-circle-plus-outline"></i>
          </div>
        </div>
      </el-form-item>-->
    </el-form>
    <template slot="footer">
      <el-button style="margin-right:10px;" type="primary" @click="submitForm">提交</el-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
    <add-dialog ref="AddDialog"></add-dialog>
  </iep-dialog>
</template>
<script>
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
import { initForm, dictsMap, rules } from "./options";
import formMixins from "@/mixins/formMixins";
import AddDialog from "./AddDialog";
import { getPageDetailById } from "@/api/dms/profession";
// import { mapGetters } from 'vuex'
export default {
  components: { AddDialog },
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      rules,
      select: "",
      id: null,
      parentId: "",
    };
  },
  // },
  created() {},
  methods: {
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
      this.$emit("load-page");
    },
    handleMoreRep() {
      this.$refs["AddDialog"].dialogShow = true;
      // this.$refs['AddDialog'].type = this.form.rep
    },
    getValueByKey() {
      this.form.type = dictsMap.type[this.form.type];
    },
    loadTypeList() {
      getPageDetailById(this.id).then(data => {
        this.form = this.$mergeByFirst(this.form, data.data);
        this.getValueByKey();
      });
    },
    async submitForm() {
      this.form.parentId = this.parentId;
      this.form.type = getKeyByValue(dictsMap.type, this.form.type);
      this.formRequestFn({ ...this.form, id: this.id }).then(data => {
        if (data.data) {
          this.$message.success("操作成功");
          this.loadPage();
        } else {
          this.$message(data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.form-detail >>> .el-select .el-input {
  width: 100px;
}
.form-detail >>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<style scoped lang="scss">
.btn-item {
  width: 120px;
  i {
    margin-left: 8px;
    font-size: 22px;
    vertical-align: -3px;
    cursor: pointer;
    &:nth-child(1) {
      color: $--color-input-regular;
      &:hover {
        color: #ddd;
      }
    }
    &:nth-child(2) {
      color: $--color-primary;
      &:hover {
        color: #d3585c;
      }
    }
  }
}
</style>
