<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">填空题</h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="150" placeholder="最多输入150个字"></el-input>
        </div>
      </div>
      <div class="mg10"></div>
    </template>
    <template v-else>
      <div v-if="data.isShow === '1' || disabled">
        <h3 style="margin:8px 0" :id="'a'+data.orderNumber" :name="'a'+data.orderNumber">
          {{(data.index||index)+". "}}
          <span>{{data.title}}(填空题)</span>
          <span class="require" v-if="data.isRequire === '1'">*</span>
        </h3>
        <div>
          <el-input
            style="width:80%"
            type="textarea"
            v-model="data.answer.value"
            :disabled="disabled"
            :maxlength="1000"
            placeholder="最多输入1000个字"
          ></el-input>
        </div>
      </div>
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
</style>
