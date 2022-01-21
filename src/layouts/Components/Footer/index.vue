<template>
  <footer class="layout-footer">{{website.copyright}}</footer>
</template>
<script>
import website from "@/const/website";
export default {
  data() {
    return {
      website,
    };
  },
};
</script>
<style lang="scss" scoped>
.layout-footer {
  margin: 0 0 20px 0;
  padding: 0 16px;
  font-size: 14px;
  text-align: center;
}
</style>
