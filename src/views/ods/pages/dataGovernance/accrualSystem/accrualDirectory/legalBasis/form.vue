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
      <el-form-item label="法律名称" prop="name" class="half-line">
        <el-input v-model="formData.name" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="法律文号" prop="lawNumber" class="half-line">
        <el-input v-model="formData.lawNumber" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="文件种类" prop="lawType" class="half-line">
        <el-input v-model="formData.lawType" maxlength="150"></el-input>
      </el-form-item>
      <el-form-item label="文件类型" prop="basisType" class="half-line">
        <el-input v-model="formData.basisType"></el-input>
      </el-form-item>
      <el-form-item label="法律依据类型" prop="lawTab" class="half-line">
        <el-select v-model="formData.lawTab" class="full-width">
          <el-option
            v-for="item in lawTabDict"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联条目内容" prop="lawTerms" class="half-line">
        <div class="full-width">
          <div class="lawTerms" v-for="(item,index) in lawTermsList" :key="index">
            <el-input
              :disabled="formStatus=='detail'"
              v-model="lawTermsList[index].content"
              placeholder="请输入关联条目内容"
              maxlength="200"
              clearable
            ></el-input>
            <el-button
              type="primary"
              v-show="formStatus!='detail'"
              icon="el-icon-plus"
              circle
              v-if="index===0"
              class="btnMargin"
              @click="addInput('lawTermsList')"
            ></el-button>
            <el-button
              type="danger"
              v-show="formStatus!='detail'"
              icon="el-icon-minus"
              circle
              v-else
              class="btnMargin"
              @click="cutInput(index,'lawTermsList')"
            ></el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
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
    ...mapGetters(["dictGroup"]),
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
      lawTabDict: [
        {
          value: "1",
          label: "设定、行使依据",
        },
        {
          value: "2",
          label: "追责情形及依据",
        },
      ],
      lawTermsList: [{ content: "" }],
    };
  },
  methods: {
    addInput(name) {
      const obj = {
        id: null,
        lawId: null,
        content: "",
      };
      this[name].push(obj);
      this.lawTermsList = this[name];
    },
    cutInput(idx, name) {
      this[name].splice(idx, 1);
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
.lawTerms {
  display: flex;
  width: 100%;
  .btnMargin {
    margin-left: 10px;
  }
}

.lawTerms + .lawTerms {
  margin-top: 20px;
}
</style>
