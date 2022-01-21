<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title="关联考试"
    width="800px"
    center
    @close="closed"
    closeOnClickModal
  >
    <div class="search-form">
      <el-checkbox
        class="search-checkbox"
        v-model="searchForm.isCertificate"
        true-label="1"
        false-label="0"
        @change="searchPage"
      >只看有证书</el-checkbox>
      <el-checkbox
        class="search-checkbox"
        v-model="searchForm.isOrg"
        true-label="1"
        false-label="0"
        @change="searchPage"
      >只看本组织</el-checkbox>
      <div class="search-input">
        <el-input
          v-model="searchForm.examName"
          class="el-input"
          placeholder="请输入考试名称进行搜索"
          @input="handleInterval"
        ></el-input>
      </div>
    </div>
    <iep-table
      ref="table"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      isMutipleSelection
      @selection-change="selectionChange"
      @select="selectChange"
      class="relation-table"
      height="320px"
    >
      <template slot="before-columns">
        <el-table-column label="材料名称" min-width="300px">
          <template slot-scope="scope">
            <div class="row-tpl">
              {{scope.row.examName}}
              <i
                class="el-icon-woneng-zhengshu"
                v-if="scope.row.certificateId"
              ></i>
            </div>
          </template>
        </el-table-column>
      </template>
    </iep-table>
    <div slot="footer" class="dialog-footer">
      <div class="footer-tips">
        至多选择 5 场考试，已选择
        <span :class="{'red': list.length > 5}">{{list.length}}</span>
        场考试
      </div>
      <div class="button-list">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </div>
  </iep-dialog>
</template>

<script>
import { getPageForHire } from "@/api/qms/exam_examination";
import mixins from "@/mixins/mixins";
const initSearchForm = () => {
  return {
    isCertificate: "0",
    isOrg: "0",
    examName: "",
  };
};
let delayTimer;
export default {
  mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      searchForm: initSearchForm(),
      list: [],
      relationList: [],
      columnsMap: [
        {
          label: "考试时间",
          prop: "appShowTime",
        },
        {
          label: "所属组织",
          prop: "orgName",
        },
      ],
    };
  },
  methods: {
    open(list = []) {
      this.dialogVisible = true;
      this.searchForm = initSearchForm();
      this.list = list.map((m) => m.id);
      this.relationList = [...list];
      this.loadPage();
    },
    closed() {
      this.dialogVisible = false;
      this.list = [];
      this.relationList = [];
    },
    checkboxChange(val) {
      if (this.list.length > this.relationList.length) {
        this.relationList.push(val);
      } else {
        for (const i in this.relationList) {
          if (this.relationList[i].id === val.id) {
            this.relationList.splice(i, 1);
            break;
          }
        }
      }
    },
    handleSubmit() {
      if (this.list.length < 6) {
        this.$emit("handleSubmit", this.relationList);
        this.dialogVisible = false;
      }
    },
    searchPage() {
      this.pageOption = this._pageOption(false);
      this.loadPage(this.searchForm);
    },
    async loadPage(param = this.searchForm) {
      await this.loadTable(param, getPageForHire);
      this.$refs.table.toggleRowSelection(this.relationList, this.pagedTable);
    },
    handleInterval() {
      let i = 0;
      if (delayTimer) {
        clearInterval(delayTimer);
      }
      delayTimer = setInterval(() => {
        i++;
        if (i === 10) {
          this.searchPage();
          clearInterval(delayTimer);
        }
      }, 100);
    },
    selectionChange() {},
    selectChange(list, row) {
      let state = false;
      for (const index in this.relationList) {
        if (this.relationList[index].id === row.id) {
          state = true;
          this.relationList.splice(index, 1);
          this.list = this.relationList.map((m) => m.id);
          return;
        }
      }
      if (!state) {
        this.relationList.push(row);
        this.list.push(row.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .search-checkbox {
    line-height: 35px;
  }
  .search-input {
    flex: 1;
    text-align: right;
    .el-input {
      width: 250px;
    }
  }
}
.relation-table {
  &::v-deep .content-footer {
    margin-bottom: 0;
  }
  .row-tpl {
    i {
      font-size: 16px;
      color: $--color-primary;
    }
  }
}
.dialog-footer {
  width: 100%;
  display: flex;
  .footer-tips {
    flex: 1;
    color: $--color-text-regular;
    font-size: 14px;
    text-align: left;
    .red {
      color: $--color-primary;
    }
  }
}
</style>
