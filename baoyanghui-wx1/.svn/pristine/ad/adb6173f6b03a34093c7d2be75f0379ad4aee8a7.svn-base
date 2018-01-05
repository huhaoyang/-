<template>
  <div class="list">
    <item v-for="(item,index) in items" :key="index" :rate="rate" v-bind="item" v-on:carts="carts(item.priceId)"></item>
  </div>
</template>

<script>
  import item from '@/components/market/item'
  export default {
    name: 'list',
    components: {
      item
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    props: ['items','page','total','rate'],
    methods: {
      carts:function(id){
        this.$emit('addCart',{id:id});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list {
    width:100%;
    height:auto;

    .no-data {
      text-align: center;
    }
  }
</style>
