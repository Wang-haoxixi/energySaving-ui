<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" @close="_close()" v-loading="loading">
    <div class="sign-item" v-for="item of data" :key="item.orderNo">
      <span>签到编号：{{item.orderNo}}</span>
      <span
        :style="{color:(item.writeOffStatus==='0'?'#3cd489':'#f74437')}"
      >{{item.writeOffStatus==="0"?"有效":"已核销"}}</span>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  name: "DialogCode",
  data() {
    return {
      dialogShow: false,
      loading: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "签到码",
    },
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    // close() {
    //   this._close();
    //   this.$emit("load-page");
    // },
  },
};
</script>
<style lang="scss" scoped>
.sign-item {
  margin: 12px 15px;
  display: flex;
  justify-content: space-between;
}
</style>