<template>
  <div class="recruit-body">
    <div class="recruit-detail">
      <!-- 主区域 -->
      <div class="left">
        <DetailTpl ref="left" @changeOrg="changeOrg"></DetailTpl>
      </div>
      <!-- 右侧推荐位 -->
      <div class="right">
        <user-info-tpl class="tpl" :orgId="orgId" v-if="orgId"></user-info-tpl>
        <OthersTpl class="tpl" :orgId="orgId" :recruitId="recruitId" v-if="orgId"></OthersTpl>
        <SimilarTpl class="tpl" :id="recruitId" v-if="recruitId"></SimilarTpl>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserInfoTpl from "../components/userInfo";
import OthersTpl from "../components/othersPartner";
import SimilarTpl from "../components/similarPartner";
import DetailTpl from "./detail";

export default {
  components: {
    UserInfoTpl,
    OthersTpl,
    DetailTpl,
    SimilarTpl,
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      orgId: 0,
      recruitId: 0,
    };
  },
  methods: {
    open(id) {
      this.recruitId = id;
      this.$refs.left.loadData(id);
    },
    changeOrg(id) {
      this.orgId = id;
    },
  },
  mounted() {
    const params = this.$route.params;
    this.open(params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.open(to.params.id);
    next();
  },
};
</script>

<style lang="scss" scoped>
.recruit-body {
  background-color: $--background-color;
  .recruit-detail {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: auto;
    padding: 25px;
    .left {
      width: calc(100% - 320px);
    }
    .right {
      background-color: $--background-color;
      width: 300px;
      border-radius: 10px;
      .tpl {
        margin-bottom: 20px;
        border-radius: 10px;
        border: 0;
      }
    }
  }
}
</style>
