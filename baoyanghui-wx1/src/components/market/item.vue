<template>
  <router-link :to="{name:'merchantDetail',params: {id: priceId}}">
  <div class="item">
    <img class="head-pic" :src="photoUrl">
    <div class="info">
      <p class="name">{{model}}</p>
      <p class="logo">
        <img v-if="merchantId===0" src="~@/images/JD-icon.png"/>
        {{supplierName}}
      </p>
      <p class="tags-info">
        <span class="tags" v-for="(item,index) in keys" :key="index">{{item}}</span>
      </p>
      <p class="price">
        <span class="price">￥{{price}}</span>
        <span class="red-tag">会员价</span><span class="s-price">{{sPrice}}</span>
      </p>
      <span v-if="merchantId==0" class="type">B</span>
      <img class="cart" src="~@/images/buy.png" @click.prevent="addCart()">
    </div>
  </div>
  </router-link>
</template>
<script>
  import {imgServer} from '@/config/env'
  export default {
    name: 'marketItem',
    props: ['priceId','displayModel','supplierName','merchantId','keyParament','price','photo','keyParameterJson','rate'],
    methods: {
      addCart:function(){
        this.$emit('carts');
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
      	return (this.displayModel.length<=35) ? this.displayModel : this.displayModel.slice(0,35)+"...";
      },
      sPrice(){
        return (this.price*(1-this.rate)).toFixed(2);
      }
    }
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
      padding: 0.5rem;
      display: inline-block;
      vertical-align: middle;
    }

    .info {
      display: inline-block;
      width: 70%;
      padding: 0.5rem;
      color: #000000;
      line-height: 1.5rem;
      vertical-align: top;

      .name {
        font-size: 0.85rem;
      }

      .supplier {
        font-size: 1rem;
      }

      .logo {
        font-size: 0.75rem;
        line-height: 1.2rem;
        color: #8d8d8d;
        img {
          height:1.2rem;
          vertical-align: middle;
        }
      }

      .tags-info {
        font-size: 0.5rem;

        .tags {
          display: inline-block;
          margin-right: 0.5rem;
          line-height: 1rem;
          border: 1px solid #007aff;
          color: #007aff;
        }
      }

      .price {
        height: 3rem;
        line-height: 3rem;
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
      width:2.5rem;
      height:2.5rem;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
</style>
