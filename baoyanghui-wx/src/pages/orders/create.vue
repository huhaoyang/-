<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div class="block">
      <div class="title">
        配送信息
      </div>
      <div v-if="JSON.stringify(address)!=='{}'" @click="addressShow=true" class="address">
        <p>
          <span>{{address.consigneeName}}</span>
          <span>{{address.consigneeMobile}}</span>
        </p>
        <p>{{address.consigneeAddress}}</p>
        <img src="~@/images/address.png" class="location" type="ios-arrow-right">
        <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
      </div>
      <div class="empty-btn" @click="addressShow=true" v-else>
        <span>点击添加配送信息</span>
        <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
      </div>
    </div>
    <div v-if="merchantShop.placeName" class="block">
      <div class="title">
        <img v-if="merchantShop.merchantId===0" src="~@/images/JD-icon.png"/>
        {{merchantShop.placeName}}
      </div>
      <div class="line merchant" v-for="item in merchantShop.shopItems" :key="item.cartItemId">
        <div class="left">
          <img :src="item.photo" />
          <span class="model">{{item.displayModel}}</span>
        </div>
        <div class="right">
          <p class="price">￥{{item.price}}</p>
          <p class="count">×{{item.count}}</p>
        </div>
      </div>
      <div v-if="expressFee.jdExpressFreeAmount!==0 && merchantShop.merchantId===0" class="line">
        <div class="left">
          运费(<span class="fee">满{{expressFee.jdExpressFreeAmount}}元免基础运费10kg内</span>)
        </div>
        <div class="right">
          ￥{{expressFee.expressFee}}
        </div>
      </div>
      <div class="line" v-else>
        <div class="left">
          运费
        </div>
        <div class="right">
          ￥{{expressFee.expressFee}}
        </div>
      </div>
      <div class="line">
        <div class="left">
          合计
        </div>
        <div class="right cash">
          ￥{{total}}
        </div>
      </div>
      <div v-if="JSON.stringify(points)!=='{}'" class="line points">
        <div class="left">
          积分抵扣
        </div>
        <div class="right cash">
          <p>
            <x-switch class="switch" title="" :value-map="[0, pointsPay]" :disabled="total<parseInt(configs.min_price_for_point)" v-model="usePoint"></x-switch>
            -￥{{pointsCash}}
          </p>
          <p class="tiny">（您共有{{points.pointAvailable}}积分,本单可用{{pointsPay}}积分）</p>
        </div>
      </div>
      <div class="line">
        <div class="left">
          账户余额抵扣
        </div>
        <div class="right cash">
          -￥{{balancePay}}
        </div>
      </div>
      <div class="line">
        <div class="left">
          还需支付
        </div>
        <div class="right cash">
          ￥{{pay}}
        </div>
      </div>
      <group v-if="balancePay>0||usePoint!==0" label-width="5em">
        <x-input v-model="password">
          <p slot="label" style="width: 5em;">
            <span style="color:red">*</span>
            密码
          </p>
        </x-input>
      </group>
      <div class="invoice">
        <p><span style="color:red;">*</span>如需开票，请致电客服热线400-6090-827</p>
        <!--<input type="checkbox" v-model="invoiceFlag" >我要开票<span class="small">（发票在确认收货后25个工作日内寄出）</span>-->
      </div>

    </div>

    <div class="block" v-if="invoiceFlag">
      <div class="title">
        发票信息
      </div>
      <div v-if="JSON.stringify(invoice)!=='{}'" @click="invoiceShow=true" class="address">
        <ul>
          <li>公司名称</li>
          <li>{{invoice.corporationName}}</li>
        </ul>
        <ul>
          <li>纳税人识别号</li>
          <li>{{invoice.identityNo}}</li>
        </ul>
        <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
      </div>
      <div class="empty-btn" @click="invoiceShow=true" v-else>
        <span>点击添加开票信息</span>
        <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
      </div>
    </div>
    <x-button class="btn" type="primary" @click.native="createOrder()">提交订单</x-button>
    <popup v-model="addressShow" position="right" width="100%">
      <address-list v-on:close="closeAddress" v-on:change="changeAddress"></address-list>
    </popup>
    <popup v-model="invoiceShow" position="right" width="100%">
      <invoice-list v-on:close="closeInvoice" v-on:change="changeInvoice"></invoice-list>
    </popup>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,TransferDom,Popup,Group,XInput,XButton,XSwitch } from 'vux'
  import {getMerchant,getConsignees,ordersMerchant,expressFee,getInvoices,getAccountBalance,getConfigs} from '@/service/getData'
  import addressList from '@/pages/address/list'
  import invoiceList from '@/pages/invoice/list'
  export default {
    name: 'orderCreate',
    components: {
      XHeader,
      Toast,
      TransferDom,
      Popup,
      Group,
      XInput,
      XButton,
      addressList,
      invoiceList,
      XSwitch
    },
    data () {
      return {
        title: "提交订单",
        address: {},
        points:{},
        configs:{},
        usePoint:0,
        addressShow: false,
        invoiceShow: false,
        merchantShop: {},
        expressFee:{
          jdExpressFreeAmount: 0,
          expressFee:0
        },
        invoiceFlag: false,
        invoice_id:"",
        invoice: {},
        password:"",
        consignee_id:"",
        totalPrice:0,
        storeBalance:0,
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods:{
      closeAddress(){
        this.addressShow = false;
      },
      changeAddress(obj){
        this.address = obj;
        this.consignee_id = obj.consigneeId;
        this.addressShow = false;
        this.changeFee();
      },
      closeInvoice(){
        this.invoiceShow = false;
      },
      changeInvoice(obj){
        this.invoice = obj;
        this.invoice_id = obj.id;
        this.invoiceShow = false;
      },
      async getPoints(){
        let res = await getAccountBalance();
        if(res.code === 0){
          this.points = res.resultData;
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }
      },
      async getRate(){
        let res = await getConfigs();
        if(res.code === 0){
          this.configs = res.resultData;
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }
      },
      async changeFee(){
        let id = this.$route.params.id;
        let res = await expressFee({item_ids:id,consignee_id:this.consignee_id});
        if(res.code === 0){
          this.expressFee = res.resultData;
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
      async getAddress(){
        let res = await getConsignees();
        if(res.code === 0){
          if(res.resultData.items.length>0){
            this.address = res.resultData.items.filter(function(item){
              return item.isDefault===1;
            })[0];
            this.consignee_id = (this.address) ? this.address.consigneeId : "";
            if(this.consignee_id!==""){
              this.changeFee();
            }
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
      async initInvoice(){
        let res = await getInvoices();
        if(res.code === 0){
          if(res.resultData.items.length>0){
            this.invoice = res.resultData.items.filter(function(item){
              return item.defaultFlg===1;
            })[0];
            this.invoice_id = (this.invoice!==undefined) ? this.invoice.id : "";
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
      async initMerchant(){
        let id = this.$route.params.id;
        if(id.split(',').length!==0){
          let res = await getMerchant({item_ids:id});
          if(res.code === 0){
            this.merchantShop = res.resultData.merchantShopList[0];
            this.totalPrice = res.resultData.allMerchantTotalPartPrice;
            this.storeBalance = res.resultData.storeBalance;
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
        }else {
          this.totalPrice = 0;
        }
      },
      async createOrder(){
        let id = this.$route.params.id;
        if(this.consignee_id===""){
          this.error.code = true;
          this.error.message = "请选择收件地址";

          return false;
        }

        if(this.balancePay>0 && this.password===""){
          this.error.code = true;
          this.error.message = "请输入登录密码";

          return false;
        }

        if(this.invoiceFlag && this.invoice_id===""){
          this.error.code = true;
          this.error.message = "请输入选择开票信息";

          return false;
        }

        let params = {consignee_id:this.consignee_id,password:this.password,shopping_ids:id,use_point:this.usePoint};
        if(this.invoiceFlag){
          params.invoice_id = this.invoice_id;
        }
        let res = await ordersMerchant(params);
        if(res.code === 0){
          let that = this;
          this.$vux.toast.show({
            text: '提交成功',
            type: "success"
          });
          setTimeout(function(){
            that.$router.push({
              name: "pay",
              params: { id: res.resultData }
            })
          },1000);
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
    },
    mounted(){
      this.initMerchant();
      this.initInvoice();
      this.getAddress();
      this.getPoints();
      this.getRate();
    },
    computed: {
      total(){
        return (this.totalPrice+this.expressFee.expressFee).toFixed(2);
      },
      balancePay(){
      	let pointsCash = (this.usePoint===0)? 0:this.pointsCash;
        let total = this.totalPrice+this.expressFee.expressFee-pointsCash;
        return (this.storeBalance>total) ? total : this.storeBalance ;
      },
      pay(){
        let pointsCash = (this.usePoint===0)? 0:this.pointsCash;
        let total = this.totalPrice+this.expressFee.expressFee-pointsCash;
        return (this.storeBalance>total) ? 0 : (total-this.storeBalance).toFixed(2) ;
      },
      pointsCash(){
      	let points = (this.totalPrice*this.configs.max_point_pay)/this.configs.exchange_point_to_cash;
        if(this.totalPrice<parseInt(this.configs.min_price_for_point)){
          return 0;
        }else if(this.points.pointAvailable>Math.round(points)){
          return (this.totalPrice).toFixed(2);
        }else{
          return (this.points.pointAvailable*this.configs.exchange_point_to_cash).toFixed(2);
        }
      },
      pointsPay(){
        let points = (this.totalPrice*this.configs.max_point_pay)/this.configs.exchange_point_to_cash;
        let a;
        if(this.totalPrice<parseInt(this.configs.min_price_for_point)){
          a=0;
        }else if(this.points.pointAvailable>Math.round(points)){
          a=Math.floor(points);
        }else{
          a=Math.floor(this.points.pointAvailable);
        }
        this.usePoint = a;
        return a;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .btn {
    background: #eb0c0c;
    border-radius: 0;
  }

  .container {
    padding-bottom: 0;
    .block {
      background: #ffffff;
      margin: 20px 0;
      padding: 20px 0;
      .title {
        color: #000;
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
        padding: 0 10px;
        border-bottom: 1px dotted #c8c7cc;

        img {
          height: 20px;
          vertical-align: middle;
        }
      }

      .address {
        position: relative;
        padding: 5px 30px;
        ul {
          line-height: 1.5rem;
          font-size: 0.8rem;
          width:100%;
          list-style: none;

          display: inline-flex;
          flex-direction: row;
          justify-content: space-between;
          flex-flow: wrap;

          li {

          }
        }

        .location{
          position: absolute;
          width: 20px;
          bottom: 10%;
          left: 1%
        }

        .icon {
          position: absolute;
          top: 30%;
          right: 0%
        }
      }


      .invoice {
        background: #EFEFF4;
        padding: 10px;

        input {
          margin-right: 20px;
          vertical-align: middle;
        }

        span,p {
          vertical-align: middle;
          font-size: 12px;
          color: #c8c7cc;
        }
      }

      .empty-btn {
        margin-top: 10px;
        text-align: center;
        background: gainsboro;

        span {
          height:inherit;
          line-height: inherit;
          vertical-align: super;
        }
      }

      .line {
        width:100%;
        padding: 1rem 10px;
        line-height: 1.5rem;
        font-size: 1rem;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        flex-flow: wrap;
        border-bottom: 1px dotted #c8c7cc;

        .left {
          width: 75%;
        }

        .right {
          width: 25%;
          text-align: right;
        }

        .fee {
          color: #007aff;
        }

        .cash {
          color: orangered;

          vertical-align: middle;

          .tiny {
            color: #000;
            font-size: 12px;
          }
        }

        &.merchant {
          border-bottom: none;
          background: #f7f7f8;

          .left {
            height: 4rem;
            img {
              width: 20%;
              height: auto;
              display: inline-block;
              vertical-align: middle;
            }

            span {
              display: inline-block;
              vertical-align: middle;
              font-size: 0.6rem;
              width: 70%;
            }
          }

          .right {
            height: 4rem;
            padding: 0.5rem 0;
            p {
              height: 1.5rem;
              vertical-align: middle;
            }

            .price {
              color: #eb0c0c;
            }
          }
        }
      }

      .points {
        .left {
          width: 25%;
          vertical-align: middle;
        }

        .right {
          width: 70%;
          text-align: right;
        }

        .switch {
          width: 50%;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }


</style>
