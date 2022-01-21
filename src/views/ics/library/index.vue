<template>
  <div>
    <iep-basic-container class="library" v-show="pageState === 'library'">
      <h1>问答库管理</h1>
      <div class="content">
        <classifies class="classifies" ref="classifies" @load_page="loadPage" @load_list="loadList"></classifies>
        <tableTpl class="table" ref="table" @handle_form="handleForm" :classList="classList"></tableTpl>
      </div>
    </iep-basic-container>
    <formTpl ref="form" v-show="pageState === 'form'" @load_page="loadPage" :options="options"></formTpl>
  </div>
</template>

<script>
import classifies from "./classifies";
import tableTpl from "./table";
import formTpl from "./form";

export default {
  components: { classifies, tableTpl, formTpl },
  data() {
    return {
      currentId: 0,
      pageState: "library",
      options: [],
      classList: {},
    };
  },
  methods: {
    handleForm(state, row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].open(state, row);
      });
    },
    loadPage(state, id) {
      this.currentId = id;
      this.pageState = "library";
      if (state) {
        this.$refs["table"].loadPage(id, true);
      }
    },
    loadList(list) {
      this.options = list;
      const classList = new Object();
      for (const item of list) {
        classList[item.id] = item.typeName;
        if (item.subType.length > 0) {
          for (const t of item.subType) {
            classList[t.id] = t.typeName;
          }
        }
      }
      this.classList = classList;
    },
  },
  mounted() {
    this.$refs["classifies"].loadPage();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 18px;
}
.library {
  .content {
    display: flex;
    .classifies {
      width: 245px;
    }
    .table {
      flex: 1;
      margin-left: 20px;
    }
  }
}
.content ::v-deep .el-submenu__title,
.content ::v-deep .item-tpl,
.content ::v-deep .el-dropdown,
.content ::v-deep .el-submenu .el-menu .el-menu-item {
  height: 20px;
  line-height: 20px;
}
.content ::v-deep .item-tpl,
.content ::v-deep .el-dropdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content ::v-deep .el-dropdown {
  top: 0;
}
.content ::v-deep .el-submenu .el-menu-item-group .el-menu-item,
.content ::v-deep .el-submenu .el-menu .el-menu-item {
  margin: 20px 0;
}
.content ::v-deep .el-submenu .el-menu .el-menu-item:last-child {
  margin-bottom: 0;
}
.content ::v-deep .el-submenu:hover .el-submenu__title {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    content: "";
    width: 4px;
    // background: rgba(247, 67, 55, 1);
    background: $--color-primary;
    border-radius: 2px;
  }
}
::v-deep .el-table td div {
  margin-right: 5px;
}
</style>
