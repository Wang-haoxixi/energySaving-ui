<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item.value+Math.random()"
      :label="item.label"
      :value="item[useLabel?'label':'value']"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>
<script>
import store from "@/store";
export default {
  name: "IepDictSelect",
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    dictName: {
      type: String,
      required: true,
    },
    disabledIds: {
      type: Array,
      default: () => [],
    },
    useLabel: {
      type: Boolean,
      defafult: false,
    },
  },
  computed: {
    options() {
      const dictGroup = store.state.common.dictGroup;
      const mapName = dictGroup.has(this.dictName)
        ? dictGroup.get(this.dictName)
        : [];
      const allOptions = [...mapName];
      allOptions.map(m => {
        if (this.disabledIds.includes(m.value)) {
          m.disabled = true;
        } else {
          m.disabled = false;
        }
      });
      return allOptions;
    },
  },
};
</script>
