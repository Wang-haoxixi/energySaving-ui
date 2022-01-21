<template>
  <div class="item">
    <div class="info">
      <div class="img">
        <iep-popover-user-card :user-id="item.userId">
          <iep-img :src="item.avatar" title="点击查看名片" :resizeOpt="{l:50}" :alt="item.realName"></iep-img>
        </iep-popover-user-card>
      </div>
      <div class="item-txt" @click="$openPage(`${$pathPrefix_UserStyle}${item.userId}`)">
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
          <div
            v-if="item.relation.so&&item.relation.so.length"
            :title="`共事于 ${item.relation.so.join('、')}`"
          >共事于 {{item.relation.so.join('、')}}</div>
          <div
            v-if="item.relation.industry"
            :title="`从事 ${item.relation.industry}`"
          >从事 {{item.relation.industry}}</div>
          <div
            v-if="item.relation.school"
            :title="`毕业于 ${item.relation.school}`"
          >毕业于 {{item.relation.school}}</div>
          <div
            v-if="item.relation.hometown"
            :title="`来自 ${item.relation.hometown}`"
          >来自 {{item.relation.hometown}}</div>
          <div
            v-if="item.relation.friend_num"
            :title="`${item.relation.friend_num}位共同好友`"
          >{{item.relation.friend_num}}位共同好友</div>
          <div
            class="tags"
            v-if="item.relation.tag && item.relation.tag.length"
            :title="`共同标签显示：${item.relation.tag.join('、')}`"
          >共同标签显示：{{item.relation.tag.join('、')}}</div>
        </div>
      </div>
    </div>
    <div class="btn">
      <IepFollowBtn :item="item" :loading="loadingFollow" @click="handleFollow(item)"></IepFollowBtn>
    </div>
  </div>
</template>
<script>
import followMixins from "@/mixins/followMixins";
export default {
  name: "IepSmartUserCard",
  props: ["item"],
  mixins: [followMixins],
  methods: {
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
  .info {
    display: flex;
    flex: 1;
  }
}

.item-txt {
  max-width: 130px;
  cursor: pointer;
  .top-txt {
    display: flex;
    align-items: center;
    .tags {
      margin-left: 10px;
      span {
        display: none;
        margin-right: 5px;
        margin-bottom: 3px;
        padding: 0;
        width: 36px;
        height: 20px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        vertical-align: middle;
        border-radius: 5px;
        border: 1px solid $--border-color;
        &:last-child {
          margin-right: 0;
        }
        &:nth-child(-n + 1) {
          display: inline-block;
        }
      }
      .blue2 {
        background: $--sixth-background-color;
        color: #24a5ff;
        border-color: $--sixth-background-color;
      }
      .red {
        background: $--custom-menu-background-color;
        color: $--color-primary;
        border-color: $--custom-menu-background-color;
      }
      .blue {
        background: $--fifth-background-color;
        color: $--color-secondary;
        border-color: $--fifth-background-color;
      }
      .green {
        color: $--color-third;
        background-color: $--secondary-background-color;
        border-color: $--secondary-background-color;
      }
    }
  }
  .from {
    margin-top: 5px;
    font-size: 14px;
    color: $--color-text-secondary;
    margin-right: 5px;
    div {
      display: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    :nth-child(-n + 1) {
      display: block;
    }
  }
}

.name {
  display: inline-block;
  max-width: 60px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.post {
  margin-left: 5px;
  font-size: 12px;
  color: $--color-text-secondary;
}
.txt {
  display: inline-block;
  max-width: 125px;
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: $--color-text-secondary;
  &:hover {
    color: $--color-primary;
  }
}

.img {
  border: 1px solid $--border-color;
  margin-right: 12px;
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: $--border-radius-base;
  overflow: hidden;
}
</style>
