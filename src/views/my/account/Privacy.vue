<template>
  <div>
    <iep-basic-container style="border:0">
      <div class="info-title">{{$route.name}}</div>
      <div class="desc">默认添加好友以后，才可查看本人所有信息，及联系本人</div>
      <div class="form-wrapper">
        <div class="item-vertical">
          <div>
            在个人名片、风采页和通讯录公开我的联系方式
            <iep-tip content="联系方式包括手机、微信、QQ、邮箱"></iep-tip>
          </div>
          <IepRadioGroup
            v-model="form.isPrivacy"
            :dictList="privacyList"
            @change="handleChangePrivacy('privacy', $event)"
          ></IepRadioGroup>
        </div>
        <div class="item-horizontal">
          <div>加我好友需要验证</div>
          <el-switch v-model="value" active-color="#13ce66" :disabled="true"></el-switch>
        </div>
        <div class="item-horizontal">
          <div>
            是否开启举荐通道
            <iep-tip content="开启后您的个人风采页可能会被推荐给企业"></iep-tip>
          </div>
          <el-switch
            v-model="form.isRecommend"
            active-color="#13ce66"
            @change="handleChangePrivacy('isRecommend', $event)"
          ></el-switch>
        </div>
        <div class="item-vertical">
          <div>谁可以查看我的个人风采页详情</div>
          <IepRadioGroup v-model="form.style" :dictList="styleList" @change="handleChangeStyle"></IepRadioGroup>
        </div>
        <div class="item-vertical">
          <div>谁可以给我发送消息</div>
          <el-radio-group v-model="radio2" :disabled="true">
            <el-radio :label="1">所有人</el-radio>
            <el-radio :label="2">好友和组织成员</el-radio>
            <el-radio :label="3">仅好友</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="info-title">黑名单管理</div>
      <div class="desc">拉黑后你将无法接收到对方的任何动态、包括聊天、说说及专栏文章</div>
      <black-list-manage></black-list-manage>
    </iep-basic-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { setUserPrivacy, setUserPrivacyStyle } from "@/api/admin/user";
import { UserEntity } from "@/types/user";
import BlackListManage from "./components/BlackListManage";
export default {
  components: {
    BlackListManage,
  },
  data() {
    return {
      form: new UserEntity(),
      value: false,
      privacyList: [
        {
          label: "所有人",
          value: "1",
        },
        {
          label: "好友",
          value: "2",
        },
        {
          label: "不公开",
          value: "3",
        },
      ],
      styleList: [
        {
          label: "所有人",
          value: 1,
        },
        {
          label: "好友",
          value: 2,
        },
        {
          label: "不公开",
          value: 3,
        },
      ],
      radio1: 1,
      radio2: 1,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.userGetInfo();
      this.form = this.$mergeByFirst(new UserEntity(), this.userInfo);
    },
    ...mapActions(["userGetInfo"]),
    async handleChangeStyle(value) {
      const { data } = await setUserPrivacyStyle(value);
      if (data) {
        this.loadData();
      }
    },
    async handleChangePrivacy(prop = "privacy", value) {
      const { data } = await setUserPrivacy({
        [prop]: value,
      });
      if (data) {
        this.loadData();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.form-wrapper {
  margin: 20px 0;
  width: 70%;
  > div {
    margin: 20px 0;
  }
  .item-horizontal {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 14px;
  }
  .item-vertical {
    font-size: 14px;
  }
}
.item-vertical ::v-deep .el-radio-group {
  margin-top: 10px;
}
</style>
