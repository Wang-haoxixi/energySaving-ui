<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`${methodName}`"
    width="500px"
    @close="_close()"
    @mounted="load()"
  >
    <div class="l-wrap">
      <div class="l-item" v-for="item in userList" :title="item.realName" :key="item.userId">
        <iep-popover-user-card :user-id="item.userId">
          <iep-img class="avatar" :src="item.avatar"></iep-img>
        </iep-popover-user-card>
        <div class="name iep-ellipsis-2-flex">{{item.realName}}</div>
      </div>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  props: ["examId", "certId"],
  data() {
    return {
      methodName: "更多人员",
      dialogShow: false,
      reqFunction: () => {},
      userList: [],
    };
  },
  methods: {
    async load() {
      const { data } = await this.reqFunction(this.examId, this.certId);
      this.userList = data.records;
    },
    _close() {
      this.userList = [];
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.l-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  .l-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 20px;
    .avatar {
      width: 50px;
      height: 50px;
      border: 1px solid $--border-color;
    }
    .name {
      margin-top: 5px;
      height: 40px;
    }
  }
}
</style>
