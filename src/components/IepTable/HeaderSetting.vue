<template>
  <div>
    <el-tooltip effect="dark" content="自定义列" placement="top">
      <el-button icon="el-icon-s-operation" @click="openDialog"></el-button>
    </el-tooltip>
    <header-setting-dialog ref="HeaderSettingDialog" :default-columns-map="defaultColumnsMap" @change-columns-map="setColumnsMap"></header-setting-dialog>
  </div>
</template>
<script>
import HeaderSettingDialog from "./HeaderSettingDialog";
export default {
  name: "IepTableHeaderSetting",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultColumnsMap: [],
    };
  },
  created() {
    this.defaultColumnsMap = [...this.value];
  },
  components: {
    HeaderSettingDialog,
  },
  methods: {
    setColumnsMap(columnsMap) {
      this.$emit("input", columnsMap);
    },
    openDialog() {
      this.$refs["HeaderSettingDialog"].dialogShow = true;
    },
  },
};
</script>
