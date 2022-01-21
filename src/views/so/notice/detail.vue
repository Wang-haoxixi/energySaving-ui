<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="form.name" :backOption="backOption"></iep-page-header>
      <div class="info">
        <iep-img class="avatar" :resizeOpt="{l:40}" :src="form.senderAvatar"></iep-img>
        <div class="name">{{form.senderName}}</div>
        <div class="time">{{form.time}}</div>
        <div class="browse">{{form.browse}}人浏览</div>
      </div>
      <div class="content">
        <pre>{{form.content}}</pre>
      </div>
      <el-divider></el-divider>
      <div class="operate">
        <el-link
          type="primary"
          v-if="form.previousId"
          @click="$openPage(`/spa/notice/${form.previousId}`)"
        >
          <i class="el-icon-woneng-arrowleft"></i>上一篇
        </el-link>
        <span style="font-size:14px;color:$--color-input-regular;" v-else>已无更新的通知</span>
        <el-button @click="$openPage('/spa/notice_member')" round>全部组织通知</el-button>
        <el-link type="primary" v-if="form.nextId" @click="$openPage(`/spa/notice/${form.nextId}`)">
          下一篇
          <i class="el-icon-woneng-arrowright"></i>
        </el-link>
        <span style="font-size:14px;color:$--color-input-regular;" v-else>已无更早的通知</span>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import { getMessageById } from "@/api/ims/message";
class NoticeDTO {
  type = "";
  senderId = 0; // 发布人ID
  senderName = ""; // 发布人姓名
  senderAvatar = ""; // 发布人头像
  receiverId = 0;
  isDeal = true;
  dataId = 0;
  previousId = 0;
  nextId = 0;
  browse = 0; // 浏览量
  id = 0;
  name = ""; // 标题
  content = ""; // 内容
  time = ""; // 时间
}
export default {
  beforeRouteEnter(to, from, next) {
    if (from.path.startsWith("/spa/notice")) {
      next((vm) => {
        vm.backUrl = vm.backUrl ?? "/";
      });
    } else {
      next((vm) => {
        vm.backUrl = from.path;
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.loadPage(to.params.id);
    next();
  },
  data() {
    return {
      backUrl: "/",
      backOption: {
        isBack: true,
        backFunction: this.backFunction,
      },
      form: new NoticeDTO(),
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(id = this.$route.params.id) {
      const { data } = await getMessageById(id);
      this.form = this.$mergeByFirst(new NoticeDTO(), data);
    },
    backFunction() {
      this.$openPage(this.backUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid $--border-color;
  .avatar {
    width: 40px;
    height: 40px;
  }
  & > div {
    margin-left: 10px;
    font-size: 14px;
  }
  .time,
  .browse {
    margin-left: 30px;
    color: $--color-text-secondary;
  }
}
.content {
  margin: 30px 0;
  font-size: 14px;
  line-height: 28px;
}
.operate {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  .el-button {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -84px;
    padding: 12px 45px;
    width: 168px;
  }
  .el-icon-woneng-arrowleft {
    margin-right: 5px;
  }
  .el-icon-woneng-arrowright {
    margin-left: 5px;
  }
}
.operate ::v-deep .el-link {
  &:hover {
    text-decoration: none;
    &::after {
      display: none;
    }
  }
}
.info ::v-deep .el-avatar {
  width: 30px;
  height: 30px;
}
.operate ::v-deep .el-link--inner {
  display: flex;
  align-items: center;
  i {
    font-size: 13px;
  }
}
</style>
