<template>
  <iep-dialog :dialog-show="dialogShow" title="自定义列" width="500px" @close="dialogShow=false">
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div class="list-group-item" v-for="element in list" :key="element.prop">
        <el-checkbox v-model="element.enable">{{ element.label }}</el-checkbox>
        <i class="el-icon-s-operation"></i>
      </div>
    </draggable>
    <template slot="footer">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="dialogShow=false">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: {
    defaultColumnsMap: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogShow: false,
      enabled: true,
      list: [],
      dragging: false,
    };
  },
  computed: {},
  created() {
    this.init();
    this.handleSave();
  },
  methods: {
    init() {
      this.list = this.defaultColumnsMap.map(m => {
        return {
          ...m,
          enable: !m.hidden,
        };
      });
    },
    handleSave() {
      this.$emit(
        "change-columns-map",
        this.list.filter(m => m.enable),
      );
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  margin-bottom: 5px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
