<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close"></x-header>
    <p class="line" v-for="(item,index) in list" :key="item.regionId" @click="changeAddress(item.regionId,item.regionName)">
      {{item.regionName}}
    </p>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,Group,Popup,CellBox } from 'vux'

  export default {
    name: "city",
    components: {
      XHeader,
      Toast,
      Group,
      Popup,
      CellBox
    },
    props: ['list'],
    data () {
      return {
        title: "选择城市",
        loading: false,
        cityId: 0,
        leftOptions: {
          preventGoBack: true
        },
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods: {
      changeAddress(id,name){
        this.$emit("change",id,name);
      },
      close(){
        this.$emit("close");
      },
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
    padding-bottom: 20px;

    .line {
      height: 35px;
      line-height: 35px;
      padding: 5px 10px;
      font-size: 14px;
      background: #ffffff;
      border-bottom: 1px solid #cccccc;
    }

  }

</style>
