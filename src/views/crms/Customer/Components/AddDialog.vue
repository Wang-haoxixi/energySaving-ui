<template>
  <div class="mlms">
    <iep-dialog :dialog-show="dialogShow" title="关联材料" width="1200px" @close="dialogShow=false">
      <table-tpl class="table" ref="table" @val="handleVal" :mlmsType="mlms"></table-tpl>
      <IepFooterBar>
        <el-button :disabled="disabled" @click="handleSave">保存</el-button>
      </IepFooterBar>
    </iep-dialog>
  </div>
</template>
<script>
import TableTpl from "@/views/mlms/material/table";
import { createPage, updatePage } from "@/api/dms/custom_plan.ts";
export default {
  components: { TableTpl },
  data() {
    return {
      dialogShow: false,
      mlms: "",
      mlmsIds: [],
      disabled: true,
      parmas: {
        id: "",
        planId: "",
        clientId: 0,
        resourceName: "",
        type: "material",
      },
    };
  },
  computed: {
    isEdit() {
      return this.parmas.planId ? true : false;
    },
    clientId() {
      return +this.$route.params.id;
    },
  },
  methods: {
    handleVal(val) {
      const mlmsIds = val.map(m => m.id);
      this.mlmsIds = mlmsIds;
      if (this.mlmsIds.length === 1) {
        this.disabled = false;
        this.parmas.id = this.mlmsIds.toString();
        this.parmas.resourceName = val[0].materialName;
      } else {
        this.disabled = true;
      }
    },
    handleSave() {
      this.parmas.clientId = this.clientId;
      if (this.isEdit) {
        updatePage(this.parmas).then(data => {
          this.$emit("save", data);
          this.dialogShow = false;
        });
      } else {
        createPage(this.parmas).then(data => {
          this.$emit("save", data);
          this.dialogShow = false;
        });
      }
    },
  },
};
</script>