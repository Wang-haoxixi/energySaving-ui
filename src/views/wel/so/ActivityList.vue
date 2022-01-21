<template>
  <div class="library">
    <iep-no-data class="no-data" v-if="!dataList.length" complex message="暂无动态"></iep-no-data>
    <IepSoDynamic class="list-item" v-for="(item, index) in dataList" :key="index" :data="item"></IepSoDynamic>
  </div>
</template>

<script>
import { getDetailById } from "@/api/dms/thoughts";
import { mapGetters } from "vuex";

const dealImage = (data, index) => {
  let list = [];
  list = data.slice(index).concat(data.slice(0, index));
  return list;
};

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    nameList: [],
  };
};

export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      dealImage,
      activeIndex: -1,
      form: initFormData(),
      reference: "加载中...",
      thoughtList: [],
      replyMsg: "",
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
    // handleDetail(id) {},
    // 说说详情
    handleForwardDetail(id) {
      this.$router.push(`/thought/thought_detail/${id}`);
    },
    mouseleaveUp() {
      setTimeout(() => {
        this.reference = "加载中...";
      }, 300);
    },
    // 刷新单条数据
    freshComment(id, index) {
      getDetailById(id).then(({ data }) => {
        if (data) {
          data.activeIndex = this.thoughtList[index].activeIndex;
          this.thoughtList[index] = { ...data };
          this.$emit("fresh-right", true);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.library {
  .no-data {
    margin-top: 60px;
  }
}
.image-list ::v-deep .el-image-viewer__close {
  color: #fff;
  &:hover {
    opacity: 0.7;
  }
}
.image-list ::v-deep .el-image-viewer__actions__inner i {
  cursor: pointer;
}
.list-item {
  &:last-of-type {
    border: 0;
  }
  &:first-of-type {
    margin-bottom: 20px;
    padding-top: 0;
  }
}
.list-item ::v-deep .content-list .date {
  margin-top: 10px;
}
</style>

