<template>
  <ul class="list">
    <item v-on:fresh="$emit('fresh')" v-for="item in items" :key="item.id" v-bind="item"></item>
  </ul>
</template>

<script>
  import Item from '@/components/orders/item'
  export default {
    name: 'list',
    components: {
      Item
    },
    props: ['items']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .list {
    list-style: none;
  }
</style>
