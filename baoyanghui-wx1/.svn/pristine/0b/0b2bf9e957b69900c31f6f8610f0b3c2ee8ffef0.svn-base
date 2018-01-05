<template>
  <div class="container">
    <x-header class="header" :title="title" :right-options="rightOptions">
      <span @click="del" slot="right">删除</span>
    </x-header>
    <div class="merchant" v-for="(item,index) in cart.merchantShopList" :key="index">
      <p class="title">
        <input type="checkbox" v-model="merchant" :value="item.merchantId">
        <img v-if="item.merchantId===0" src="~@/images/JD-icon.png"/>
        {{item.placeName}}
      </p>
      <ul class="carts">
        <li v-for="(cart,i) in item.shopItems" :key="i">
          <input class="checkbox" type="checkbox" v-model="cartId" :value="cart.cartItemId" :disabled="cart.stockState">
          <router-link :to="{name:'merchantDetail',params: {id: cart.goodsPriceId}}">
            <img class="photo" :src="photoUrl(cart.photo)">
            <div class="info">
              <p class="name" :class="{gallery:cart.stockState}">{{cart.displayModel}}</p>
              <p class="price" :class="{gallery:cart.stockState}">￥{{cart.price}}</p>
              <p v-show="cart.stockState" class="stock_state">该商品暂无库存</p>
            </div>
            <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
          </router-link>
          <group>
            <x-number title="数量" class="number" :value="cart.count" @on-change="change(cart.cartItemId)" :ref="cart.cartItemId" :min="cart.quantityMin" :fillable="true" :class="{gallery:cart.stockState}"></x-number>
          </group>
        </li>
      </ul>
    </div>
    <div class="bottom-tab">
      <div class="info">
        <span>不含运费</span>
        <span class="price">合计：￥{{totalPrice}}</span>
      </div>
      <span class="btn" @click="addCart">
        结算（{{cartId.length}}）
      </span>
    </div>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import {imgServer} from '@/config/env'
  import { XHeader,Toast,Group,XNumber } from 'vux'
  import {getMerchant,delMerchant,updateMerchant} from '@/service/getData'
  export default {
    name: 'cart',
    components: {
      XHeader,
      Toast,
      Group,
      XNumber
    },
    data () {
      return {
        name: "购物车",
        totalPrice: 0,
        cartId: [],
        merchant:[],
        group:[],
        itemCount: 0,
        loading: false,
        rightOptions: {
          showMore: false
        },
        notuse:true,
        cart: [],
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods: {
      addCart(){
        if(this.cartId.length===0){
          this.error.code = true;
          this.error.message = "请选择至少一个商品";
          return false;
        }
        this.$router.push({
          name:'orderCreate',
          params:{id:this.cartId.join(',')}
        });
      },
    	async change(id){
        if(this.$refs[id]){
          let res = await updateMerchant(id,this.$refs[id][0].$data.currentValue);
          this.countPrice();
        }
      },
    	async del(){
    		if(this.cartId.length===0){
          this.error.code = true;
          this.error.message = "请选择至少一个商品";

          return false;
        }

        let res = await delMerchant(this.cartId.join(','));
        if(res.code === 0){
          this.getCart();
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
    	async getCart(){
    		let res = await getMerchant();
        if(res.code === 0){
          this.cart = res.resultData;
          this.cart.merchantShopList.forEach(merchant=>{
          	let cartId = [];
            merchant.shopItems.forEach((item,i)=>{
//              if(i>0){item.stockState = true}
              if(!item.stockState){
                cartId.push(item.cartItemId);
              }
            })
            this.group[merchant.merchantId] = cartId;
          })
          this.totalPrice = 0;
          this.cartId = [];
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
      photoUrl(val) {
        return val
      },
      async countPrice(){
        if(this.cartId.length!==0){
          let res = await getMerchant({item_ids:this.cartId.join(',')});
          if(res.code === 0){
            this.totalPrice = res.resultData.allMerchantTotalPartPrice;
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
        }else{
          this.totalPrice = 0;
        }
      }
    },
    mounted(){
    	this.getCart();
    },
    computed:{
    	title(){
    		return `${this.name}(${this.cartId.length})`;
      },
    },
    watch: {
      cartId:function(){
      	this.countPrice();

      	let findIndex=-1;

        this.group.some((item,index)=>{
            if(item.toString()===this.cartId.toString()){
              findIndex = index
            	return false;
            }
        });
      	if(findIndex!==-1){
          this.merchant[0] = findIndex;
        }

      },
      merchant:function(){
        if(this.merchant.length>1){
          this.merchant.shift();
        }else if(this.merchant.length===0){
          this.cartId = [];
        }else{
      		this.cartId = this.group[this.merchant[0]];
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a {
    color: #000;
  }

  .container {
    width:100%;
    min-height: 100vh;
    padding-bottom: 8vh;

    .merchant {
      box-sizing: border-box;
      width: 100%;
      margin: 0 0 5% 0;
      background: #ffffff;
      padding: 20px 0;

      .title {
        padding: 0 20px;
        color: #000;
        font-size: 16px;
        border-bottom: 1px dotted #c8c7cc;

        img {
          height: 16px;
          vertical-align: middle;
        }
      }

      .carts {
        padding: 0 20px;
        list-style: none;

        li {
          border-bottom: 1px dotted #c8c7cc;
          position: relative;

          .checkbox,.photo,.info {
            vertical-align: middle;
          }

          .photo {
            width: 30%;
            height:auto;
            display: inline-block;
          }

          .info {
            display: inline-block;
            width:60%;
            position: relative;

            .name {
              font-size: 0.8rem;
              line-height: 1.4rem;
            }
            .price {
              font-size: 1.2rem;
              color: #9d9d9d;
            }
            .stock_state{
              position: absolute;
              font-size: 0.8rem;
              bottom:0.2rem;
              right: 1rem;
            }

          }
          .gallery {
              color: #9d9d9d;

              .vux-number-input {
                color: red;
                background-color: #f3f3f3;
              }


          }

          .icon {
            position: absolute;
            right:0;
            top:40%;
            fill: #ccc;
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
      justify-content: flex-end;
      flex-flow: wrap;

      .info {
        display: inline-block;
        margin: 0 10px;
        font-size: 0.7rem;
        line-height: 8vh;
        color: #c8c7cc;

        .price {
          font-size: 1rem;
          color: #eb0c0c;
        }
      }

      .btn {
        background: #eb0c0c;
        color: #ffffff;
        padding: 0 1rem;
        font-size: 1rem;
        line-height: 8vh;
      }
    }
  }

</style>
