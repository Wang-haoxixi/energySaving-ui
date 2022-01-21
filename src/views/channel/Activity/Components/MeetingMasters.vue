<template>
  <TitleWrap name="与会大咖" justify="center" gridCols="3">
    <UserCard v-for="o of userList" :key="o.userId" :user="o"></UserCard>
  </TitleWrap>
</template>
<script>
import TitleWrap from "./TitleWrap";
import UserCard from "./UserCard";
import { getBigGuy } from "@/api/meetting/publish";
export default {
  name: "MeetingMasters",
  components: {
    TitleWrap,
    UserCard,
  },
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getBigGuy();
      this.userList = data;
    },
  },
};
</script>
