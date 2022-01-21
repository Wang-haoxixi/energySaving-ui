<template>
  <div class="container">
    <h1>{{$route.name}}</h1>
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  margin: 15px 8px;
  font-size: 1.5em;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1em;
}
.container ::v-deep h4 {
  font-weight: 700;
}
.container ::v-deep b {
  text-decoration: underline;
}
.container ::v-deep > div {
  margin-bottom: 50px;
}
</style>
