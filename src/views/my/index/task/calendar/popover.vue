<template>
  <div
    role="tooltip"
    id="el_popover"
    aria-hidden="false"
    class="el-popover el-popper"
    tabindex="0"
    style="position: fixed; transform-origin: left center; z-index: 5;"
    :style="`width: ${width}px; left: ${left}px; top: ${top}px;`"
    :x-placement="placement"
  >
    <slot></slot>
    <div x-arrow class="popper__arrow" style="top: 8px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 300,
    },
    placement: {
      type: String,
      default: "right-start",
    },
  },
};
</script>
