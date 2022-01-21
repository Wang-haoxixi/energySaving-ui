<template>
  <iep-dialog
    title="邀请用户"
    :dialogShow="dialogShow"
    @close="_close()"
    width="600px"
    @mounted="load()"
  >
    <template v-if="!confirm">
      <el-alert class="info" type="info" show-icon>
        请选择您邀请加入
        <span>{{form.orgName}}</span>的新成员
      </el-alert>
      <el-form ref="form" :model="form" label-width="50px">
        <iep-form-item label-name="用户">
          <IepContactsInput v-model="form.users" :limitUserIds="limitUserIds" onlyFriend></IepContactsInput>
        </iep-form-item>
      </el-form>
      <div v-if="suggestList.length" class="suggest-list" v-show="showRecommand">
        <div class="suggest-head">
          <h5>推荐邀请</h5>
          <!-- <div class="change">
            <i class="el-icon-woneng-shuaxin"></i>换一批
          </div>-->
        </div>
        <div
          class="suggest-down"
          v-loading="loadSuggest"
          v-for="(user, index) in suggestList"
          :key="index"
        >
          <div class="img">
            <iep-popover-user-card :user-id="user.userId">
              <iep-img :src="user.avatar" :resizeOpt="{l:80}"></iep-img>
            </iep-popover-user-card>
          </div>
          <div class="right-txt">
            <div class="txt">
              <div class="name">
                <div class="name-left">
                  <span :title="user.realName">{{user.realName}}</span>
                  <div class="name-info">
                    <span
                      v-if="form.householdRegister"
                      :title="user.householdRegister | firstAddress"
                    >{{user.householdRegister}}</span>
                    <el-divider v-if="user.householdRegister&&user.position" direction="vertical"></el-divider>
                    <span
                      v-if="form.position"
                      :title="user.position"
                    >{{user.position | lastPosition}}</span>
                  </div>
                </div>
              </div>
              <span class="company" :title="user.company">{{user.company}}</span>
              <div class="tags-box">
                <div class="custom-tags">
                  <el-tag
                    type="info"
                    size="mini"
                    v-for="(tag) in user.abilityTag"
                    :key="tag"
                  >{{tag}}</el-tag>
                </div>
                <el-button class="more-tags" size="mini" type="info" icon="el-icon-more" plain></el-button>
              </div>
            </div>
            <el-link
              :underline="false"
              type="primary"
              @click="handleAdd(user)"
              :disabled="selectUserIds.includes(user.userId)"
            >选择</el-link>
          </div>
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" :disabled="!form.users.length" @click="_ok()">确定</el-button>
        <el-button @click="_close()">取消</el-button>
      </template>
    </template>
    <template v-else>
      <div class="inviteInfo">您将邀请{{usersName}}加入{{form.orgName}}，是否确认发起邀请？</div>
      <template slot="footer">
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="_close()">取消</el-button>
      </template>
    </template>
  </iep-dialog>
</template>
<script>
import {
  inviteSoUsersBatch,
  orgUserExistList,
  getRecommandMember,
} from "@/api/admin/org";
class InviteSoUserDTO {
  orgName = "";
  orgId = 0;
  users = [];
}
const toResponseObject = (form) => {
  const userIds = form.users.map((m) => m.id);
  return {
    orgId: form.orgId,
    userIds,
  };
};
export default {
  name: "IepDialogInviteSoUser",
  data() {
    return {
      loadSuggest: false,
      showRecommand: true,
      confirm: false,
      dialogShow: false,
      limitUserIds: [],
      form: new InviteSoUserDTO(),
      suggestList: [],
    };
  },
  computed: {
    usersName() {
      return this.form.users.map((m) => m.name).join("、");
    },
    selectUserIds() {
      return this.form.users.map((m) => m.id);
    },
  },
  methods: {
    async loadMember() {
      this.loadSuggest = true;
      const { data } = await getRecommandMember(this.form.orgId);
      this.suggestList = data || [];
      this.loadSuggest = false;
    },
    async loadExist() {
      const { data } = await orgUserExistList(this.form.orgId);
      this.limitUserIds = data;
    },
    async load() {
      this.loadExist();
      this.loadMember();
      this.showRecommand = true;
    },
    handleAdd(user) {
      this.form.users.push({
        id: user.userId,
        name: user.realName,
      });
      this.suggestList = this.suggestList.filter(
        (m) => m.userId !== user.userId,
      );
    },
    _ok() {
      this.confirm = true;
    },
    _close() {
      this.dialogShow = false;
      this.confirm = false;
    },
    close() {
      this.form = new InviteSoUserDTO();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await inviteSoUsersBatch(toResponseObject(this.form));
      if (data) {
        this.$message.success("操作成功");
      }
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.suggest-list {
  margin-bottom: 15px;
  padding-bottom: 20px;
  .suggest-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    h5 {
      margin-bottom: 0;
      font-size: 15px;
    }
    i {
      font-size: 12px;
      color: $--color-text-regular;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .change {
      cursor: pointer;
      transition: 0.3s;
      i {
        margin-right: 5px;
      }
      &:hover {
        color: $--color-primary;
        i {
          color: $--color-primary;
        }
      }
    }
  }
  .suggest-down {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid $--border-color;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    .img {
      margin-right: 10px;
      width: 80px;
      min-width: 80px;
      height: 80px;
      border-radius: 10px;
      border: 1px solid $--border-color;
      box-sizing: border-box;
    }
    .txt {
      flex: 1;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .name-left {
          display: flex;
          align-items: center;
          & > span {
            display: inline-block;
            margin-right: 25px;
            max-width: 120px;
            font-size: 16px;
            font-family: "微软雅黑";
            color: $--color-text-primary;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .name-info {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            max-width: 120px;
            color: $--color-text-secondary;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .info {
        color: $--color-text-secondary;

        background: $--background-color;
        border-radius: 5px;
      }
      .company {
        display: block;
        margin-bottom: 8px;
        max-width: 360px;
        color: $--color-text-secondary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .tags-box {
    display: flex;
    justify-content: flex-start;
    .more-tags {
      margin-left: 10px;
      width: 24px;
      flex: 0 0 24px;
      height: 24px;
      line-height: 22px;
    }
  }
  .custom-tags {
    display: inline-flex;
    margin-right: -10px;
    max-width: 350px;
    height: 24px;
    overflow: hidden;
    .el-tag {
      margin-right: 10px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }
  }
}
.right-txt {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
.suggest-list ::v-deep .iep-image,
.suggest-list ::v-deep img {
  border-radius: 10px;
  box-sizing: border-box;
}
.info {
  margin-bottom: 30px;
  border-radius: 5px;
}
.info::v-deep .el-alert__description {
  margin: 0;
}
.info::v-deep .el-alert__icon.is-big {
  width: 16px;
  font-size: 16px;
}
.info::v-deep span {
  color: $--color-primary;
}
.inviteInfo {
  height: 50px;
}
</style>
