<template>
  <div class="main-container">
    <h2>按钮</h2>
    <section class="code-box">
      <section id="components-button-demo-basic" class="code-box-demo">
        <IcanButton type="primary">primary</IcanButton>
        <IcanButton>default</IcanButton>
        <IcanButton type="ghost">ghost</IcanButton>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.code-box {
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  .code-box-demo {
    background-color: #fff;
  }
}
.code-box-demo {
  padding: 42px 24px 50px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #f0f0f0;
}
.main-container {
  position: relative;
  min-height: 500px;
  padding: 0 170px 32px 64px;
  background: #fff;
}
[id^="components-button-demo-"] {
  .ican-btn {
    margin-right: 8px;
    margin-bottom: 12px;
  }
}
</style>
