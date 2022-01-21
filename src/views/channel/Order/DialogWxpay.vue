<template>
  <iep-dialog
    title="微信扫码支付"
    :dialogShow="dialogShow"
    @close="_close()"
    width="640px"
    @mounted="load()"
  >
    <div class="content">
      <div class="left-box">
        <div class="title">
          <div>
            请使用
            <strong>微信</strong>
            <i class="el-icon-woneng-erweimasaomiao"></i>
            <strong>扫一扫</strong>
          </div>
          <div>扫描二维码支付</div>
        </div>
        <div class="img">
          <img :src="imgUrl" />
          <div class="say">
            <i class="el-icon-woneng-tixing2"></i>
            {{tip}}
          </div>
        </div>
      </div>
      <div class="right-box">
        <img src="/img/proxy/saoyisao.png" />
      </div>
    </div>
  </iep-dialog>
</template>
<script>
import { getWxOrderQRcode, getWxSearch } from "@/api/fms/order";
const tip = "有效时长为2小时，请尽快支付";
export default {
  data() {
    return {
      tip,
      dialogShow: false,
      orderNumber: "",
      imgUrl: "",
    };
  },
  destroyed() {
    clearInterval(this._count);
  },
  methods: {
    async load() {
      const { data } = await getWxOrderQRcode(this.orderNumber);
      this.imgUrl = data.qrCode;
      this._count = setInterval(() => {
        this.handlePolling();
      }, 5000);
    },
    async handlePolling() {
      const { data } = await getWxSearch(this.orderNumber);
      if (data) {
        clearInterval(this._count);
        this.tip = "支付成功，即将跳转";
        setTimeout(() => {
          // this.$openPage(`/channel/order/${this.orderNumber}/result`);
          this.$router.replace({
            path: `/channel/order/${this.orderNumber}/result`,
          });
          this.$message({
            type: "success",
            message: "您已成功购买，售后问题请联系客服",
          });
        }, 1000);
      }
    },
    _close() {
      this.tip = tip;
      clearInterval(this._count);
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: flex-start;
}
.left-box,
.right-box {
  width: 50%;
  height: 334px;
}
.right-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/img/proxy/weixinbg.png");
  background-size: cover;
  img {
    padding: 50px;
    width: 90%;
    box-sizing: border-box;
  }
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  i {
    margin: 0 3px;
    font-size: 18px;
    line-height: 22px;
  }
  strong {
    margin: 0 5px;
    font-weight: 400;
    color: $--color-primary;
  }
}
.img {
  position: relative;
  margin: 0 auto;
  padding: 30px;
  width: 240px;
  height: 256px;
  border: 1px solid $--border-color;
  box-sizing: border-box;
  text-align: center;
  img {
    width: 100%;
    box-sizing: border-box;
  }
  .say {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: #f7f7f7;
    color: $--color-primary;
  }
}
</style>
