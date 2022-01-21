<template>
  <!-- <div class="icon-wrap" :style="`background: linear-gradient(-215deg, ${aColor}, ${bColor});`">
    <i class="icon-box" :class="icon"></i>
  </div>-->
  <!-- <div class="icon-wrap" :style="`background-position-y:${position};`">
    <i class="icon-box" :class="icon"></i>
  </div>-->
  <div class="icon-wrap">
    <i class="icon-box" :class="icon"></i>

    <svg
      id="t1"
      data-name="t1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80"
    >
      <defs>
        <linearGradient
          :id="`IepIcon${icon}`"
          x1="-751.24"
          y1="-85.24"
          x2="-749.24"
          y2="-83.24"
          gradientTransform="translate(30009.5 3389.5) scale(40)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" :stop-color="aColor" />
          <stop offset="1" :stop-color="bColor" />
        </linearGradient>
      </defs>
      <g id="y1">
        <path
          id="f1"
          :fill="`url(#IepIcon${icon})`"
          d="M0,60c-12.51-.12-23.16-3.16-29.94-10.06S-39.88,32.51-40,20c.12-12.51,3.16-23.16,10.06-29.94S-12.51-19.88,0-20c12.51.12,23.16,3.16,29.94,10.06S39.88,7.49,40,20c-.12,12.51-3.16,23.16-10.06,29.94S12.51,59.88,0,60"
          transform="translate(40 20)"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: "IepIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    aColor: {
      type: String,
      default: "#ffe290",
    },
    bColor: {
      type: String,
      default: "#ffa014",
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-wrap {
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  #t1 {
    position: absolute;
  }
  .icon-box {
    color: #fff;
    font-size: 22px;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-left: -11px;
    margin-top: -11px;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>
