<template>
  <div class="container hu_home">
    <img class="banner" src="~@/images/banner.png">
    <div class="top-bar">
      <div class="area" @click="provinceShow=true">
        <span>{{city_name}}</span>
        <x-icon class="icon" type="ios-arrow-down" size="30"></x-icon>
      </div>
      <search
        class="search"
        placeholder="请输入关键字"
        v-model="conditions.keyword"
        :autoFixed="false"
        @on-submit="onSearch"
        ref="search"></search>
    </div>
    <div class="content">
      <div class="left">
        <ul class="type-list">
          <li :class="{active:(item.typeId===conditions.type_id)}" v-for="(item,index) in types" :key="item.typeId" @click="changeType(item.typeId)">
            {{item.typeName}}
          </li>
        </ul>
      </div>
      <div class="right">
        <scroller class="scroller"
                  :on-refresh="refresh"
                  :on-infinite="infinite" ref="scroller">
          <list v-bind="merchants" v-on:change="changeCart"></list>
        </scroller>
      </div>
    </div>
    <div v-if="cart.allTotalPrice===0" class="bottom-tab empty">
      <div class="info">
        请挑选商品
      </div>
      <span class="btn">
        <router-link :to="{name:'orderList'}">
          <img src="~@/images/note.png">
          订单管理
        </router-link>
      </span>
    </div>
    <div v-else class="bottom-tab">
      <div class="info">
        <p>
          <span class="price">￥{{cart.allTotalPrice}}</span>
          <span>共有{{cart.pointBalance}}积分</span>
        </p>
        <p>
          <span class="excepted">已抵扣 ￥{{cart.pointDeduction}}</span>
          <span>本单可抵扣 {{cart.pointMax}}积分</span>
        </p>
      </div>
      <span v-if="shops===1" class="btn" @click="checkCart()">
        去结算
      </span>
      <span v-else class="btn">
        <router-link :to="{name:'cart'}">
          去购物车
        </router-link>
      </span>
    </div>
    <popup v-model="provinceShow" position="right" width="100%">
      <province-list v-on:close="closeProvince" v-on:change="changeCity"></province-list>
    </popup>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,Search,Popup,Badge } from 'vux'
  import { searchGoods,getPartTypes,getMerchant } from '@/service/getData'
  import {getStore,setStore} from '@/config/mUtils'
  import provinceList from '@/components/area/province'
  import list from '@/components/home/list'

  export default {
  	name: "home",
    components: {
      XHeader,
      Toast,
      Search,
      Popup,
      Badge,
      provinceList,
      list
    },
    data () {
      return {
        title: '商品分类',
        city_name: '城市',
        conditions: {
          city_id: '',
          keyword: '',
          type_id: '',
          order_by: "price",
          order: "asc",
          page: 1,
          rows: 10,
        },
        merchants:{
        	items:[]
        },
        cart:{
          merchantShopList:[]
        },
        types:[
          {
            typeId:'',
            typeName:'全部'
          }
        ],
        error: {
          code: false,
          message: ""
        }, //错误信息
        provinceShow:false
      }
    },
    mounted(){
      this.initData();
    },
    computed:{
      shops(){
        return this.cart.merchantShopList.length;
      }
    },
    methods:{
      onSearch(){
        this.initList();
      },
      changeCity(id,name){
        this.conditions.city_id = id;
        this.city_name = name;
        setStore('cityName',name);
        setStore('cityId',id);
        this.provinceShow = false;
        this.initList();
      },
      closeProvince(){
        this.provinceShow = false;
      },
      changeType(id){
        this.conditions.type_id = id;
        this.initList();
      },
      changeCart(){
        this.getCart();
      },
      initData(){
        this.conditions.city_id = getStore('cityId') || this.conditions.city_id;
        this.city_name = getStore('cityName') || this.city_name;
      	this.initTypes();
      	this.initList();
      	this.getCart();
      },
      checkCart(){
      	let id=[];
        this.cart.merchantShopList[0].shopItems.forEach(function (item) {
          id.push(item.cartItemId);
        });
        this.$router.push({
          name: "orderCreate",
          params: { id: id.join(',') }
        })
      },
      async initTypes(){
        let res = await getPartTypes();
        if(res.code === 0){
        	let types = this.types.slice(0,1);
          res.resultData.items.forEach(function(item){
            types.push(item);
          })
          this.types = types;
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
      refresh(){
        this.initList();
      },
      infinite(done){
        this.addList(done)
      },
      async getCart(){
        let res = await getMerchant();
        if(res.code === 0){
          this.cart = res.resultData;
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
      async initList(){
        this.conditions.page = 1;
      	let res = await searchGoods({...this.conditions});
        if(res.code === 0){
          if(res.resultData.items.length===0){
            this.merchants = res.resultData;
            this.$refs.scroller.finishInfinite(2);
          }else{
            this.merchants = res.resultData;
            this.$refs.scroller.finishPullToRefresh()
          }
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
      async addList(done){
        this.conditions.page += 1;
        let res = await searchGoods({...this.conditions});
        if(res.code === 0){
          if(res.resultData.items.length===0){
            this.$refs.scroller.finishInfinite(2);
          }else{
            this.merchants.items = this.merchants.items.concat(res.resultData.items)
            this.$refs.scroller.finishPullToRefresh();
            done();
          }
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
      }

    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom:0;

    .banner {
      width:100%;
      height:auto;
      display: inline-block;
    }

    .top-bar {
      height:9vh;
      line-height: 9vh;
      font-size: 1.2rem;
      background: #ffffff;
      .area {
        box-sizing: content-box;
        display: inline-block;
        width: 24%;
        height: inherit;
        line-height: inherit;
        position: absolute;
        text-align: center;
        padding: 0 2%;
        color: #7058a4;

        .icon {
          vertical-align: middle;
        }

        span {
          font-size: 18px;
          display: inline-block;
          vertical-align: top;
        }
      }

      .search {
        padding-left: 28%;
        height:9vh;
        line-height: 5vh;
        width: 100%;
      }
    }

    .content {
      width:100%;
      height: 91vh;
      background: #ffffff;
      position: relative;

      .left {
        width: 30%;
        height:inherit;
        position: absolute;
        overflow-y: scroll;

        .type-list {
          width:100%;
          list-style: none;
          background: #f1f2f4;

          li {
            height:40px;
            line-height: 40px;
            font-size: 14px;
            text-align: center;
          }

          li.active {
            background: #ffffff;
            color: #7058a4;
          }
        }
      }

      .right {
        position: absolute;
        width:70%;
        left: 30%;
        ._v-container {
          height:90vh !important;
          position: absolute;
          .list{
            margin-bottom: 10vh;
          }
        }
      }
    }

    .bottom-tab {

      position: fixed;
      bottom:0;
      width: 100vw;
      height:8vh;
      background: #ffffff;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-between;
      flex-flow: wrap;

      &.empty{
        .info {
          color: #7e7e7e;
          line-height: 8vh;
        }

        .btn {
          img {
            display: inline-block;
            height:4vh;
            width:auto;
            vertical-align: middle;
          }
          background: #7e7e7e;
        }
      }

      .info {
        width: 70%;
        display: inline-block;
        padding: 0 10px;
        font-size: 0.7rem;
        line-height: 4vh;
        color: #c8c7cc;
        background-color: #f7f7f7;

        p {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-flow: wrap;
          span {
            color:#707070;
          }
          .excepted{
            color: #9d9d9d;
          }
          .price {
            font-size: 1rem;
            color: #eb0c0c;
          }
        }
      }

      .btn {
        background: #eb0c0c;
        color: #ffffff;
        width: 30%;
        padding: 0 1rem;
        font-size: 1rem;
        line-height: 8vh;
        text-align: center;

        a {
          color: #fff;
        }
      }
    }

  }
</style>

<style lang="scss">
  .search .weui-search-bar,.container .vux-search-fixed {
    background-color: transparent;
  }

  .search .weui-search-bar:after, .weui-search-bar__form:after{
    border-bottom: 0;
  }

  .search .weui-search-bar:before, .weui-search-bar__form:before{
    border-top: 0;
  }

  .search .weui-search-bar__label {
    background: #f4f4f4;
  }

  .right.vux-x-icon {
    fill: #7058a4;
  }
  /*huhy新增*/
  .content .right .vux-number-round .vux-number-selector-plus{
    width: 16px;
    height: 16px;
    border: none;
    padding: 2px;
    background-color: #eb0c0c;

  }
  .content .right .vux-number-round .vux-number-selector-sub{
    width: 16px;
    height: 16px;
    border: none;
    padding: 2px;
    background-color: #eb0c0c;

  }
  .content .right .vux-number-selector svg{
    width: 16px;
    height: 16px;
    fill:#ffffff;
    position: relative;
    top:-1px;

  }
  .hu_home ._v-container>._v-content>.loading-layer{
    top: -10vh;
  }
</style>
