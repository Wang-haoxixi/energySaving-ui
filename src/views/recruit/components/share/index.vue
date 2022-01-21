<template>
  <iep-dialog :dialog-show="dialogShow" title="微信扫码分享" width="300px" @close="resetForm">
    <iep-img :src="shareUrl" class="img"></iep-img>
    <div class="title">微信扫上方二维码</div>
    <div class="sub-title">将本职位分享至朋友圈</div>
    <iep-button @click="resetForm" class="button">取消</iep-button>
  </iep-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getAppletsQRCode } from "@/api/admin/social";

export default {
  components: {},
  data() {
    return {
      dialogShow: false,
      shareUrl: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open(row = {}) {
      this.dialogShow = true;
      getAppletsQRCode(row.recruitId, "recruit").then(({ data }) => {
        this.shareUrl = data;
      });
    },
    resetForm() {
      this.shareUrl = "";
      this.dialogShow = false;
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.img {
  width: 125px;
  height: 125px;
  margin: auto;
  margin-bottom: 20px;
}
.title,
.sub-title {
  color: $--color-text-secondary;
  text-align: center;
  margin-bottom: 10px;
}
.button {
  margin: auto;
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  color: $--color-primary;
  border-color: $--color-primary;
}
</style>
