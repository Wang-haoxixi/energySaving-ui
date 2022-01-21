<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <div class="wraper">
        <div>
          <div class="top-info">
            <div class="title">
              <span class="head-title">浙江省大数据局</span> |
              <span class="name">周明</span>
              <span class="tags">{{tags.join(" 、 ")}}</span>
            </div>
            <div class="item">
              <span class="item-apt">主题：{{form.theme}}</span>
            </div>
            <div class="item">
              <span class="item-opt">日期：{{form.followTime}}</span>
              <span class="item-opt">下次跟进时间：{{form.nextTime}}</span>
            </div>
            <div class="item">
              <span class="item-opt">跟进方式：{{form.followWay}}</span>
              <span class="item-opt">跟进状态：{{form.followStatus}}</span>
            </div>
            <div class="item">
              <span class="item-apt">内容：{{form.content}}</span>
            </div>
            <div class="item">
              <span class="item-apt">附件：{{"暂无"}}</span>
            </div>
            <div class="item">
              <span class="item-apt">转发：{{"暂无"}}</span>
            </div>
          </div>
          <iep-table
            :isLoadTable="isLoadTable"
            :pagination="pagination"
            :isPagination="isPagination"
            :columnsMap="columnsMap"
            :pagedTable="pagedTable"
          ></iep-table>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { columnsMeetingMap } from "./options.ts";
import { getPageById } from "@/api/dms/custom_follow.ts";
export default {
  mixins: [mixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      columnsMap: columnsMeetingMap,
      isPagination: false,
      isLoadTable: false,
      pagedTable: [],
      form: {},
      tags: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    load() {
      getPageById(this.id).then(res => {
        this.form = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wraper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.top-info {
  margin-bottom: 30px;
  padding: 0 8px;
  .title {
    padding: 20px 0;
    margin-bottom: 20px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    border-bottom: 1px solid $--border-color;
    .head-title {
      margin-right: 10px;
    }
    .name {
      margin-left: 10px;
      margin-right: 10px;
    }
    .tags {
      font-size: 16px;
      color: $--color-text-regular;
    }
  }
  .item {
    padding: 0 15px;
    display: flex;
    margin-bottom: 15px;
    span {
      width: 50%;
      font-size: 14px;
      color: $--color-text-regular;
    }
    .item-apt {
      width: 100%;
    }
  }
}
</style>