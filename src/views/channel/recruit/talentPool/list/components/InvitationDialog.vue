<template>
  <iep-dialog :dialog-show="dialogVisible" title="请选择职位" width="350px" center @close="close">
    <div class="invitation-content">
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li
          v-for="i in list"
          class="infinite-list-item"
          :key="i.recruitId"
          @click="handleChoose(i)"
        >{{ transformString(i.name) }}</li>
      </ul>
    </div>
  </iep-dialog>
</template>

<script>
import { getRecruitPageByOrgId } from "@/api/dms/recruit";
import { sendInvitation } from "@/api/ims/rong";
import { transformString } from "@/util/dataDeal";
import { postMsgCustomInitiate } from "@/api/ims/rong";
import { ifUserLinkUp } from "@/api/dms/recruit_linkup";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["orgId"],
  data() {
    return {
      dialogVisible: false,
      current: 1,
      isLoad: true,
      list: [],
      userData: {},
      type: "invitation",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId"]),
    transformString,
    open(row, type = "invitation") {
      this.userData = { ...row };
      this.type = type;
      this.loadPage();
    },
    close() {
      this.dialogVisible = false;
      this.list = [];
      this.isLoad = false;
      this.current = 1;
    },
    load() {
      if (this.isLoad) {
        this.loadPage();
      }
    },
    loadPage() {
      getRecruitPageByOrgId({
        current: this.current,
        size: 10,
        orgId: this.orgId,
        state: 0,
      }).then(({ data }) => {
        const { total, records } = data;
        this.list = this.list.concat(records);
        if (total === 0) {
          this.$message.warning("该组织下暂无在招职位");
          this.close();
        } else {
          this.dialogVisible = true;
          if (this.list.length === total) {
            this.isLoad = false;
          } else {
            this.current += 1;
          }
        }
      });
    },
    sendInvitation(row) {
      sendInvitation({
        dataId: row.recruitId,
        targetId: this.userData.userId,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("已发送邀请信息");
          this.close();
        }
      });
    },
    async sendMsg(row) {
      if (this.userData.userId === this.userInfo.userId) {
        this.$message.warning("无法和自己进行直聊！");
      } else {
        this.imcOpenConversionByTargetId({
          targetId: this.userData.userId + "",
          type: 1,
        });
        const params1 = {
          targetId: this.userData.userId,
          recruitId: row.recruitId,
        };
        const { data } = await ifUserLinkUp(params1);
        if (!data) {
          const params2 = {
            dataId: row.recruitId,
            targetId: this.userData.userId,
            beforePage: 0,
          };
          await postMsgCustomInitiate(params2);
        }
      }
      this.close();
    },
    handleChoose(row) {
      switch (this.type) {
        case "invitation":
          this.sendInvitation(row);
          break;
        case "msg":
          this.sendMsg(row);
          break;
        default:
          this.$message.warning("无效操作");
          break;
      }
    },
    handleSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.invitation-content {
  height: 300px;
  .infinite-list-item {
    font-size: 14px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
}
</style>
