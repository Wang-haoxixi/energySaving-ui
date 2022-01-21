<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="'批量编辑标签'"
    width="520px"
    @close="handleCancel"
    center
  >
    <el-form class="form" :model="form" :rules="rules" label-width="95px">
      <iep-form-item label-name="标签分类" prop="typeIds">
        <tag-type-list
          class="tag-list"
          v-model="form.typeIds"
          :type-options="typeOptions"
          :type-list="typeNameOpts"
          :common-vo="form.typeObjs"
        ></tag-type-list>
      </iep-form-item>
      <iep-form-item label-name="标签级别" prop="levelId">
        <el-select v-model="form.levelId" clearable placeholder="请选择">
          <el-option
            v-for="item in levelNameOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button style=" margin-right:10px" type="primary" @click="handleSubmit">提交</el-button>
      <iep-button @click="handleCancel">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTagTypeParents } from "@/api/tms/tag-type";
// import { getTagLevelList } from '@/api/tms/tag-level'
import { updateBatchTag } from "@/api/tms/tag";
import tagTypeList from "./tag_type_list";
export const rules = {
  typeid: [{ required: true, message: "请选择标签分类", trigger: "blur" }],
  levelId: [{ required: true, message: "请选择标签级别", trigger: "blur" }],
};
export default {
  name: "OpenEditBatch",
  props: {
    levelNameOpts: {
      type: Array,
      required: true,
    },
    typeNameOpts: {
      type: Array,
      required: true,
    },
  },
  components: { tagTypeList },
  data() {
    return {
      rules,
      formRequestFn: () => {},
      dialogShow: false,
      ids: [],
      form: {
        typeIds: [],
        typeObjs: [],
        levelId: "",
      },
      typeOptions: [],
    };
  },
  created() {
    this.loadTagProp();
  },
  computed: {},
  methods: {
    loadPage() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
    handleSubmit() {
      updateBatchTag({
        tagIds: this.ids,
        typeIds: this.form.typeIds,
        levelId: this.form.levelId,
      }).then(data => {
        if (data.data) {
          this.$message({
            message: "成功",
            type: "success",
          });
        } else {
          this.$message({
            message: data.msg,
            type: "warning",
          });
        }
        this.loadPage();
      });
    },
    handleCancel() {
      this.loadPage();
      this.form = {
        typeid: "",
        levelId: "",
      };
    },
    loadTagProp() {
      getTagTypeParents().then(res => {
        const typeOptions = res;
        typeOptions.map(m => {
          if (!m.children.length) {
            delete m.children;
          } else {
            m.children.map(mm => {
              if (!mm.children.length) {
                delete mm.children;
              } else {
                mm.children.map(mmm => {
                  if (!mmm.children.length) {
                    delete mmm.children;
                  } else {
                    mmm.children.map(mmmm => {
                      if (!mmmm.children.length) {
                        delete mmmm.children;
                      }
                    });
                  }
                });
              }
            });
          }
        });
        this.typeOptions = typeOptions;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form ::v-deep .el-cascader {
  margin-right: 10px;
}
.tag-list {
  margin-right: -10px;
}
.tag-list ::v-deep .el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
