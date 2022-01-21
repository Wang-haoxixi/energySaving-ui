<template>
  <div>
    <iep-no-data v-if="!itemList.length" complex message="暂无推荐好友"></iep-no-data>
    <div class="tab-content" v-else>
      <div
        class="item"
        v-for="(item,index) in itemList"
        :key="index"
        @click="$openPage(`${$pathPrefix_UserStyle}${item.userId}`)"
      >
        <div class="image">
          <iep-img :resizeOpt="{l:80}" :src="item.avatar"></iep-img>
        </div>
        <div class="txt">
          <div class="top-txt">
            <span class="name" :title="item.realName">{{item.realName}}</span>
            <div class="tags">
              <span v-if="item.relation.so" class="blue2">同事</span>
              <span v-if="item.relation.industry" class="red">同行</span>
              <span v-if="item.relation.school" class="green">同校</span>
              <span v-if="item.relation.hometown" class="blue">同乡</span>
            </div>
          </div>
          <div class="from">
            <div v-if="item.relation.so&&item.relation.so.length">共事于 {{item.relation.so.join('、')}}</div>
            <div v-if="item.relation.industry">从事 {{item.relation.industry}}</div>
            <div v-if="item.relation.school">毕业于 {{item.relation.school}}</div>
            <div v-if="item.relation.hometown">来自 {{item.relation.hometown}}</div>
            <div v-if="item.relation.friend_num">{{item.relation.friend_num}}位共同好友</div>
            <div
              class="tags"
              v-if="item.relation.tag && item.relation.tag.length"
            >共同标签显示：{{item.relation.tag.join('、')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecUserList } from "@/api/dms/channel";
export default {
  data() {
    return {
      itemList: [],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getRecUserList();
      this.itemList = data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>
