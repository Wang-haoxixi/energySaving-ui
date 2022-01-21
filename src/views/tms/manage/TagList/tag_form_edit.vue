<template>
  <iep-basic-container>
    <iep-page-header title="修改标签" :backOption="backOption"></iep-page-header>
    <el-form :model="formData" class="form-inline" :rules="rules" ref="form" label-width="120px">
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="标签名称：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="form-right">
          <el-form-item label="是否审核：" class="formWidth">
            <el-switch
              v-model="formData.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>

          <el-form-item label="是否启动：" class="formWidth">
            <el-switch
              v-model="formData.enable"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="标签级别：">
        <el-select v-model="formData.levelId" clearable placeholder="请选择">
          <el-option
            v-for="item in levelNameOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签分类：">
        <tag-type-list
          v-model="formData.typeIds"
          :type-options="typeOptions"
          :type-list="typeNameOpts"
          :common-vo="formData.typeObjs"
        ></tag-type-list>
        <!-- <el-cascader v-model="formData.typeIds" :options="typeOptions" :props="typeProps" change-on-select></el-cascader> -->
      </el-form-item>

      <el-form-item v-if="tagFunction.tagRelation" label="关联标签：" prop="tagList">
        <IepTagInput v-model="formData.tagList"></IepTagInput>
      </el-form-item>

      <el-form-item v-if="tagFunction.tagNotes" label="标签注释：">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>

      <el-form-item label="标签优先级：" class="formWidth">
        <el-input-number v-model="formData.orderNum" :min="1" :max="9"></el-input-number>
      </el-form-item>

      <el-form-item label="其他信息">
        <hr />
      </el-form-item>

      <el-form-item label="标签属性：" class="formWidth">
        <label v-if="formData.isFree==0">游离词</label>
        <label v-else-if="formData.isFree==1">中心词</label>
        <label v-else>卫星词</label>
      </el-form-item>

      <el-form-item label="引用次数：" class="formWidth">
        <label>{{formData.refers}}</label>
      </el-form-item>

      <el-form-item label="更新时间：" class="formWidth">
        <label>{{formData.updateTime | parseToTimeMinutes}}</label>
      </el-form-item>

      <el-form-item label="点击量：" class="formWidth">
        <label>{{formData.views}}</label>
      </el-form-item>

      <el-form-item label="来源：" class="formWidth">
        <label>{{formData.system}}</label>
      </el-form-item>

      <el-form-item label="标签合并：">
        <el-tag v-for="tag in mergeTag" size="medium" :key="tag.commonId">{{tag.commonName}}</el-tag>
      </el-form-item>

      <el-form-item label="标签归入：">
        <el-tag v-for="tag in includeTag" size="medium" :key="tag.commonId">{{tag.commonName}}</el-tag>
      </el-form-item>

      <el-form-item class="charge" label="修改记录：">
        <hr />
      </el-form-item>
      <ul>
        <li class="record-list" v-for="item in recordList" :key="item.createTime">
          <span>{{item.creatorRealName}}</span>
          <span>{{item.createTime | parseToDay}}</span>
          <span>{{item.description}}</span>
        </li>
      </ul>
      <el-form-item class="open">
        <el-button
          icon="el-icon-arrow-down"
          type="text"
          v-if="showExpandBtn"
          @click="handleExpand"
        >展开</el-button>
      </el-form-item>

      <IepFooterBar>
        <el-button type="primary" @click="handleSubmit('form')">保存</el-button>
        <!-- <el-button @click="handleBack">返回</el-button> -->
      </IepFooterBar>
    </el-form>
  </iep-basic-container>
</template>

<script>
import { putTag } from "@/api/tms/tag";
import { getTagTypeParents } from "@/api/tms/tag-type";
import { getRecordMap, getRecordList } from "@/api/tms/record";
import { validTagName } from "@/api/tms/tag";
import tagTypeList from "./tag_type_list";
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    tagFunction: {
      type: Object,
      required: true,
    },
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
    const name = this.formData.name;
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("标签名称不能为空"));
      }
      validTagName(value).then(res => {
        if (name !== value && !res.data) {
          callback(new Error("标签名称重复，已存在。"));
        } else {
          callback();
        }
      });
    };
    return {
      backOption: {
        isBack: true,
        backFunction: this.handleBack,
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
      },
      typeProps: {
        value: "typeId",
        label: "name",
      },
      showExpandBtn: true,
      typeOptions: [],
      includeTag: [],
      mergeTag: [],
      recordList: [],
    };
  },
  created() {
    this.load();
    this.loadMapAndlist();
  },
  methods: {
    handleExpand() {
      getRecordList(this.formData.tagId, null).then(res => {
        this.recordList = res;
        this.showExpandBtn = false;
      });
    },
    loadMapAndlist() {
      getRecordMap(this.formData.tagId).then(res => {
        this.includeTag = res.data.include;
        this.mergeTag = res.data.merge;
      });
      getRecordList(this.formData.tagId).then(res => {
        this.recordList = res;
      });
    },
    load() {
      getTagTypeParents().then(res => {
        const typeOptions = res.data;
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
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          putTag(this.formData).then(() => {
            this.$emit("hideDialog", false);
          });
        }
      });
    },
    handleBack() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.form-inline {
  hr {
    margin-top: 16px;
  }
  .record-list {
    margin-left: 120px;
    line-height: 30px;
    font-size: 14px;
    span {
      margin-right: 10px;
    }
  }
  ul {
    margin-top: -34px;
    margin-bottom: 10px;
  }
}
.charge {
  margin-bottom: 0;
}
.open ::v-deep .el-form-item__content {
  margin-left: 100px !important;
}
.form-right {
  display: flex;
  align-items: center;
}
</style>
