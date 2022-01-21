<template>
  <div>
    <div class="feature-ques" v-if="data.length" v-loading="loading">
      <el-card
        shadow="hover"
        :body-style="{padding:'10px 20px'}"
        v-for="(item) in data"
        :key="item.id"
      >
        <iep-ques-list-item class="ques-item" :value="item"></iep-ques-list-item>
      </el-card>
    </div>
    <iep-no-data v-else complex style="width:100%;"></iep-no-data>
  </div>
</template>
<script>
import { getFactoryList } from "@/api/qms/questionnaire";
export default {
  name: "FeatureQues",
  data() {
    return {
      data: [],
      size: 2,
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    async load() {
      this.loading = true;
      const params = { orgId: this.id, size: this.size };
      const { data } = await getFactoryList(params);
      if (data) {
        this.data = data;
        this.$emit("setDataLength", data.length >= 2);
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.feature-ques {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}
</style>