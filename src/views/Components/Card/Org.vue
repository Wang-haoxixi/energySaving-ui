<template>
  <div class="org-card-wrapper" v-loading="loading">
    <div class="info-wrapper">
      <div class="avatar-wrapper" title="进入风采页" @click="handleShow(form)">
        <iep-img class="img" :src="form.avatar" :resizeOpt="{l:80}"></iep-img>
      </div>
      <div class="text-wrapper iep-ellipsis-flex">
        <el-link
          class="name iep-ellipsis-flex"
          title="进入风采页"
          @click="handleShow(form)"
          :underline="false"
        >
          {{form.orgName}}
          <IepRednessIcon :redness="form.redness"></IepRednessIcon>
          <el-tag v-if="form.isCharge">收费</el-tag>
        </el-link>
        <div class="info">负责人：{{form.realName}}</div>
        <div class="info">{{form.slogan}}</div>
      </div>
    </div>
    <IepTags class="tag-list" :value="form.abilityTag"></IepTags>
    <div class="data-wrapper">
      <div class="data-item">
        <div class="value">{{form.exponent.creditWorth}}</div>
        <div class="label">信用值</div>
      </div>
      <div class="data-item">
        <div class="value">{{form.exponent.bellAssets}}</div>
        <div class="label">宝贝</div>
      </div>
      <div class="data-item">
        <div class="value">{{form.exponent.mightyOne}}</div>
        <div class="label">用户</div>
      </div>
      <div class="data-item">
        <div class="value">{{form.exponent.taskCount}}</div>
        <div class="label">任务数</div>
      </div>
    </div>
    <div v-if="!isOpenText" class="opt-box">
      <ican-button
        type="plain"
        @click="handleFollow(form, 2,'orgId')"
        v-hoverSpan="{isFlag:form.isFollowed ,default:'关注',cancel:'取消关注',active:'已关注'}"
      ></ican-button>
      <ican-button v-if="!form.isJoin" type="plain" @click="handleOpenJoin()">申请加入</ican-button>
    </div>
    <div v-else>
      <el-form :model="joinForm" ref="form" :rules="rules">
        <el-form-item prop="message">
          <iep-input-area
            v-model="joinForm.message"
            :maxlength="50"
            show-word-limit
            placeholder="请输入申请理由（50字以内）"
          ></iep-input-area>
        </el-form-item>
        <template v-if="form.isCharge">
          <el-alert
            style="margin:10px 0"
            :title="`加入当前组织需缴纳 ${form.cost} 宝贝，是否确认申请？`"
            type="warning"
            :closable="false"
          ></el-alert>
          <el-form-item prop="safePassword">
            <el-input
              v-model="joinForm.safePassword"
              type="password"
              autocomplete="new-password"
              placeholder="请输入支付密码"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div class="opt-box">
        <ican-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交申请</ican-button>
        <ican-button type="plain" @click="handleCloseJoin()">取消</ican-button>
      </div>
    </div>
  </div>
</template>
<script>
import { SO_JOIN_TIP } from "@/const/env";
import { encryption } from "@/util/util";
import formMixins from "@/mixins/formMixins";
import followMixins from "@/mixins/followMixins";
import { getOrgCardById, applyOrg } from "@/api/admin/org";
import { OrgCardEntity, OrgExponentEntity } from "@/types/org";
class JoinForm {
  orgId = 0;
  message = "";
  cost = 0;
  safePassword = "";
}
export default {
  name: "IepOrgCard",
  mixins: [formMixins, followMixins],
  data() {
    return {
      loading: false,
      followLoading: false,
      isOpenText: false,
      message: "",
      safePassword: "",
      form: new OrgCardEntity(),
      joinForm: new JoinForm(),
      rules: {
        safePassword: [
          { required: true, message: "请输入安全密码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleShow(item) {
      if (item.isOpen) {
        this.$openPage(`${this.$pathPrefix_SoStyle}${item.orgId}`);
      } else {
        this.$message(SO_JOIN_TIP);
      }
    },
    async loadOrg(id, isLoad = true) {
      this.loading = isLoad ? true : false;
      const { data } = await getOrgCardById(id);
      this.form = this.$mergeByFirst(new OrgCardEntity(), data);
      this.form.exponent = this.$mergeByFirst(
        new OrgExponentEntity(),
        data.exponent,
      );
      this.loading = false;
    },
    async refresh() {
      await this.loadOrg(this.form.orgId, false);
    },
    handleOpenJoin() {
      this.isOpenText = true;
    },
    handleCloseJoin() {
      this.message = "";
      this.isOpenText = false;
    },
    async submitForm() {
      const form = encryption({
        data: this.joinForm,
        param: ["safePassword"],
      });
      form.orgId = this.form.orgId;
      form.cost = this.form.cost;
      const { data } = await applyOrg(form);
      if (data) {
        this.$message("您的入组申请将在2个工作日内得到处理。");
        this.$emit("success");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.org-card-wrapper {
  width: 100%;
  .tag-list {
    margin: 20px 0;
  }
}
.info-wrapper {
  display: flex;
  .avatar-wrapper {
    flex: 0 0 80px;
    cursor: pointer;
    .img {
      min-width: 80px;
      width: 80px;
      height: 80px;
      border: 1px solid $--border-color;
    }
  }
  .info {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: $--color-text-secondary;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .text-wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow-x: hidden;
    max-width: 300px;
    & > div {
      margin-bottom: 5px;
    }
    .name {
      margin-right: 5px;
      font-size: 16px;
      &::v-deep span {
        text-align: left;
      }
    }
    .city {
      color: $--color-text-secondary;
    }
  }
}
.data-wrapper {
  margin: 15px 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid $--border-color;
  background-color: $--background-color;
  border-radius: 10px;
  .data-item {
    text-align: center;
    .value {
      min-width: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .label {
      margin-top: 5px;
      color: $--color-text-secondary;
    }
  }
}

.opt-box {
  margin: 10px;
  display: flex;
  justify-content: center;
}
.opt-box ::v-deep button {
  margin-right: 10px;
  padding: 0 20px;
  height: 36px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
