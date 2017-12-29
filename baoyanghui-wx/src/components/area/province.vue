<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close"></x-header>
    <p class="line" v-for="(item,index) in provinces" :key="item.regionId" @click="changeProvince(item.regionId)">
      {{item.regionName}}
    </p>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
    <popup v-model="cityShow" position="right" width="100%">
      <city-list v-on:close="closeCity" v-on:change="changeCity" :list="cities"></city-list>
    </popup>
  </div>
</template>

<script>
  import { XHeader,Toast,Group,Popup,CellBox } from 'vux'
  import {getRegion} from '@/service/getData'
  import cityList from '@/components/area/city'

  export default {
    name: "province",
    components: {
      XHeader,
      Toast,
      Group,
      Popup,
      CellBox,
      cityList
    },
    data () {
      return {
        title: "选择省份",
        loading: false,
        provinceId: "",
        leftOptions: {
          preventGoBack: true
        },
        provinces: [],
        cities: [],
        cityShow:false,
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    mounted(){
      this.initData();
    },
    methods: {
      changeProvince(id){
      	this.provinceId = id;
        this.initCity(this.provinceId);
        this.cityShow = true;
      },
      changeCity(id,name){
        this.$emit("change",id,name);
        this.cityShow = false;
      },
      close(){
        this.$emit("close");
      },
      closeCity(){
        this.cityShow = false;
      },
      async initData(){

        let res = await getRegion();
        if(res.code === 0){
          this.provinces = res.resultData.items;
        }else if(res.code===90002){
          this.error.code = true;
          this.error.message = res.message;
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }

      },
      async initCity(){

        let res = await getRegion(this.provinceId);
        if(res.code === 0){
          this.cities = res.resultData.items;
        }else if(res.code===90002){
          this.error.code = true;
          this.error.message = res.message;
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }

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
