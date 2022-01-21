<template>
  <div class="iep-page-form" v-loading="loading">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <el-form class="iep-form-detail" :model="form" :rules="rules" ref="form" label-width="120px">
        <iep-form-item label-name="应用图标" prop="icon">
          <iep-upload-avatar-wrapper v-model="form.icon"></iep-upload-avatar-wrapper>
        </iep-form-item>
        <iep-form-item label-name="应用名称" prop="name">
          <el-input v-model="form.name" class="iep-form-half-block"></el-input>
        </iep-form-item>
        <iep-form-item label-name="应用标签" prop="tags" class="iep-form-block">
          <iep-tag-input v-model="form.tags"></iep-tag-input>
        </iep-form-item>
        <iep-form-item label-name="应用简介" prop="introduction" class="iep-form-block">
          <iep-input-area v-model="form.introduction"></iep-input-area>
        </iep-form-item>
        <iep-form-item label-name="应用分类" prop="classification">
          <el-input v-model="form.classification" class="iep-form-half-block"></el-input>
        </iep-form-item>
        <iep-form-item label-name="应用类型" prop="type" class="iep-form-block">
          <el-radio-group v-model="form.type">
            <el-radio label="1">免费应用</el-radio>
            <el-radio label="2">收费应用</el-radio>
            <el-radio label="3">默认应用</el-radio>
          </el-radio-group>
        </iep-form-item>
        <template v-if="form.type==2">
          <iep-form-item label-name="应用价格" prop="amount">
            <iep-input-amount v-model="form.amount" class="iep-form-half-block"></iep-input-amount>
          </iep-form-item>
          <iep-form-item label-name="应用价格" prop="cash">
            <iep-input-amount v-model="form.cash" unit="元" class="iep-form-half-block"></iep-input-amount>
          </iep-form-item>
        </template>
        <iep-form-item label-name="开发者" prop="developer">
          <el-input v-model="form.developer" class="iep-form-half-block"></el-input>
        </iep-form-item>
        <iep-form-item label-name="帮助文档" prop="help" class="iep-form-block">
          <el-input v-model="form.help"></el-input>
        </iep-form-item>
        <iep-form-item label-name="应用预览" prop="file">
          <iep-upload
            class="iep-form-half-block"
            v-model="form.file"
            accept="image/*"
            action="/api/admin/file/sftp/upload"
            :limit="12"
            list-type="picture"
            drag
          ></iep-upload>
        </iep-form-item>
        <template v-if="form.id">
          <iep-form-item label-name="版本管理">
            <VersionManager></VersionManager>
          </iep-form-item>
          <iep-form-item label-name="角色管理">
            <RoleManager></RoleManager>
          </iep-form-item>
        </template>
      </el-form>
      <IepFooterBar>
        <el-button
          class="iep-btn-submit"
          type="primary"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >提交</el-button>
        <!-- <el-button class="iep-btn-submit" style="margin-left:0" @click="close()">返回</el-button> -->
      </IepFooterBar>
    </iep-basic-container>
  </div>
</template>
<script>
import {
  postAppStore,
  putAppStore,
  getAppStoreById,
} from "@/api/admin/app_store";
import formMixins from "@/mixins/formMixins";
import { AppStoreEntity, rules } from "./options";
import VersionManager from "./VersionManager";
import RoleManager from "./RoleManager";
export default {
  components: {
    VersionManager,
    RoleManager,
  },
  mixins: [formMixins],
  data() {
    return {
      rules,
      backOption: {
        isBack: true,
      },
      loading: false,
      form: new AppStoreEntity(),
      formRequestFn: () => {},
    };
  },
  async created() {
    if (this.$route.params.id == 0) {
      this.formRequestFn = postAppStore;
    } else {
      this.loading = true;
      this.formRequestFn = putAppStore;
      const { data } = await getAppStoreById(this.$route.params.id);
      this.form = this.$mergeByFirst(new AppStoreEntity(), data);
      this.loading = false;
    }
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>