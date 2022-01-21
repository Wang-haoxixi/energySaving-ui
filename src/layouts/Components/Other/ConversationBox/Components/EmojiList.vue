<template>
  <div class="emoji-wrapper">
    <div
      class="emoji-item"
      v-for="item of emojiList"
      :key="item.unicode"
      @click="handleAddEmoji(item.emoji)"
    >{{item.emoji}}</div>
  </div>
</template>
<script>
export default {
  name: "emojiList",
  props: {
    emojiList: {
      type: Array,
      default: () => {},
      required: true,
    },
  },
  methods: {
    handleAddEmoji(emoji) {
      this.$emit("handleAddEmoji", emoji);
    },
  },
};
</script>
<style lang="scss" scoped>
.emoji-wrapper {
  width: 500px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  .emoji-item {
    width: 25px;
    height: 25px;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid $--color-text-regular;
    margin: 0 5px;
    line-height: 25px;
    text-align: center;
  }
}
</style>
