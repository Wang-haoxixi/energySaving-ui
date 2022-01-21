export default {
  methods: {
    // 打开事项弹窗
    onAddMatter () {
      this.$nextTick(() => {
        this.$refs.matterDialog.open();
      });
    },
    // 获取选中事项数据
    handleGetMatterData (row) {
      this.$set(this.formData, "val1", row.val1);
      // this.formData.val1 = row.val1;
      console.log(row);
    },
    // 获取办理流程数据
    handleGetHandlingProcessData (row) {
      if (!Array.isArray(this.formData.val71)) {
        this.$set(this.formData, 'val71', []);
      }
      this.$set(this.formData.val71, this.formData.val71.length, Object.assign({}, row));
      console.log('this.formData.val71', this.formData.val71);
      console.log(row);
    },
    // 打开办理流程弹窗
    handleOpenHandlingProcess () {
      this.$refs.handlingProcessDialog.open();
    },
    // 获取材料数据
    handleGetMaterialData (row) {
      if (!Array.isArray(this.formData.val72)) {
        this.$set(this.formData, 'val72', []);
      }

      this.$set(this.formData.val72, this.formData.val72.length, Object.assign({}, row));
      console.log(row);
    },
    // 打开材料弹窗
    handleOpenMaterialDialog () {
      this.$refs.materialDialog.open();
    },
    // 获取问题数据
    handleGetQuestionData (row) {
      if (!Array.isArray(this.formData.val73)) {
        this.$set(this.formData, 'val73', []);
      }
      this.$set(this.formData.val73, this.formData.val73.length, Object.assign({}, row));
      console.log(row);
    },
    // 打开问题弹窗
    handleOpenQuestionDialog () {
      this.$refs.questionDialog.open();
    },
  },
};