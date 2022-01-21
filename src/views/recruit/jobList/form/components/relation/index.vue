<template>
  <div class="relation-content">
    <div class="head">
      <el-button @click="handleAdd">
        <i class="el-icon-woneng-jiahao"></i>
      </el-button>
      <div class="tips">考试仅在有效期内进行，超过时间或考试被删除等，所关联的考试均会失效。</div>
    </div>
    <div class="relation-list" v-if="list && list.length > 0">
      <div class="relation-item" v-for="(item, index) in list" :key="item.id">
        <i class="el-icon-woneng-fujian1"></i>
        <div class="exam-name">{{item.examName}}</div>
        <i class="el-icon-woneng-shanchu" @click="handleDelete(index)"></i>
      </div>
    </div>
    <RelationDialog ref="relation" @handleSubmit="handleSubmit"></RelationDialog>
  </div>
</template>

<script>
import RelationDialog from "./relationDialog";
export default {
  components: { RelationDialog },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    list: {
      get() {
        return [...this.value];
      },
      set(val) {
        this.$emit("input", [...val]);
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleAdd() {
      this.$refs.relation.open(this.list);
    },
    handleSubmit(list = []) {
      this.list = [...list];
    },
    handleDelete(index) {
      const list = [...this.list];
      list.splice(index, 1);
      this.$emit("input", list);
    },
  },
};
</script>

<style lang="scss" scoped>
.relation-content {
  width: 100%;
  .head {
    display: flex;
    .tips {
      color: $--color-secondary;
      margin-left: 15px;
    }
  }
  .relation-list {
    margin-top: 20px;
    .relation-item {
      padding: 0 16px;
      display: flex;
      border-radius: $--small-border-radius;
      height: 30px;
      line-height: 30px;
      margin-bottom: 3px;
      &:hover {
        background-color: $--background-color;
        cursor: pointer;
      }
      i {
        color: $--color-text-secondary;
        line-height: 30px;
      }
      .exam-name {
        color: $--color-text-secondary;
        margin: 0 12px;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        font-size: 14px;
      }
    }
  }
}
</style>