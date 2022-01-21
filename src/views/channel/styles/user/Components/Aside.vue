<template>
  <div class="grid-container" v-loading="loading">
    <div class="main-box">
      <MainBox :value="form" @refresh="loadPage()" />
    </div>
    <div class="info-box">
      <InfoBox :value="form" />
    </div>
    <div class="exp-box">
      <ExpBox :value="form" />
    </div>
    <div class="relation-box">
      <RelationBox />
    </div>
  </div>
</template>
<script>
import { getUserShowById } from "@/api/admin/user";
import { UserEntity } from "@/types/user";
import MainBox from "./MainBox";
import InfoBox from "./InfoBox";
import ExpBox from "./ExpBox";
import RelationBox from "./RelationBox";
export default {
  components: {
    MainBox,
    InfoBox,
    ExpBox,
    RelationBox,
  },
  data() {
    return {
      loading: false,
      form: new UserEntity(),
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(id = this.$route.params.id) {
      this.loading = true;
      try {
        const { data } = await getUserShowById(id);
        if (data) {
          this.form = this.$mergeByFirst(new UserEntity(), data);
        } else {
          this.$router.go(-1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 390px 260px 340px 430px;
  gap: 20px;
  grid-template-areas: "main-box" "info-box" "exp-box" "relation-box";
}
[class$="-box"] {
  background: #fff;
  border-radius: $--border-radius-base;
  padding: 20px;
}
.main-box {
  grid-area: main-box;
}

.info-box {
  grid-area: info-box;
}

.exp-box {
  grid-area: exp-box;
}

.relation-box {
  grid-area: relation-box;
}
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
</style>
