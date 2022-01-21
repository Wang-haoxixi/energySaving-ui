<template>
  <div class="collaboration-wrap">
    <TitleWrap class="content-wrap" name="深度合作" justify="center">
      <OrgCard v-for="o of orgList" :key="o.orgId" :org="o"></OrgCard>
    </TitleWrap>
  </div>
</template>
<script>
import TitleWrap from "./TitleWrap";
import OrgCard from "./OrgCard";
import { getDeepCooperationt } from "@/api/meetting/publish";
export default {
  name: "DeepCollaboration",
  components: {
    TitleWrap,
    OrgCard,
  },
  data() {
    return {
      orgList: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getDeepCooperationt();
      this.orgList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.collaboration-wrap {
  background: url("/img/banner/bg-hz.jpg");
  background-size: cover;
  .content-wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
  }
}
</style>
