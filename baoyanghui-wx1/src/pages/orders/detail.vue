<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div v-if="detail!={}" class="item">
      <div class="block">
        <p class="title">
          配送信息
        </p>
        <div class="content-block address">
          <ul class="both">
            <li>{{detail.consigneeName}}</li>
            <li>{{detail.consigneeMobile}}</li>
          </ul>
          <p>{{detail.consigneeAddress}}</p>
        </div>
      </div>
      <div class="block">
        <p class="title">
          订单信息
        </p>
        <div class="content-block">
          <p class="both">
            <span class="label-name">订单号：</span>
            <span class="label-value">{{detail.orderNo}}</span>
          </p>
          <p class="both">
            <span class="label-name">订单状态：</span>
            <span class="label-value">{{detail.statusName}}</span>
          </p>
          <p class="both">
            <span class="label-name">下单时间：</span>
            <span class="label-value">{{detail.createdAt}}</span>
          </p>
          <p class="both">
            <span class="label-name">商品总价：</span>
            <span class="label-value">{{detail.orderPrice}}元</span>
          </p>
          <p class="both">
            <span class="label-name">运费：</span>
            <span class="label-value">{{detail.expressFee}}元</span>
          </p>
          <p class="both">
            <span class="label-name">积分抵扣：</span>
            <span class="label-value">{{detail.pointDeduction}}元</span>
          </p>
          <p class="both">
            <span class="label-name">余额抵扣：</span>
            <span class="label-value">{{detail.useStore}}元</span>
          </p>
          <p class="both total">
            <span class="label-name">实付款：</span>
            <span class="label-value">{{detail.payPrice}}元</span>
          </p>
        </div>
      </div>
      <div class="block">
        <p class="title">
          京东商城
        </p>
        <div class="content-block">
          <div v-for="(item,index) in detail.orderItems" :key="index">
            <p class="both black">
              <span class="label-name">{{item.itemCategory}}</span>
              <span class="label-value">数量：{{item.buyCount}}</span>
            </p>
            <p class="content">
              <img :src="item.photo" class="photo" />
              <span class="text">{{item.itemContent}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="block"  v-if="detail.orderInvoice">
        <p class="title">
          发票信息
        </p>
        <div class="content-block">
          <p class="both">
            <span class="label-name">公司名称：</span>
            <span class="label-value">{{detail.orderInvoice.corporationName}}</span>
          </p>
          <p class="both">
            <span class="label-name">纳税人识别号：</span>
            <span class="label-value">{{detail.orderInvoice.identityNo}}</span>
          </p>
        </div>
      </div>
      <btn-area :type="detail.supplierId" @cancel="cancel" @confirm="confirm" @again="again" :status="detail.status" :id="detail.id"></btn-area>
    </div>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast } from 'vux'
  import btnArea from '@/components/orders/btnArea'
  import {orderApiDetail,cancelOrder,buyAain,completeOrder} from '@/service/getData'

  export default {
    components: {
      XHeader,
      Toast,
      btnArea
    },
    data () {
      return {
        title: "订单信息",
        detail: {},
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
      async confirm(id){
        let res = await completeOrder(id);
        if(res.code === 0){
          this.$vux.toast.show({
            text:  "操作成功",
            type: "success"
          });
          this.initData()
        }else if(res.code===90002){
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
        }
      },
      async again(id){
        let res = await buyAain(id);
        if(res.code === 0){
          this.$router.push({
            name: "cart"
          })
        }else if(res.code===90002){
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
        }
      },
      async cancel(id){
        let res = await cancelOrder(id);
        if(res.code === 0){
          this.$vux.toast.show({
            text: '取消成功',
            type: "success"
          });
          this.initData()
        }else if(res.code===90002){
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.$vux.toast.show({
            text:  res.message,
            type: "warn"
          });
        }
      },
      async initData(){
        let id = this.$route.params.id;
        let res = await orderApiDetail(id);
        if(res.code === 0){
          this.detail = res.resultData;
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

<style lang="scss" scoped="">
  @import "~@/styles/layout.scss";
  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom: 20px;

    .item {
      width:100%;
      background: #EFEFF4;
      padding-bottom: 30px;

      p {
        line-height: 30px;
        font-size: 14px;
      }

      .address {
        color: #8e8e93;
      }

      .block {
        background: #ffffff;
        margin-bottom: 10px;

        .title {
          color: #000;
          font-size: 14px;
          font-weight: bold;
          border-bottom: 1px dotted #c8c7cc;
          padding: 5px 10px;
        }

        .both {
          width:100%;
          list-style: none;
          display: inline-flex;
          flex-direction: row;
          justify-content: space-between;
          flex-flow: wrap;
        }

        .content-block {
          position: relative;
          padding: 10px 20px;

          .label-name {
            color: #8e8e93;
            width:40%;
            display: inline-block;
          }

          .label-value {
            display: inline-block;
            color: #8e8e93;
            padding-left: 20px;
          }

          .total {
            border-top: 1px dotted #8e8e93;
            .label-name {
              color: #000;
            }

            .label-value {
              color: #eb0c0c;
              font-size: 16px;
            }
          }

          .black {
            .label-name {
              color: #000;
            }

            .label-value {
              color: #000;
            }

          }

          .content {
            color: #8e8e93;
            .photo {
              width: 20%;
              display: inline-block;
              vertical-align: middle;
            }
            .text {
              width: 70%;
              display: inline-block;
              vertical-align: middle;
            }
          }

          .amount {
            position: absolute;
            right:0;
            top:0;
            line-height: 30px;
          }
        }
      }

      .btn-area {
        padding: 0 30px;
      }
    }
  }
</style>
