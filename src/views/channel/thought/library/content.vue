<template>
  <div class="content-tpl">
    <div class="content">
      <span v-for="(item, index) in subjectList" :key="index">
        <span v-if="item.type" class="subject" @click="handleSubject(item)">{{item.html}}</span>
        <span v-else v-for="(t, i) in transfPerson(item.html)" :key="i">
          <span class="person" v-if="t.type" @click="handlePerson(t)">{{t.html}}</span>
          <span v-else v-html="httpToLink(t.html)"></span>
        </span>
      </span>
      <!-- <span v-for="(item, index) in transfSubject(data.content)" :key="index" :class="item.type ? 'subject' : ''" v-html="item.html"></span> -->
    </div>
    <!-- 关联元素 -->
    <Attach :data="data"></Attach>
    <slot></slot>
    <div class="tags-list" v-if="data.tags && data.tags.length > 0">
      <el-tag
        class="tag"
        v-for="(item, index) in data.tags"
        :key="index"
        type="info"
        size="mini"
      >{{item}}</el-tag>
    </div>
    <div class="image-list" v-if="data.images.length > 0" @click.stop="()=>{}">
      <iep-img
        :src="item"
        v-for="(item, index) in data.images"
        :key="index"
        class="img"
        :preview-src-list="dealImage(data.images, index)"
        fit="cover"
      ></iep-img>
    </div>
  </div>
</template>

<script>
import Attach from "./Attach";
import { transfSubjectList, transfPerson, dealImage } from "./util";
import { httpToLink } from "@/util/util";
export default {
  components: {
    Attach,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      httpToLink,
      dealImage,
      transfPerson,
    };
  },
  computed: {
    subjectList() {
      return transfSubjectList(this.data.content);
    },
  },
  methods: {
    // 查看人物详情
    handlePerson() {
      // 首先匹配返回的数据中是否存在此人名，即此人名是否为真实人名
      // for (let item of this.data.mentionedUsers) {
      //   if (`@${item.name} ` === val.html) {
      //     this.$router.push(`/app/personal_style/${item.id}`);
      //     return;
      //   }
      // }
      // this.$message.error("抱歉，没有找到此用户");
    },
    handleSubject(val) {
      // 首先匹配返回的数据中是否存在此话题，即是否为历史未关联的话题
      for (const item of this.data.topics) {
        if (`#${item.topic}#` === val.html) {
          this.$router.push({
            path: "/thought/subject_list",
            query: { title: item.topic, id: item.topicId },
          });
          return;
        }
      }
      this.$message.error("抱歉，此话题未关联其他说说");
    },
  },
};
</script>

<style lang="scss" scoped>
.content-tpl {
  .content {
    // width: 765px;
    // width: 1200px;
    max-width: 100%;
    font-size: 14px;
    word-wrap: break-word;
    color: #666769;
    span {
      white-space: pre-wrap;
      font-size: 14px;
      word-wrap: break-word;
      max-width: 600px;
      // width: 100%;
    }
    .subject {
      margin-right: 5px;
      color: #f74437;
      cursor: pointer;
    }
    .person {
      color: #f74437;
      cursor: pointer;
    }
  }
  .image-list {
    margin: 20px -10px 0 0;
    display: flex;
    flex-wrap: wrap;
    .img {
      margin: 0 10px 10px 0;
      width: 140px;
      height: 140px;
      border: 1px solid $--border-color;
    }
  }
  .tags-list {
    margin-top: 5px;
    .tag {
      margin: 10px 10px 0 0;
      padding: 0 7px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
<style lang="scss" scoped>
.image-list ::v-deep img {
  min-height: 140px;
}
.img ::v-deep .el-image-viewer__close {
  color: #fff;
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
</style>
