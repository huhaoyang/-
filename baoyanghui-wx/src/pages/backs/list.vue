<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div v-if="backs.length>0" class="block">
      <div v-for="order in backs" class="order" :key="order.jdOrderId">
        <p class="title">订单号：{{order.jdOrderId}}</p>
        <div v-for="item in order.skus" class="items">
          <div class="item">
            <div class="name">
              <img :src="item.photo" class="photo" />
              <span class="text">{{item.name}}</span>
            </div>
            <div class="info">
              <p>￥{{item.price}}</p>
              <p>×{{item.num}}</p>
            </div>
          </div>
          <p class="btn-area">
            <span class="btn" @click="choose(order.jdOrderId,item)">申请售后</span>
          </p>
        </div>
      </div>
    </div>
    <popup v-model="detailShow" position="right" width="100%">
      <back-detail @close="closeDetail" v-bind="detail"></back-detail>
    </popup>
  </div>
</template>

<script>
  import { XHeader,TransferDom,Popup } from 'vux'
  import {getJdSubOrder} from '@/service/getData'
  import backDetail from '@/pages/backs/detail'
  export default {
    name: 'backLists',
    components:{
      XHeader,TransferDom,Popup,backDetail
    },
    data () {
      return {
      	title: "选择售后商品",
        detailShow: false,
        backs:[],
        detail:{
      		orderId:"",
          sku:{}
        }
      }
    },
    methods:{
      choose(id,item){
      	this.detail.orderId = id;
        this.detail.sku = item;
        this.detailShow = true;
      },
      closeDetail(){
        this.detailShow = false;
      },
    	async initData(){
        let id = this.$route.params.id;
        let res = await getJdSubOrder(id);
        if(res.code === 0){
          this.backs = res.resultData.items;
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
    },
    mounted(){
    	this.initData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom: 20px;

    .block {
      width: 100%;
      padding: 0;
      background: #EFEFF4;
      .title {
        padding-left: 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
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
