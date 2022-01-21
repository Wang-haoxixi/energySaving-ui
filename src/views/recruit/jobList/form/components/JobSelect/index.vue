<template>
  <div class="job-selct">
    <el-input
      ref="input"
      v-model="inputValue"
      @click.native="focus"
      @input="inputChange"
      maxlength="20"
    ></el-input>
    <el-cascader
      class="cascader"
      v-model="cValue"
      ref="cascader"
      :options="positionTree"
      :props="props"
      separator="-"
      :show-all-levels="false"
      filterable
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getPageBySon } from "@/api/dms/position";
import { transformString } from "@/util/dataDeal";
export default {
  name: "IepCascaderPosition",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      props: {
        label: "name",
        value: "name",
      },
    };
  },
  computed: {
    ...mapGetters(["positionTree"]),
    cValue: {
      get: function() {
        return this.value.split("-");
      },
      set: function(value) {
        this.v = value.join("-");
      },
    },
    v: {
      get: function() {
        return this.value + "";
      },
      set: function(value) {
        this.$emit("input", value);
        this.$emit("getIntroduction", "");
      },
    },
    inputValue: {
      get: function() {
        return transformString(this.v);
      },
      set: function(value) {
        value = value.replace(/[^\w\u4E00-\u9FA5]/g, "");
        this.v = value;
      },
    },
  },
  methods: {
    transformString,
    change() {
      const row = this.$refs.cascader.getCheckedNodes()[0];
      getPageBySon(row.data.id).then(({ data }) => {
        this.$emit("getIntroduction", data.introduction || "");
      });
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.cascader.$refs.input.$el.click();
      });
    },
    inputChange() {},
  },
};
</script>
<style lang="scss" scoped>
.job-selct {
  width: 100%;
  position: relative;
  .cascader {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    border: 0;
    position: absolute;
    top: 40px;
    left: 0;
    &::v-deep input {
      display: none;
    }
    &::v-deep span {
      display: none;
    }
  }
}
</style>