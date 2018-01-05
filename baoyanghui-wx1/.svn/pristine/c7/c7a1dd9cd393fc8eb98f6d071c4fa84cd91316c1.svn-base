<template>
  <li class="item">
    <div class="status">
      {{statusName}}
    </div>
    <p class="line">
      <span class="label-name">下单时间：</span>
      <span class="label-value">{{createdAt}}</span>
    </p>
    <router-link :to="{ name: 'orderDetail', params: { id: id }}">
      <div class="info">
        <p class="line">
          <span class="label-name">收件人：</span>
          <span class="label-value">{{consigneeName}}</span>
        </p>
        <p class="line">
          <span class="label-name">收件地址：</span>
          <span class="label-value">{{address}}</span>
        </p>
        <p class="line">
          <span class="label-name">购买商品：</span>
          <span class="label-value">{{merchantName}}</span>
        </p>
        <p class="line">
          <span class="label-name">实付款：</span>
          <span class="label-value">{{payPrice}}元</span>
        </p>
        <x-icon class="icon" type="ios-arrow-right" size="30"></x-icon>
      </div>
    </router-link>
    <p class="line btn">
      <btn-area class="btn-areas" :type="supplierId" @cancel="cancel" @confirm="confirm" @again="again" :status="status" :id="id" :tiny="true"></btn-area>
    </p>
  </li>
</template>

<script>
  import btnArea from '@/components/orders/btnArea'
  import {cancelOrder,buyAain,completeOrder} from '@/service/getData'
  export default {
    name: 'item',
    components: {
      btnArea
    },
    props: ['createdAt','consigneeName','consigneeAddress','partGoodsNames','payPrice','statusName','id','status','supplierId'],
    methods: {
    	async confirm(id){
        let res = await completeOrder(id);
        if(res.code === 0){
          this.$vux.toast.show({
            text:  "操作成功",
            type: "success"
          });
          this.$emit("fresh")
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
          this.$emit("fresh")
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
      }
    },
    computed: {
    	merchantName: {
        get: function () {
          return this.partGoodsNames.join(" ")
        },
        // setter
        set: function (newValue) {
          this.partGoodsNames = newValue;
        }
      },
      address: {
        get: function () {
          return this.consigneeAddress.substr(0,12)+"..."
        },
        // setter
        set: function (newValue) {
          this.consigneeAddress = newValue;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .item {
    background: #ffffff;
    position: relative;
    font-size: 13px;
    line-height: 20px;
    margin: 10px 0;

    .status {
      position: absolute;
      right: 20px;
      line-height: 30px;
      color: #eb0c0c;
    }

    .info {
      border-color: #c8c7cc;
      border-style: solid;
      border-width: 1px 0 1px 0;
    }

    .line {
      font-size: 13px;
      line-height: 30px;
      min-height:30px;
      padding: 0 20px;

      .label-name {
        color: #8e8e93;
        font-size: 14px;
        width:27%;
        display: inline-block;
      }

      .label-value {
        display: inline-block;
        color: #000;
        padding-left: 20px;
      }

      .btn-areas {
        float: right;
        width: 60%;
      }
    }

    .btn {
      height:40px;
      line-height: 40px;
    }

    .icon {
      position: absolute;
      right:20px;
      top:40%;
      fill: #ccc;
    }

  }
</style>
