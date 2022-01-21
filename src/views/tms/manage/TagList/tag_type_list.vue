<template>
  <div>
    <el-tag
      :type="tagType"
      :key="typeVo.commonId"
      size="medium"
      v-for="typeVo in selectTagTypes"
      closable
      :disable-transitions="false"
      @close="handleClose(typeVo);"
    >{{ typeVo.commonName }}</el-tag>
    <div v-if="inputVisible" style="display: flex;">
      <el-cascader
        style="width:215px;margin-right:10px"
        v-model="typeIds"
        size="medium"
        :options="typeOptions"
        :props="typeProps"
        change-on-select
      ></el-cascader>
      <el-button class="button-new-tag" size @click="confirmAdd">确认添加</el-button>
    </div>
    <el-button v-else class="button-new-tag" size @click="showInput">快速添加</el-button>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    tagType: {
      type: String,
      default: "info",
    },
    typeList: {
      type: Array,
      default: () => [],
      required: true,
    },
    typeOptions: {
      type: Array,
      default: () => [],
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
    commonVo: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      typeIds: [],
      currentTypeCommon: {
        commonId: null,
        commonName: null,
      },
      typeMap: _.keyBy(this.typeList, "value"),
      selectTagTypes: [...this.commonVo],
      inputVisible: false,
      typeProps: {
        value: "typeId",
        label: "name",
      },
    };
  },
  methods: {
    handleClose(type) {
      this.selectTagTypes.splice(this.selectTagTypes.indexOf(type), 1);
    },
    confirmAdd() {
      const ids = this.typeIds;
      const commonName = ids
        .map(m => {
          return this.typeMap[m].label;
        })
        .join("-");
      this.currentTypeCommon = {
        commonId: ids.reverse()[0],
        commonName,
      };
      const isExist = this.selectTagTypes.findIndex(
        m => m.commonId === this.currentTypeCommon.commonId,
      );
      if (isExist >= 0) {
        this.$message({
          message: "警告，类型已存在",
          type: "warning",
        });
      } else {
        this.selectTagTypes.push(this.currentTypeCommon);
        this.typeIds = [];
      }
    },
    showInput() {
      this.inputVisible = true;
    },
  },
  watch: {
    selectTagTypes: function(ids) {
      this.$emit(
        "input",
        ids.map(m => m.commonId),
      );
    },
  },
};
</script>
