<template>
  <iframe v-if="$route.meta.src" id="iframe" :src="$route.meta.src" class="iframe" ref="iframe"></iframe>
</template>
<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: calc(100vh - 8px);
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
