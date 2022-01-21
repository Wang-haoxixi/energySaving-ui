<template>
  <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="500px" @close="_close()">
    <el-form ref="form" :model="form" label-width="95px" :rules="rules">
      <iep-form-item label-name="试卷名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="试卷分类" prop="qType">
        <el-input @focus="handleFocus" v-model="form.qType"></el-input>
      </iep-form-item>
      <iep-form-item label-name="生成类型" prop="generateType">
        <el-select v-model="form.generateType" placeholder="请选择试卷生成类型">
          <el-option
            v-for="item in generateTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="handleAdd">下一步</el-button>
    </template>
    <dialogType
      ref="dialogType"
      @save="handleActive"
      :checkTreeMenu="propTreeMenu"
      :dialogTitle="'试卷分类'"
    ></dialogType>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from "../../const/pageOptions";
import dialogType from "../../testQuestionsLibrary/Page/dialogType";
import { getTestDictPage } from "@/api/qms/test_questions_library";
export default {
  props: {
    dialogTitle: {
      type: String,
      default: "创建试卷",
    },
  },
  components: {
    dialogType,
  },
  data() {
    return {
      rules,
      dialogShow: false,
      form: initForm(),
      EXAM_PAPER_TYPE: {},
      propTreeMenu: {},
      generateTypeOptions: [
        {
          label: "固定试卷",
          value: "1",
        },
        {
          label: "随机试卷",
          value: "2",
        },
      ],
    };
  },
  computed: {},
  methods: {
    open() {
      this.form = initForm();
      this.dialogShow = true;
    },
    loadTreeMenu() {
      // if (this.propTreeMenu.selectCn) {
      //   this.form.qType = this.propTreeMenu.selectCn;
      // }
    },
    handleAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.qType = this.propTreeMenu.selectString || this.form.qType;
          if (this.form.generateType === "1") {
            this.$emit("handleAdd", this.form);
          } else {
            this.$emit("handleAddRandom", this.form);
          }
        }
      });
    },
    _close() {
      this.dialogShow = false;
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 2;
      const params = {};
      params.category = type;
      getTestDictPage(params).then(res => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.form.qType = val.selectCn;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
