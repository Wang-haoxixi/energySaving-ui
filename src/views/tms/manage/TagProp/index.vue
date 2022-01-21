<template>
  <div class="tags-attribute">
    <iep-basic-container>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='TagType'" v-slot:TagType>
          <tag-type></tag-type>
        </template>
        <template v-if="tabName ==='TagCategory'" v-slot:TagCategory>
          <tag-level></tag-level>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import tagType from "./tag_type";
import tagLevel from "./tag_level";
export default {
  components: { tagType, tagLevel },
  data() {
    return {
      tabName: "TagType",
      tabList: [
        {
          label: "标签分类",
          value: "TagType",
        },
        {
          label: "标签级别",
          value: "TagCategory",
        },
      ],
    };
  },
};
</script>