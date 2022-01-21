
<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`编辑`" :backOption="backOption"></iep-page-header>
      <central-word class="words-info" :information="information"></central-word>
      <iep-operation-container>
        <template slot="left">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增卫星词</el-button>
        </template>
      </iep-operation-container>
      <iep-table
        class="table"
        :isLoadTable="isLoadTable"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :pagination="pagination"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <template slot="before-columns">
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">{{scope.row.tagId}}</template>
          </el-table-column>
          <el-table-column label="卫星词名称" width="120">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="标签级别">
            <template slot-scope="scope">{{scope.row.levelName}}</template>
          </el-table-column>
          <el-table-column label="所属分类">
            <template slot-scope="scope">
              <div>{{!scope.row.typeVos.length>0?scope.row.typeVos.map(m=>m.name).join('、'):"暂无"}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="更新时间" width="180">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column label="相似度">
          <template slot-scope="scope">{{scope.row.similarity}}%</template>
        </el-table-column>
        <el-table-column label="批次">
          <template slot-scope="scope">
            <span v-if="scope.row.batch>0">第{{scope.row.batch}}次</span>
            <span v-else>人工处理</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <iep-operation-wrapper>
              <el-button type="text" @click="handleFreed(scope.row)">释放</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="handleReplacement(scope.row)">更替中心词</el-button>
            </iep-operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </iep-basic-container>
    <add-dialog ref="AddDialog" @load-page="loadPage"></add-dialog>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import {
  getResultById,
  getResultPageByTagId,
  releaseSatelliteById,
  editCenterWord,
  releaseTransById,
} from "@/api/tms/management";
import addDialog from "./addDialog";
import CentralWord from "./CentralWord";
export default {
  mixins: [mixins],
  components: { addDialog, CentralWord },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: "",
        backFunction: () => {
          this.$router.push("/tms/manage/management");
        },
      },
      columnsMap: [
        {
          prop: "refers",
          label: "引用次数",
        },
        {
          prop: "views",
          label: "点击量",
        },
      ],
      information: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id ? +this.$route.params.id : null;
    },
  },
  created() {
    this.loadPage();
  },

  methods: {
    handleAdd() {
      this.$refs["AddDialog"].dialogShow = true;
      this.$refs["AddDialog"].loadPage();
      this.$refs["AddDialog"].form.centralWord = this.information.tagId;
      this.$refs["AddDialog"].form.centralWordName = this.information.name;
      this.$refs["AddDialog"].formRequestFn = editCenterWord;
      this.$refs["AddDialog"].methodName = "新增卫星词";
    },
    handleCreate() {},
    //更替中心词
    handleReplacement(row) {
      this.$confirm("此操作将永久更替该中心词, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        releaseTransById({
          newCenterId: row.tagId,
          centerId: this.information.tagId,
        }).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "更替成功!",
            });
            this.$router.push(`/tms/manage/management/edit/${row.tagId}`);
          } else {
            this.$message({
              type: "info",
              message: `更替失败，${res.msg}`,
            });
          }
          this.loadPage();
        });
      });
    },
    //释放卫星词
    handleFreed(row) {
      this.$confirm("此操作将永久释放该卫星词, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        releaseSatelliteById({
          centerId: this.information.tagId,
          satelliteId: row.tagId,
        }).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "释放成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `释放失败，${res.msg}`,
            });
          }
          this.loadPage();
        });
      });
    },
    loadPage(param = this.searchForm) {
      this.loadTable({ ...param }, getResultPageByTagId(this.id));
      getResultById(this.id).then(data => {
        this.information = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.table ::v-deep .el-button {
  margin-right: 0;
}
.words-info {
  font-size: 14px;
}
.words-info ::v-deep .title {
  margin-bottom: 20px;
}
</style>
