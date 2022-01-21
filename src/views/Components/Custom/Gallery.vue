<template>
  <div>
    <el-button type="primary" plain @click="handleClick">
      <i class="el-icon-woneng-tupian"></i>
      海报图库
    </el-button>
    <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="940px" @close="_close()">
      <div class="gallery-wrap" v-loading="loading">
        <iep-img
          v-for="item of imgList"
          class="img"
          :key="item.id"
          :src="item.posterUrl"
          :resizeOpt="{l:300}"
          :title="item.title"
          @click.native="choose(item.posterUrl)"
        ></iep-img>
      </div>
    </iep-dialog>
  </div>
</template>
<script>
import { getPoster } from "@/api/meetting/publish";

export default {
  name: "IepGallery",
  props: {
    value: {
      required: true,
      validator: prop => typeof prop === "string" || prop === null,
    },
  },
  data() {
    return {
      dialogShow: false,
      dialogTitle: "海报图库",
      imgList: [],
      loading: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleChoose(v) {
      this.$emit("input", v);
    },
    choose(v) {
      this.handleChoose(v);
      this._close();
    },
    handleClick() {
      this.dialogShow = true;
    },
    async loadPage() {
      this.loading = true;
      const { data } = await getPoster();
      if (data) this.imgList = data;
      this.loading = false;
    },
  },
  created() {
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.gallery-wrap {
  min-height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.img {
  cursor: pointer;
}
</style>