<template>
  <iep-dialog :dialog-show="dialogShow" :title="`广告${methodName}`" width="700px" @close="loadPage">
    <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="120px">
      <iep-form-item label-name="站点id">
        <el-input v-model="siteId" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告位" prop="adslotId">
        <iep-select
          v-model="form.adslotId"
          :prefix-url="`cms/info_adslot/${siteId}`"
          placeholder="请选择广告位"
        ></iep-select>
      </iep-form-item>
      <iep-form-item label-name="广告名称" prop="name">
        <el-input v-model="form.name" maxlength="150" show-word-limit placeholder="请输入广告名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="开始时间" prop="beginDate">
        <iep-date-picker
          :picker-options="startPickerOptions"
          v-model="form.beginDate"
          type="datetime"
          placeholder="选择开始日期"
          default-time="00:00:00"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="结束时间">
        <iep-date-picker
          :picker-options="endPickerOptions"
          v-model="form.endDate"
          type="datetime"
          placeholder="选择结束日期"
          default-time="23:59:59"
        ></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="广告类型" prop="type">
        <iep-dict-select
          v-model="form.type"
          placeholder="请选择广告类型"
          @change="changeType"
          dictName="conm_ad_controller_type"
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item v-if="form.type==='products'" label-name="跳转类型" ref="jumpType" prop="jumpType">
        <iep-dict-select
          v-model="form.jumpType"
          placeholder="请选择跳转类型"
          @change="changeJumpType"
          dictName="conm_ad_controller_jump_type"
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item :label-name="'跳转对象'" ref="jumpObj" prop="relationId">
        <el-select
          v-loading="loading"
          v-model="relationId"
          filterable
          :filter-method="requestAdOptions"
          placeholder="请选择跳转对象"
          clearable
          v-if="!['html','other','h5'].includes(form.type)&&form.jumpType==='1'"
        >
          <!-- v-if="!['html','other'].includes(form.type)&&form.jumpType==='1'" -->
          <el-option
            class="relationId-option"
            :title="item[selectDict[form.type].selectLabelName]"
            v-for="item in adOptions"
            :key="item.id"
            :label="item[selectDict[form.type].selectLabelName]"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-loading="loading"
          v-model="form.keyWords"
          filterable
          :filter-method="requestAdOptions"
          placeholder="请选择标签"
          clearable
          v-else-if="!['html','other','h5'].includes(form.type)&&form.jumpType==='2'"
        >
          <!-- v-else-if="!['html','other'].includes(form.type)&&form.jumpType==='2'" -->
          <el-option
            class="keyWords-option"
            :title="item.name"
            v-for="item in adOptions"
            :key="item.tagId"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input v-else-if="form.type === 'h5'" placeholder="请输入内容" v-model="form.url">
          <template slot="prepend">https://h5.jienengbao.top/</template>
        </el-input>
        <el-input v-else v-model="form.url" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告文字">
        <el-input v-model="form.text" type="textarea" maxlength="250" show-word-limit></el-input>
      </iep-form-item>
      <iep-form-item label-name="广告图片" ref="imageUrl" prop="imageUrl">
        <iep-single-img-upload v-model="form.imageUrl"></iep-single-img-upload>
      </iep-form-item>
      <iep-form-item label-name="排序" prop="seq">
        <iep-input-number v-model="form.seq" :min="1" :precision="0"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" style="margin-right:10px" @click="submitForm()">提交</el-button>
      <el-button @click="dialogShow = false">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getInfoAdPageDetailById } from "@/api/conm/ad_controller.ts";
import { getTagPage } from "@/api/tms/tag";
import { initForm, dictsMap, rules, selectDict } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
      relationId: 0,
      rules,
      id: 0,
      siteId: 0,
      prefixUrl: "asd",
      selectDict,
      adOptions: [],
      imgUrl: [],
      loading: false,
      unwatchFn: null,
      startPickerOptions: {
        disabledDate: v => {
          const n = new Date(v).getTime();
          if (this.form.endDate) {
            return (
              n < Date.now() - 24 * 3600 * 1000 ||
              n > new Date(this.form.endDate).getTime()
            );
          }
          return n < Date.now() - 24 * 3600 * 1000;
        },
      },
      endPickerOptions: {
        disabledDate: v => {
          const n = new Date(v).getTime();
          if (this.form.beginDate) {
            return (
              n < Date.now() - 24 * 3600 * 1000 ||
              n < new Date(this.form.beginDate).getTime()
            );
          }
          return n < Date.now() - 24 * 3600 * 1000;
        },
      },
    };
  },
  created() {
    this.loadPage();
    this.requestAdOptions();
  },
  watch: {
    "form.type"(v) {
      !['html','other', 'h5'].includes(v) && this.requestAdOptions();
    },
    "form.jumpType"() {
       !['html','other','h5'].includes(this.form.type) && this.requestAdOptions();
    },
    "form.imageUrl"() {
      this.$nextTick(() => {
        this.$refs["imageUrl"] &&
          this.$refs["imageUrl"].$children.forEach(m => {
            m.onFieldChange();
          });
      });
    },
    relationId(v) {
      if (v === "") {
        this.form.relationId = 0;
      } else {
        this.form.relationId = v;
      }
    },
    "form.relationId"(v) {
      if (v === 0) {
        this.relationId = "";
      } else {
        this.relationId = v;
      }
    },
  },
  methods: {
    loadPage() {
      this.form = initForm();
      this.dialogShow = false;
      // this.$emit("load-page");
    },
    async loadTypeList() {
      const { data } = await getInfoAdPageDetailById(this.id);
      this.form = this.$mergeByFirst(this.form, data);
      if(this.form.type === 'h5') this.form.url = this.form.url.substring(this.form.url.indexOf('?'));
      console.log('form..', this.form);
    },
    async submitForm() {
      this.$refs["form"].validate(v => {
        if (v) {
          if(this.form.type === 'h5') {
            if(this.form.url){
              this.form.url = "https://h5.jienengbao.top/" + this.form.url;
            } else {
              this.form.url = "";
            }
          }
          this.formRequestFn({ siteId: this.siteId, ...this.form }).then(
            data => {
              if (data.code === 0) {
                this.$message.success("操作成功");
                this.loadPage();
                this.$emit("load-page");
              } else {
                this.$message(data.message);
              }
            },
          );
        } else {
          this.$message.warning("请补全必填内容");
        }
      });
    },
    changeType() {
      this.form.url = "";
      this.form.relationId = 0;
      this.form.keyWords = "";
      this.$nextTick(() => {
        this.$refs["jumpObj"].$children.forEach(m => {
          m.onFieldChange();
        });
      });
      this.form.jumpType = "1";
    },
    changeJumpType() {
      this.form.url = "";
      this.form.relationId = 0;
      this.form.keyWords = "";
      this.$nextTick(() => {
        this.$refs["jumpObj"].$children.forEach(m => {
          m.onFieldChange();
        });
      });
    },
    async requestAdOptions(v) {
      const type = this.form.type;
      if (type) {
        const params = {
          size: 50,
        };
        if (type === "task") params.sort = 0;
        if (v) {
          params[this.selectDict[type].searchName] = v;
        }
        this.loading = true;
        let data;
        if (this.form.jumpType === "1") {
          data = await this.selectDict[type].methods(params);
        } else {
          data = await getTagPage(params);
        }
        this.adOptions = data.data.records;
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.relationId-option {
  max-width: 400px;
}
</style>

