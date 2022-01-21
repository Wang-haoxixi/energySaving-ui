<template>
  <el-container>
    <div
      v-show="!isFixedClose"
      class="fixed-aside"
      @mouseover="selectStyle()"
      @mouseout="outStyle()"
    >
      <el-button
        class="close-btn"
        v-show="showCloseIcon"
        type="text"
        icon="el-icon-close"
        title="关闭"
        @click="handleClose()"
      ></el-button>
      <FixedCode></FixedCode>
      <FixedBtn></FixedBtn>
    </div>
    <slot></slot>
    <DialogWelcome></DialogWelcome>
    <DialogNotice></DialogNotice>
    <DialogReport></DialogReport>
  </el-container>
</template>
<script>
import { SET_FIXED_CLOSE } from "@/store/modules/common/mutation-types";
import FixedBtn from "./Components/FixedBtn";
import FixedCode from "./Components/FixedCode";
import DialogWelcome from "@/layouts/Components/Dialog/Welcome.vue";
import DialogNotice from "@/layouts/Components/Dialog/Notice.vue";
import DialogReport from "@/layouts/Components/Dialog/Report.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    FixedBtn,
    FixedCode,
    DialogWelcome,
    DialogNotice,
    DialogReport,
  },
  data() {
    return {
      showCloseIcon: false,
    };
  },
  computed: {
    ...mapState({
      isFixedClose: state => state.common.isFixedClose,
    }),
  },
  methods: {
    ...mapMutations({
      setFixedClose: SET_FIXED_CLOSE,
    }),
    handleClose() {
      this.setFixedClose(true);
    },
    selectStyle() {
      this.showCloseIcon = true;
    },
    outStyle() {
      this.showCloseIcon = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.fixed-aside {
  right: 15px;
  bottom: 300px;
  position: fixed;
  z-index: 1001;
  .close-btn {
    position: absolute;
    top: -7px;
    right: -7px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    border: 1px solid $--border-color;
    color: #fff;
    padding: 0;
  }
}
</style>
