<template>
  <div>
    <ul>
      <li class="document-box" v-for="(item, index) in documents" :key="index">
        <p class="document-title">{{item.title}}</p>
        <p class="document-content">
          <a :href="item.link" download>{{item.name}}</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    documents: {
      type: Array,
      default() {
        return [
          { title: "项目预审", link: "asdad", name: "wenjian.jpg" },
          { title: "建设方案评审", link: "asdad", name: "sdfasdfas.jpg" },
        ];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
</style>
