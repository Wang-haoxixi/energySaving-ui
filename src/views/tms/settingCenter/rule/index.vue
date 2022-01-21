<template>
  <div class="rule-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:18px;">Apache Lucene分词器</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleOpen(`调用接口为/tms/tag/extract_tag,参数为：content=内容，num=所需标签个数`)">查看使用规范</el-button>
      </div>
      <div class="text item">
        在创建索引的时候需要用到分词器，在使用字符串搜索的时候也会用到分词器，并且这两个地方要使用同一个分词器，否则可能会搜索不出来结果。

        分词器(Analyzer)的作用是把一段文本中的词按规则取出所包含的所有词，对应的是Analyzer类，这是一个抽象类(public abstract class org.apache.lucene.analysis.Analyzer)，切分词的具体规则是由子类实现的，所以对于不同的语言规则，要有不同的分词器。
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:18px;">联想输入</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleOpen(`调用接口为/tms/tag/assn_tag,参数为：keyWord=关键字
`)">查看使用规范</el-button>
      </div>
      <div class="text item">
        输入标签时，根据用户输入的关键字，实时获取标签库中已经存在的可匹配结果，供用户选择并应用。
      </div>
    </el-card>
    <iep-dialog :dialog-show="ruleDialogShow" title="详情" @close="ruleDialogShow=false" width="500px">
      {{text}}
    </iep-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleDialogShow: false,
      text: "",
    };
  },
  methods: {
    handleOpen(text) {
      this.ruleDialogShow = true;
      this.text = text;
    },
  },
};
</script>
<style lang="scss" scoped>
.rule-wrapper {
  padding: 20px;
  .box-card {
    margin-bottom: 20px;
  }
  .text.item {
    font-size: 14px;
  }
}
</style>
