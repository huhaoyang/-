<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "~@/styles/layout.scss";

</style>

<style lang="less">
@import '~vux/src/styles/reset.less';

* {
  box-sizing: border-box;
}

body {
  background-color: #fbf9fe;
}
</style>
