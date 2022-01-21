<template>
  <svg
    class="id"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 55 16"
    enable-background="new 0 0 55 16"
    xml:space="preserve"
  >
    <g id="1">
      <g>
        <g>
          <path
            :fill="obj.color"
            d="M55,3.375C47.699,1.353,38.099,0.11,27.562,0.067h-1.124C16.374,0.108,7.167,1.243,0,3.107v12.955h55
				V3.375z"
          />
        </g>
      </g>
    </g>
    <g id="2">
      <g>
        <!-- text-anchor="start" -->
        <text
          xml:space="preserve"
          font-family="Helvetica, Arial, sans-serif"
          font-size="9"
          id="svg_3"
          y="10"
          x="28.5"
          stroke-width="0"
          stroke="#303031"
          fill="#ffffff"
          text-anchor="middle"
          dominant-baseline="middle"
        >{{obj.name}}</text>
      </g>
    </g>
  </svg>
</template>
<script>
const typeMap = {
  1: {
    name: "知事",
    color: "#0099ffd1",
  },
  2: {
    name: "负责人",
    color: "#F74437d1",
  },
};
export default {
  name: "IepIdentitySvg",
  props: {
    type: {
      type: Number,
      required: true,
    },
  },
  computed: {
    obj() {
      return typeMap[this.type];
    },
  },
};
</script>
<style lang="scss" scoped>
.id {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
