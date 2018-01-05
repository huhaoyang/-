<template>
  <div class="item">
    <router-link :to="{name:'merchantDetail',params: {id: priceId}}">
    <img class="head-pic" :src="photoUrl">
    <div class="info">
      <p class="name">{{model}}</p>
      <p class="price">
        <span class="price">￥{{price}}</span>
      </p>
    </div>
    </router-link>
    <p class="logo">
      供应商：{{supplierName}}
    </p>
    <p class="tags-info">
      <span :style="{background:item.background}" class="tags" v-for="(item,index) in tags" :key="index">
        {{item.name}}
      </span>
    </p>
    <x-number :class="{cart:true,zero:(amount===0)}" v-model="countInCart" button-style="round" :min="0" @on-change="addCart"></x-number>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>
<script>
  import {XNumber,Toast} from 'vux'
  import {imgServer} from '@/config/env'
  import { changeMerchant } from '@/service/getData'
  export default {
    name: 'marketItem',
    components:{
      XNumber,
      Toast
    },
    props: ['priceId','tags','displayModel','supplierName','merchantId','keyParament','price','photo','keyParameterJson','rate','countInCart'],
    data(){
    	return {
        amount:0,
        oldAmount:0,
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    mounted(){

    },
    methods: {
      async addCart(newVal){
        let res = await changeMerchant(this.priceId,newVal);
        if(res.code === 0){
          this.countInCart = this.amount = this.oldAmount = res.resultData.cartItemCount
          this.$emit('change');
        }else if(res.code===90002){
          this.error.code = true;
          this.error.message = res.message;
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else if(res.code===90009) {
          this.countInCart = this.amount = 0;
          this.error.code = true;
          this.error.message = "如欲从购物车删除该商品，请前往购物车删除";
        }else{
          this.countInCart = this.amount = this.oldAmount;
          this.error.code = true;
          this.error.message = res.message;
        }
      },
    },
    computed: {
    	photoUrl() {
    		return this.photo;
      },
      keys(){
    		return this.keyParameterJson;
      },
      model(){
      	return this.displayModel;//(this.displayModel.length<=35) ? this.displayModel : this.displayModel.slice(0,35)+"...";
      },
      sPrice(){
        return (this.price*(1-this.rate)).toFixed(2);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .item {
    position: relative;
    width:100%;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #c8c7cc;
    background: #fff;

    .icon {
      position: absolute;
    }

    .right-icon {
      right: 2%;
      bottom: 30%;
      fill: #d0d0d0;
    }

    .del-icon {
      right: 10%;
      bottom: 30%
    }


    .head-pic {
      height: auto;
      width: 25%;
      display: inline-block;
      vertical-align: middle;
    }

    .info {
      display: inline-block;
      width: 70%;
      padding: 0 0.5rem;
      color: #000000;
      line-height: 1.5rem;
      vertical-align: top;

      .name {
        font-size: 0.85rem;
      }

      .supplier {
        font-size: 1rem;
      }

      .price {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #f64747;

        .price {
          display: inline-block;
          min-width: 4rem;
          vertical-align: middle;
        }

        .red-tag {
          display: inline-block;
          vertical-align: middle;
          padding: 0 5px;
          background: #fb6262;
          font-size: 0.6rem;
          height: 1.5rem;
          line-height: 1.5rem;
          color: #ffffff;
        }

        .s-price {
          margin-left: 5px;
          font-size: 0.8rem;
          height: 1.5rem;
          line-height: 1.5rem;
          vertical-align: middle;
        }
      }
    }

    .logo {
      font-size: 0.75rem;
      line-height: 1.2rem;
      color: #cccccc;
      img {
        height:1.2rem;
        vertical-align: middle;
      }
    }

    .tags-info {
      font-size: 0.75rem;

      .tags {
        display: inline-block;
        margin-right: 0.5rem;
        line-height: 1rem;
        padding: 0 5px ;
        color: #fff;
      }
    }
    .type {
      position: absolute;
      right: 0;
      bottom: 3rem;
      line-height: 20px;
      width: 2.5rem;
      height:20px;
      background: #d3e5f9;
      color: #007aff;
      text-align: center;
    }
    .cart {
      height:2.5rem;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
</style>

<style lang="scss">
  .item .weui-cell:before {
    border-top:0;
  }

  .item .weui-cell {
    padding-right:0;
  }

  .item .zero .vux-number-selector-sub {
    display: none;
  }

  .item .zero .vux-number-input {
    display: none;
  }
</style>
