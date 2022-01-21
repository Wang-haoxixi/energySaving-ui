<template>
  <iep-basic-container>
    <iep-page-header title="合伙人详情" :backOption="backOption"></iep-page-header>

    <el-form :model="formData" ref="form" label-width="135px" class="detail-form">
      <iep-form-item
        :label-name="item.name"
        v-for="(item, index) in detailOptions"
        :key="index"
        v-show="!item.isHidden"
      >
        <div class="detail-span">{{formData[item.value]}}</div>
      </iep-form-item>
      <iep-form-item
        :label-name="formData.type === 'user' ? '技能证书' : '营业执照'"
        v-if="formData.annexes && formData.annexes.length > 0"
      >
        <div class="img-list">
          <div v-for="(item, index) in formData.annexes" :key="index" class="avatar">
            <iep-img :src="item.attachFile"></iep-img>
          </div>
        </div>
      </iep-form-item>
    </el-form>
  </iep-basic-container>
</template>
<script>
import { getPartnerDetailById } from "@/api/dms/million";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"]),
    detailOptions() {
      return [
        {
          name: "合伙人类型",
          value: "partnersType",
        },
        {
          name: "合伙人主体",
          value: "type",
        },
        {
          name: this.formData.type === "user" ? "个人" : "组织",
          value: "orgName",
        },
        {
          name: "联系人",
          value: "name",
          isHidden: this.formData.type === "user",
        },
        {
          name: "联系方式",
          value: "mobile",
        },
        {
          name: "所属行业",
          value: "industry",
        },
        {
          name: "所属地区",
          value: "city",
        },
        {
          name: "能力优势",
          value: "ability",
        },
        {
          name: "具体描述",
          value: "describe",
        },
      ];
    },
  },
  data() {
    return {
      formData: {
        annexes: [],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1);
        },
      },
    };
  },
  methods: {
    loadDetail(id) {
      getPartnerDetailById(id).then(({ data }) => {
        this.formData = { ...data };
      });
    },
  },
  created() {
    const params = this.$route.params;
    if (params.id) {
      this.loadDetail(params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.detail-form {
  &::v-deep .el-form-item {
    margin-bottom: 0;
  }
  .img-list {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin-bottom: 20px;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      position: relative;
      margin-right: 20px;
      border: 1px solid $--border-color;
      border-radius: 10px;
    }
  }
}
</style>