<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div class="board search">
      <p>
        <label class="label">关键字：</label>
        <input class="input" type="text" v-model="form.keyword" placeholder="请输入商品名称、品牌、分类">
        <span class="link" @click="search()">搜索</span>
      </p>
      <p>
        <label class="label">供应商：</label>
        <select class="input" v-model="form.supplier">
          <option v-for="(item,index) in supplierList" :key="index" :value="item.key">
            {{item.value}}
          </option>
        </select>
      </p>
    </div>
    <div class="condition">
      <checker v-model="params.order_by" @on-change="changeOrder()" default-item-class="item" selected-item-class="item-selected" :radio-required="true">
        <checker-item value="price">
          价格
          <span v-if="params.order_by==='price'">
            <img class="icon" v-if="params.order==='asc'" @click="changeOrderBy()" src="~@/images/sort-up.png">
            <img class="icon" v-else="params.order==='desc'" @click="changeOrderBy()" src="~@/images/sort-down.png">
          </span>
          <span v-else>
            <img class="icon" src="~@/images/sort.png">
          </span>
        </checker-item>
        <checker-item value="salesCount">
          销量
          <span v-if="params.order_by==='salesCount'">
            <img class="icon" v-if="params.order==='asc'" @click="changeOrderBy()" src="~@/images/sort-up.png">
            <img class="icon" v-else="params.order==='desc'" @click="changeOrderBy()" src="~@/images/sort-down.png">
          </span>
          <span v-else>
            <img class="icon" src="~@/images/sort.png">
          </span>
        </checker-item>
        <span class="item" :class="{'item-selected':this.model!==''}" @click="showHideOnBlur=true">
          按车型筛选
          <img class="icon" src="~@/images/filter.png">
        </span>
      </checker>
      <p class="model" v-if="this.model!==''">
        {{model_name}}
        <x-icon class="cancel" type="ios-close-empty" size="30" @click="cleanModel"></x-icon>
      </p>
    </div>
    <scroller class="scroller"
      :on-refresh="refresh"
      :on-infinite="infinite" ref="scroller">
      <list v-bind="merchants" v-on:addCart="addCart" :rate="configs.max_point_pay"></list>
    </scroller>
    <router-link :to="{name:'cart'}">
      <div class="cart">
        <img src="~@/images/cart.png" /><badge v-if="itemCount!==0" class="counts" :text="itemCount"></badge>
      </div>
    </router-link>
    <x-dialog v-model="showHideOnBlur" class="dialog" :dialog-style="dialog" hide-on-blur>
      <vin v-on:change="changeModel"></vin>
      <div @click="showHideOnBlur=false">
        <x-icon type="ios-close-empty" size="50"></x-icon>
      </div>
    </x-dialog>
  </div>
</template>
<script>
  import { Selector, Group,XHeader,XInput,XButton,Toast,Checker,CheckerItem,XDialog,TransferDomDirective as TransferDom,Badge  } from 'vux'
  import {getSuppliers,searchGoods,addMercahnt,getConfigs} from '@/service/getData'
  import list from '@/components/market/list'
  import vin from '@/pages/market/vin'
  export default {
    name: 'marketList',
    directives: {
      TransferDom,
    },
    components:{
      XHeader,
      Selector,
      Toast,
      Group,
      XInput,
      XButton,
      Checker,
      CheckerItem,
      XDialog,
      Badge,
      list,
      vin
    },
    data(){
    	return {
    		title: "商品搜索",
        showHideOnBlur: false,
        dialog: {
    			height: "70%"
        },
    		merchants:{},
        itemCount: 0,
        model: "",
        configs:{
          max_point_pay:0.5,
        },
        params: {
          page: 1,
          rows: 10,
          order_by: "price",
          order: "asc",
          keyword: "",
          supplier: ""
        },
        form: {
          keyword: "",
          supplier: "0"
        },
        supplierList: [
          {key: '0', value: '全部'}
        ],
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods: {
      async getRate(){
        let res = await getConfigs();
        if(res.code === 0){
          this.configs = res.resultData;
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }
      },
    	cleanModel: function(){
        this.model='';
        this.params.liyang_id='';
        this.initData();
      },
      changeModel: function(obj){
        this.params.liyang_id = obj.value;
        this.model = obj.name;
        this.showHideOnBlur = false;
        this.initData();
      },
      search: function(){
    		this.params.keyword = this.form.keyword;
        this.params.supplier = (this.form.supplier==0) ? "" : this.form.supplier;
        this.initData();
        this.$router.replace({
          name: "merchants",
          query: { keyword: this.params.keyword }
        })
      },
      changeOrder: function(){
        this.initData();
      },
    	changeOrderBy: function(){
    		this.params.order= (this.params.order==='asc') ? "desc" : "asc";
    		this.initData();
      },
      async addCart(option){
        let res = await addMercahnt({goods_price_id:option.id,count:1});
        if(res.code === 0){
          this.itemCount = res.resultData.itemCount;
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
      async suppliersList(){
        let res = await getSuppliers();
        if(res.code === 0){
          let supplierList = this.supplierList.slice(0);
          res.resultData.items.map(function(item){
            supplierList.push({key: item.code,value: item.name})
          });
          this.supplierList = supplierList;
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
        this.initData();
      },
      infinite(done){
        this.addData(done)
      },
      async initData(){
        this.params.page=1;

        let res = await searchGoods({...this.params});
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
          this.$refs.scroller.finishInfinite(2);
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.error.code = true;
          this.error.message = res.message;
          this.$refs.scroller.finishInfinite(2);
        }

      },
      async addData(done){
        console.log(this.params.page)
        this.params.page=this.params.page+1;

        let res = await searchGoods({...this.params});
        if(res.code === 0){
          if(res.resultData.items.length===0){
            this.$refs.scroller.finishInfinite(2);
          }else{
            this.merchants.items = res.resultData.items.reduce( function(coll,item){
              coll.push( item );
              return coll;
            }, this.merchants.items );
            this.$refs.scroller.finishPullToRefresh();
            done();
          }
        }else if(res.code===90002){
          this.error.code = true;
          this.error.message = res.message;
          this.$refs.scroller.finishInfinite(2);
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.error.code = true;
          this.error.message = res.message;
          this.$refs.scroller.finishInfinite(2);
        }

      },
    },
    mounted(){
      let query = this.$route.query;
      if(query.keyword){
        this.params.keyword = this.form.keyword = query.keyword;
      }
      if(query.supplier){
        this.params.supplier = (query.supplier==0)? "" : query.supplier;
        this.form.supplier = query.supplier;
      }
    	this.suppliersList();
      this.getRate();
    	this.initData();
    },
    computed: {
      model_name() {
      	return this.model;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .item-selected {
    color: #f64747;
  }

  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom: 20px;
    .board {
      width: 100%;
      background: #ffffff;
      margin-bottom: 5%;
      .title {
        color: #007aff;
        font-size: 18px;
        border-bottom: 1px dotted #c8c7cc;
      }
    }

    .search {
      padding: 10px 20px;

      p {
        line-height: 40px;
        height:40px;
        .label {
          display: inline-block;
          width:20%;
          font-size: 0.8rem;
        }

        .input {
          width:60%;
          height: 30px;
          line-height: 30px;
          border: 1px solid #cccccc;
          font-size: 12px;
        }

        .link {
          display: inline-block;
          color: #007aff;
          float: right;
        }
      }
    }

    .scroller {
      position: relative;
      height:69vh !important;
    }

    .condition {
      width:100%;
      height:6vh;
      background: #ffffff;
      .item {
        width: 30vw;
        height:6vh;
        line-height: 6vh;
        padding-left: 5vw;
      }

      .icon {
        height: 2.5vh;
        width:auto;
        vertical-align: middle;
      }

      .model {
        z-index: 111;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        background: rgba(253,218,218,0.5);
        position: relative;
        color: #eb0c0c;

        * {
          vertical-align: middle;
        }

        .cancel {
          float: right;
        }
      }
    }

    .cart {
      position: fixed;
      left: 5%;
      bottom: 0;

      img {
        width:3rem;
        height:3rem;
      }

      .counts {
        vertical-align: top;
        margin-left: -0.5rem;
      }
    }



  }
</style>
