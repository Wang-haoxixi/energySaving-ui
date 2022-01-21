<template>
  <div class="title" :class="{view:(type!=='edit')}">
    <template v-if="type === 'edit'">
      <h3 class="name">
        备注
        <span class="tips">提示：该题型暂时无法在移动端显示</span>
      </h3>
      <div class="ti">
        <div class="ti1">内容：</div>
        <div class="ti2">
          <el-input
            type="textarea"
            style="width:80%"
            v-model="data.title"
            :maxlength="200"
            placeholder="最多输入200个字"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div>备注: {{data.title}}</div>
    </template>
  </div>
</template>

<script>
import baseMixin from "./mixin/base";
export default {
  mixins: [baseMixin],
};
</script>
<style lang="scss" scoped>
@import "./css/style.scss";
div.view {
  margin-top: 12px;
}
</style>
