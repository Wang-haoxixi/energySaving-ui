<template>
  <div>
    <create-org-layout>
      <div slot="header">
        <h4 class="title">
          创建
          <span class="iep-red">智慧</span>组织
        </h4>
        <span class="desc">实现您的组织梦</span>
      </div>
      <el-form class="iep-form-detail-block" :model="form" :rules="rules" ref="form">
        <el-form-item class="avatar" prop="avatar">
          <iep-upload-avatar v-model="form.avatar"></iep-upload-avatar>
        </el-form-item>
        <div class="name">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="请输入组织名称"></el-input>
          </el-form-item>
          <el-alert title="智慧组织 Smart Organization，简称组织" type="info" show-icon :closable="false"></el-alert>
        </div>
        <div class="read">
          <el-checkbox v-model="checked">
            已阅读并同意
            <b class="link" @click="$openWindow('/protocol/master_rule')">《节能宝平台负责人规则》</b>
          </el-checkbox>
        </div>
        <div class="note">
          <el-alert
            title="如涉及时政、新闻、盗版、低价、色情、封建迷信等内容的组织，将会被封停组织和账号。"
            type="warning"
            show-icon
            :closable="false"
          ></el-alert>
        </div>
        <el-button
          type="primary"
          class="iep-btn-long"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >立即创建</el-button>
      </el-form>
    </create-org-layout>
    <IepDialogMessage ref="IepDialogMessage" :title="`恭喜你成功创建${form.name}`" center>
      <div slot="desc">
        <div class="title-line">
          立即完善信息，赚取更多
          <span class="iep-red">宝贝</span>
        </div>
        <div class="content">
          <span class="iep-red">宝贝</span>
          是节能宝平台中定义资源价值的单位，用户（用户）可以在平台内通过各种方式获得的虚拟奖励。宝贝可以作为支付介质在平台中交换信息与资源，也是用户作为平台虚拟股东的数字凭证。宝贝采用区块链技术进行安全保障与支撑。
        </div>
      </div>
      <el-button slot="button" type="primary" class="iep-btn-submit" @click="handleNext()">确 认</el-button>
    </IepDialogMessage>
  </div>
</template>

<script>
import formMixins from "@/mixins/formMixins";
import { postOrg } from "@/api/admin/org";
import CreateOrgLayout from "./layout";
const initForm = () => {
  return {
    orgId: null,
    // avatar: "//cloud.woneng.net/sys/logo-wn.png",
    avatar:
      // "https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/modular/sys/org_default_avatar.png",
      "https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/wxapp/EnergySaving/icon_energy_default_miniavatar.png",
    name: "",
  };
};
export default {
  mixins: [formMixins],
  components: {
    CreateOrgLayout,
  },
  data() {
    return {
      form: initForm(),
      rules: {
        avatar: [{ required: true, message: "请填写Logo", trigger: "change" }],
        name: [
          { required: true, message: "请输入组织名称!", trigger: "change" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    handleNext() {
      this.$router.push({
        path: "/my/guide_org",
        query: {
          orgId: this.form.orgId,
          orgName: encodeURIComponent(this.form.name),
        },
      });
    },
    async submitForm() {
      if (!this.checked) {
        this.$message("请先勾选《节能宝平台负责人规则》");
        return;
      }
      const { code, data } = await postOrg(this.form);
      if (code === 0) {
        this.$message.success("操作成功");
        this.form = this.$mergeByFirst(initForm(), data);
        this.$refs["IepDialogMessage"].dialogShow = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.avatar {
  height: 185px;
  .avatar-uploader {
    margin: auto;
  }
}
.name {
  width: 70%;
  margin: 0 auto;
  .el-alert {
    padding-left: 0;
    background: #fff;
    color: $--color-text-secondary;
  }
}
.read {
  width: 70%;
  margin: 10px auto 30px;
  text-align: left;
  .link {
    font-weight: 400;
    // color: #e05255;
    color: $--color-primary;
  }
}
.note {
  width: 70%;
  margin: 0 auto;
  .el-alert {
    text-align: left;
    padding-left: 10px;
    background: #fff6f4;
    color: $--color-text-secondary;
    border: 1px solid #f5bcbe;
  }
}
.note ::v-deep .el-alert__icon {
  color: #e05255;
}
.title-line {
  text-align: center;
  font-size: 16px;
  margin-bottom: 25px;
}
.content {
  margin-bottom: 25px;
  padding: 15px;
  line-height: 24px;
  text-align: left;
  background: #fafafa;
  .iep-red {
    font-size: 16px;
  }
}
.el-form-item {
  margin-bottom: 0;
}
</style>
