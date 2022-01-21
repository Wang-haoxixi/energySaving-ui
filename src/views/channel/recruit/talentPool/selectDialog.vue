<template>
  <iep-dialog :dialog-show="dialogShow" title="我为组织招人才" width="400px" :show-close="false">
    <div class="search">
      <el-select
        v-model="soValue"
        placeholder="请选择"
        :disabled="list.length === 0"
        @change="handleChange"
      >
        <el-option v-for="item in list" :key="item.orgId" :label="item.name" :value="item.orgId"></el-option>
      </el-select>
      <div class="no-chosen" v-if="list.length !== 0">请先选择组织</div>
    </div>
    <div class="link" v-if="list.length === 0" @click="handleCreateSo">请先创建组织再来招聘人才吧>></div>
  </iep-dialog>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogShow: false,
      soValue: "",
    };
  },
  methods: {
    handleChange(val) {
      // 存在session中
      const obj = {
        content: val,
        datetime: new Date().getTime(),
      };
      window.sessionStorage.setItem("talentPoolSoSelect", JSON.stringify(obj));
      this.dialogShow = false;
      this.$emit("select-so", val);
    },
    handleCreateSo() {
      this.$router.push("/my/create_org");
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  &::v-deep .el-select {
    width: 100%;
  }
  .no-chosen {
    margin-top: 20px;
  }
}
.link {
  font-size: 14px;
  text-decoration: underline;
  color: $--color-secondary;
  cursor: pointer;
  margin-top: 20px;
}
</style>