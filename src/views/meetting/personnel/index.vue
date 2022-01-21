<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <iep-table
        :isLoadTable="loading"
        :isPagination="false"
        :columnsMap="columnsListMap"
        :pagedTable="meetTable"
        :dictsMap="dictsMap"
        row-key="id"
        :defaultExpand="true"
        :isExpand="true"
        style="margin-top: 28px;"
      >
        <template #iepTableExpend>
          <div class="recent-join-text">最近参与</div>
          <div class="recent-join-wrap" v-if="enroleUser.length!==0">
            <el-col :span="3" v-for="item in enroleUser" :key="item.id">
              <iep-img :src="item.avatar" :resizeOpt="{l:70}" style="width: 70px;height: 70px"></iep-img>
              <div class="user-name iep-ellipsis">{{ item.realName }}</div>
            </el-col>
          </div>
          <div v-else class="iep-font-color-2" style="font-size: 14px;padding-top: 10px">暂无数据</div>
        </template>
        <template #poster="{scope}">
          <ActivityImgColumn :scope="scope"></ActivityImgColumn>
        </template>
        <template #detail="{scope}">
          <ActivityInfoColumn :scope="scope" isPublish></ActivityInfoColumn>
        </template>
        <template #statusFlag="{scope}">
          <ActivityStatusColumn :scope="scope"></ActivityStatusColumn>
        </template>
        <template #auditStatus="{scope}">
          <ActivityAuditColumn :scope="scope"></ActivityAuditColumn>
        </template>
      </iep-table>
      <list
        :conferenceId="id"
        :conferenceName="conferenceName"
        style="margin-top: 30px"
        :data="data"
        @load-page="loadPage()"
      ></list>
    </iep-basic-container>
  </div>
</template>

<script>
import List from "./List";
import { columnsListMap, dictsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import { getActivityById } from "@/api/meetting/publish";
import { getEnroleUser } from "@/api/meetting/enroll";
import ActivityInfoColumn from "../Components/ActivityInfoColumn";
import ActivityImgColumn from "../Components/ActivityImgColumn";
import ActivityStatusColumn from "../Components/ActivityStatusColumn";
import ActivityAuditColumn from "../Components/ActivityAuditColumn";

export default {
  mixins: [operationMixins],
  components: {
    List,
    ActivityInfoColumn,
    ActivityImgColumn,
    ActivityStatusColumn,
    ActivityAuditColumn,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsListMap,
      dictsMap,
      loading: true,
      meetTable: [],
      enroleUser: [],
      data: {},
    };
  },
  computed: {
    id() {
      return +this.$route.params.id || 0;
    },
    conferenceName() {
      return this.$route.query.conferenceName || "";
    },
  },
  methods: {
    async loadPage() {
      const { data } = await getActivityById(this.id);
      this.data = data;
      const enroleUser = await getEnroleUser({
        size: 8,
        conferenceId: this.id,
      });
      this.meetTable = [data];
      this.enroleUser = enroleUser.data;
      this.loading = false;
    },
  },
  mounted() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.recent-join-wrap {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
}
.recent-join-wrap ::v-deep el-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.recent-join-text {
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.user-name {
  max-width: 70px;
  text-align: center;
}
</style>
