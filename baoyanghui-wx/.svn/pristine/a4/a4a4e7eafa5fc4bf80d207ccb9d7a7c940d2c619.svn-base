<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close"></x-header>
    <div v-if="orderId!==''" class="block">
      <div class="order">
        <div class="item">
          <div class="name">
            <img :src="sku.photo" class="photo" />
            <span class="text">{{sku.name}}</span>
          </div>
          <div class="info">
            <p>￥{{sku.price}}</p>
            <p>×{{sku.num}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <p class="title">服务类型</p>
      <div class="content">
        <checker v-model="form.customer_expect" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <checker-item v-for="item in customer" :key="item.code" :value="item.code">{{item.name}}</checker-item>
        </checker>
      </div>
    </div>
    <div class="block">
      <p class="title">问题描述</p>
      <div>
        <x-textarea placeholder="请在此描述您的问题" max="1000" v-model="form.question_desc"></x-textarea>
      </div>
    </div>
    <div class="block">
      <group class="number">
        <x-number title="申请数量" v-model="form.apply_detail.skuNum" :min="0" :max="availableNumber" :fillable="true"></x-number>
      </group>
    </div>
    <div class="block">
      <p class="title">包装情况</p>
      <div class="content">
        <checker v-model="form.package_desc" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <checker-item v-for="item in package" :key="item.code" :value="item.code">{{item.name}}</checker-item>
        </checker>
      </div>
    </div>
    <div class="block">
      <div class="title">
        配送信息
      </div>
      <div v-if="address" @click="addressShow=true" class="address">
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
    <div class="block">
      <div class="content">
        <p class="tips">提交售后服务信息后，售后专员可能与您电话沟通，请保持手机畅通</p>
        <x-button class="btn" type="primary" @click.native="submitBack()">提交</x-button>
      </div>
    </div>
    <popup v-model="addressShow" position="right" width="100%">
      <address-list v-on:close="closeAddress" v-on:change="changeAddress"></address-list>
    </popup>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Checker, CheckerItem,Toast,TransferDom,Popup,XTextarea,Group,XNumber,XButton } from 'vux'
  import {getJdBackTypes,getConsignees,createAfsApply} from '@/service/getData'
  import addressList from '@/pages/address/list'
  export default {
    name: 'backDetail',
    components:{
      XHeader,
      Checker,
      CheckerItem,
      addressList,
      Toast,
      TransferDom,
      Popup,
      XTextarea,
      Group,
      XNumber,
      XButton
    },
    props: ['orderId','sku'],
    data () {
      return {
        title: "申请售后服务",
        availableNumber: 0,
        address: {},
        addressShow: false,
        leftOptions: {
          preventGoBack: true
        },
        customer: [],
        package:[
          {
          	name: "无包装",
            code: 0
          },
          {
            name: "包装完整",
            code: 10
          },
          {
            name: "包装破损",
            code: 20
          },
        ],
        form: {
          customer_expect:"",
          package_desc:"",
          question_desc:"",
          consignee_id:"",
          apply_detail: {
            skuId: "",
            skuNum: 0
          }
        },
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
        this.form.consignee_id = obj.consigneeId;
        this.addressShow = false;
      },
      close(){
        this.$emit("close");
      },
      async getAddress(){
        let res = await getConsignees();
        if(res.code === 0){
          if(res.resultData.items.length>0){
            this.address = res.resultData.items.filter(function(item){
              return item.isDefault===1;
            })[0];
            this.form.consignee_id = (this.address) ? this.address.consigneeId : "";
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
      async initTypeList(){
        let res = await getJdBackTypes({jd_order_id: this.orderId,sku_id:this.sku.skuId});
        this.form.apply_detail.skuId = this.sku.skuId;
        if(res.code === 0){
        	this.availableNumber = parseInt(res.resultData.availableNumber);
          this.customer = res.resultData.items;
        }else if(res.code===90002){
          this.$vux.toast.show({
            text: res.message,
            type: "warn"
          });
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.$vux.toast.show({
            text: res.message,
            type: "warn"
          });
        }
      },
      async submitBack(){
        let id = this.$route.params.id;

        if(this.form.customer_expect===""){
          this.error.code = true;
          this.error.message = "请选择服务类型";

          return false;
        }

        if(this.form.package_desc===""){
          this.error.code = true;
          this.error.message = "请选择包装情况";

          return false;
        }

        if(this.form.question_desc===""){
          this.error.code = true;
          this.error.message = "请填写问题描述";

          return false;
        }

        if(this.form.consignee_id===""){
          this.error.code = true;
          this.error.message = "请选择收件地址";

          return false;
        }

        if(this.form.apply_detail.skuId===""){
          this.error.code = true;
          this.error.message = "商品有误，请返回重新选择商品";

          return false;
        }

        if(this.form.apply_detail.skuNum===0){
          this.error.code = true;
          this.error.message = "申请售后的商品数量至少为1";

          return false;
        }


        let res = await createAfsApply(id,{...this.form,apply_detail:JSON.stringify(this.form.apply_detail),jd_order_id:this.orderId});
        if(res.code === 0){
          let that = this;
          this.$vux.toast.show({
            text: '提交成功',
            type: "success"
          });
          setTimeout(function(){
            that.$emit('close');
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
    watch:{
      orderId(){
        this.initTypeList();
      }
    },
    mounted(){
      this.getAddress();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .btn {
    background: #007aff;
  }

  .checker-item {
    border: 1px solid #ccc;
    font-size: 12px;
    margin-right: 20px;
    padding: 2px 15px;
  }
  .checker-item-selected {
    border: 1px solid #007aff;
    color: #007aff;
  }

  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom: 20px;

    .block {
      width: 100%;
      padding: 0;
      background: #ffffff;
      margin: 0 0 20px 0;
      .title {
        color: #000;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px dotted #c8c7cc;
        padding: 5px 20px;
      }

      .address {
        position: relative;
        padding: 5px 30px;
        p {
          line-height: 1.5rem;
          font-size: 0.7rem;
          width:100%;

          display: inline-flex;
          flex-direction: row;
          justify-content: space-between;
          flex-flow: wrap;
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

      .content {
        width:100%;
        padding: 20px;
      }

      .order {
        width:inherit;
        background: #ffffff;
        margin-bottom: 20px;
      }

      .item {
        line-height: 1rem;
        font-size: 0.6rem;
        background: #EFEFF4;
        color: #8d8d8d;
        padding: 10px 20px;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        flex-flow: wrap;

        .name {
          display: inline-block;
          width:80%;
          overflow-y: hidden;

          .photo {
            width: 20%;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
          }
          .text {
            width: 70%;
            display: inline-block;
            vertical-align: middle;
          }
        }

        .info {
          display: inline-block;
          width:20%;
          text-align: right;

          p {
            line-height: 1.5rem;
            font-size: 0.6rem;
          }
        }
      }

      .tips {
        font-size: 0.5rem;
        line-height: 1rem;
        margin-bottom: 10px;
      }

      .btn-area {
        padding: 10px 20px;
        text-align: right;
        .btn {
          background: #fff;
          border: 1px solid #ccc;
          text-align: center;
          color: #000;
          font-size: 14px;
          line-height: 30px;
          height:30px;
          border-radius: 10px;
          padding: 5px 10px;
          width: 40%;
        }
      }
    }
  }
</style>
