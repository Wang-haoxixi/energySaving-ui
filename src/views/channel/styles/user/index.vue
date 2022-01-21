<template>
  <div class="grid-container">
    <div class="thought-box">
      <ThoughtBox />
    </div>
    <div class="task-box">
      <TaskBox />
    </div>
    <div class="material-box">
      <MaterialBox />
    </div>
    <div class="friend-box">
      <FriendBox />
    </div>
  </div>
</template>
<script>
import ThoughtBox from "./Components/ThoughtBox";
import TaskBox from "./Components/TaskBox";
import MaterialBox from "./Components/MaterialBox";
import FriendBox from "./Components/FriendBox";
export default {
  components: {
    ThoughtBox,
    TaskBox,
    MaterialBox,
    FriendBox,
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 440px 340px 420px auto;
  gap: 20px;
  grid-template-areas: "thought-box" "task-box" "material-box" "friend-box";
}
[class$="-box"] {
  padding: 20px;
  background: #fff;
  border-radius: $--border-radius-base;
}
.thought-box {
  grid-area: thought-box;
}

.task-box {
  grid-area: task-box;
}

.material-box {
  grid-area: material-box;
}

.friend-box {
  grid-area: friend-box;
}
</style>
