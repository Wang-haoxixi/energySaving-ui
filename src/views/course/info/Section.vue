<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <div v-loading="loading" class="container iep-form-detail">
        <iep-no-data v-if="!sectionList.length" complex></iep-no-data>
        <div class="section-wrap" v-for="section in sectionList" :key="section.sectionNumber">
          <SectionHeader :section="section" @load-page="loadPage()"></SectionHeader>
          <div class="section-content">
            <IepTable
              class="small-section-table"
              :columnsMap="columnsMap"
              :pagedTable="section.children"
              :isPagination="false"
              :isLoadTable="false"
            >
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.row)" type="text" :disabled="disabled">编辑</el-button>
                  <el-button @click="handleDel(scope.row)" type="text" :disabled="disabled">删除</el-button>
                </template>
              </el-table-column>
            </IepTable>
            <el-button
              class="iep-btn-block"
              size="medium"
              type="primary"
              @click="handleAdd(false, section)"
              plain
              :disabled="disabled"
            >新增子章节</el-button>
          </div>
        </div>
        <el-button
          class="iep-btn-block"
          size="medium"
          type="primary"
          @click="handleAdd(true, sectionList)"
          plain
          :disabled="disabled"
        >新增章节</el-button>
      </div>
    </iep-basic-container>
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </div>
</template>
<script>
import DialogForm from "./DialogForm";
import SectionHeader from "./SectionHeader";
import operationMixins from "@/mixins/operationMixins";
import {
  getInfoSectionById,
  putInfoSection,
  delInfoSectionById,
  getSectionById,
} from "@/api/qms/course_info_section";
export default {
  components: {
    DialogForm,
    SectionHeader,
  },
  mixins: [operationMixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      loading: false,
      sectionList: [],
      audit: '1',
      columnsMap: [
        {
          label: "类型",
          prop: "type",
          type: "dictGroup",
          dictName: "course_ware_type",
        },
        {
          label: "小节名称",
          prop: "smallSectionName",
        },
        {
          label: "内容",
          prop: "wareName",
        },
        {
          label: "学时(分钟)",
          prop: "learnTime",
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    formRequestFn() {
      return putInfoSection;
    },
    disabled () {
      return this.audit === '3';
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      try {
        this.loading = true;
        const { data } = await getInfoSectionById(this.id);
        this.audit = data.audit;
        const list = data.list;
        this.sectionList = list;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    handleAdd(sectionShow, row) {
      if (sectionShow) {
        this.$refs["DialogForm"].addSection(row, this.id);
      } else {
        this.$refs["DialogForm"].addSmallSection(row);
      }
    },
    handleEdit(row) {
      getSectionById(row.id).then(({ data }) => {
        this.$refs["DialogForm"].edit(data);
      });
    },
    handleDel(row) {
      this._handleComfirm(row.id, delInfoSectionById, "删除");
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 20px;
  .section-wrap {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid $--border-color;
    .section-content {
      .small-section-table {
        margin: 10px 0;
      }
    }
  }
}
</style>
