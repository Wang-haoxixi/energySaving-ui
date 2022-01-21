// 关注通用动作
// 需要 operationMixins
// 需要 IepDialogCreateFriend IepDialogCreateMentor
import { mapGetters, mapActions } from "vuex";
import { PRIVACY_TIP } from "@/const/env";
import { follow } from "@/api/admin/follow";
import { deleteFriend } from "@/api/admin/friend";
import { addBlackList } from "@/api/admin/block";
import { cancelMentor } from '@/api/admin/mentor';
export default {
  data() {
    return {
      loadingFollow: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["imcDelConversationById"]),
    /**
     * 打开个人风采页
     */
    openStyle(item, propId = "userId") {
      if (!PRIVACY_TIP[item.canSee]) {
        this.$openPage(`${this.$pathPrefix_UserStyle}${item[propId]}`);
      } else {
        this.$message.warning(PRIVACY_TIP[item.canSee]);
      }
    },


    handleAddBlackList() {
      const cb = () => {
        this.imcDelConversationById({
          targetId: String(this.form.userId),
          type: 1,
        });
      };
      this._handleComfirmCallBack(
        this.form.userId,
        addBlackList,
        "拉黑",
        "拉黑好友后，你将不再接收到对方的消息且无法看到TA的动态",
        "拉黑成功",
        cb,
      );
    },

    async handleFollow(item, type = 1, idProp = 'userId') {
      this.loadingFollow = true;
      const { data } = await follow({
        userId: this.userInfo.userId,
        followId: item[idProp],
        sign: item.isFollowed, // 0-关注 1-不关注
        type, // 1-用户 2-组织 3-话题
      });
      if (data) {
        this.refresh();
        item.isFollowed = item.isFollowed ? 0 : 1;
      } else {
        this.$message.warning("关注失败");
      }
      this.loadingFollow = false;
    },

    handleCreateMentor() {
      this.$refs["IepDialogCreateMentor"].form = {
        remarks: "",
        masterId: String(this.form.userId),
        characterId: String(this.userInfo.userId),
        userId: this.form.userId,
        avatar: this.form.avatar,
        realName: this.form.realName,
        position: this.form.position,
        company: this.form.company,
      };
      this.$refs["IepDialogCreateMentor"].dialogShow = true;
    },
    handleCancelMentor() {
      this._handleComfirm(this.form.userId, cancelMentor, "取消师徒关系");
    },

    handleCreateFriend() {
      if (this.form.isBlock) {
        if (this.form.isBlock === 1) {
          this.$message("您已把对方添加至黑名单，无法添加好友");
        } else if (this.form.isBlock === 2) {
          this.$message("对方已经将你添加至黑名单，无法添加好友");
        }
        return;
      }
      this.$refs["IepDialogCreateFriend"].form = {
        remarks: "",
        receiveId: String(this.form.userId),
        userId: this.form.userId,
        avatar: this.form.avatar,
        realName: this.form.realName,
        position: this.form.position,
        company: this.form.company,
      };
      this.$refs["IepDialogCreateFriend"].dialogShow = true;
    },
    handleDeleteFriend() {
      this._handleComfirm(this.form.userId, deleteFriend, "删除好友");
    },
  },
};
