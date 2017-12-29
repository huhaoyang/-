<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div v-if="order.id" class="block">
      <div class="title">
        订单详情
      </div>
      <div class="line">
        <div class="left">
          总价
        </div>
        <div class="right cash">
          ￥{{order.orderPrice}}
        </div>
      </div>
      <div v-if="order.pointDeduction!=0" class="line">
        <div class="left">
          积分抵扣
        </div>
        <div class="right cash">
          -￥{{order.pointDeduction}}
        </div>
      </div>
      <div class="line">
        <div class="left">
          账户余额抵扣
        </div>
        <div class="right cash">
          -￥{{order.useStore}}
        </div>
      </div>
      <div class="line">
        <div class="left">
          还需支付金额
        </div>
        <div class="right cash">
          ￥{{pay}}
        </div>
      </div>
    </div>
    <div v-if="order.id" class="block">
      <group title="选择支付方式">
        <radio v-model="payMethod" :options="options"></radio>
      </group>
    </div>
    <group>
      <x-button :disabled="disabled" class="btn" type="primary" @click.native="payOrder()">确认支付</x-button>
    </group>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,TransferDom,Popup,Group,XInput,XButton,Radio } from 'vux'
  import {orderApiDetail,payByBalance,wxPay,alipay,sdkSign} from '@/service/getData'
  import {is_weixin,getStore} from '@/config/mUtils'
  import wx from 'weixin-js-sdk'
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
      Radio
    },
    data () {
      return {
        title: "收银台",
        order: {},
        payMethod:"",
        disabled: true,
        options: [
          {
            icon: require("@/images/weixin.png"),
            key: 'weixin',
            value: '微信支付'
          },
          {
            icon: require("@/images/alipay.png"),
            key: 'alipay',
            value: '支付宝'
          }
        ],
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods:{
      async jssdk(){
        let url = location.href.split('#')[0];
        let res = await sdkSign({
          url:url,
        });
        if(res.code === 0){
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.resultData.appId, // 必填，公众号的唯一标识
            timestamp: res.resultData.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.resultData.noncestr, // 必填，生成签名的随机串
            signature: res.resultData.sign,// 必填，签名，见附录1
            jsApiList: ['chooseWXPay']	// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          this.disabled = false;
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }

      },
      async initData(){
        let id = this.$route.params.id;
        let res = await orderApiDetail(id);
        if(res.code === 0){
          this.order = res.resultData;
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
      async payOrder(){
      	if(this.pay>0){
          if(this.payMethod==="weixin"){
          	if(is_weixin()){
              let res = await wxPay({order_id:this.order.id,openid:getStore("openid"),trade_type:"JSAPI"});
              let that = this;
              if(res.code === 0){
                wx.chooseWXPay({
                  appid:res.resultData.appid,
                  timestamp: res.resultData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: res.resultData.nonceStr, // 支付签名随机串，不长于 32 位
                  package: res.resultData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType: res.resultData.signType,
                  paySign: res.resultData.sign, // 支付签名
                  success: function (res) {
                    that.$vux.toast.show({
                      text: '支付成功',
                      type: "success"
                    });
                    setTimeout(function(){
                      that.$router.push({
                        name: "orderList"
                      })
                    },1000);
                  },
                  fail:function (res) {
                    that.$vux.toast.show({
                      text: '系统忙，请稍候再试',
                      type: "warn"
                    });
                  },
                  cancel:function(res){
                    that.$vux.toast.show({
                      text: '取消支付',
                      type: "warn"
                    });
                  }
                });
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
              let res = await wxPay({order_id:this.order.id,trade_type:"MWEB"});
              if(res.code === 0){
              	let url = encodeURIComponent(`http://baoyanghui.com/bao-wx/#/pay/${this.order.id}?status=completed`);
                location.href=res.resultData.mwebUrl+`&redirect_url=${url}`;
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
          }else if(this.payMethod==="alipay"){
            let res = await alipay({order_id:this.order.id,return_url:`http://baoyanghui.com/bao-wx/#/pay/${this.order.id}?status=success`});
            if(res.code === 0){
              location.href = res.resultData.request_url;
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
            this.$vux.toast.show({
              text: '请选择支付方式',
              type: "warn"
            });
          }
        }else{
          let id = this.$route.params.id;
          if(id===""){
            this.error.code = true;
            this.error.message = "订单无效";

            return false;
          }

          let res = await payByBalance(id);
          if(res.code === 0){
            let that = this;
            this.$vux.toast.show({
              text: '支付成功',
              type: "success"
            });
            setTimeout(function(){
              that.$router.push({
                name: "orderList"
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
      }
    },
    mounted(){
      let status = this.$route.query.status;
      if(status=="success"){
        let that = this;
        this.$vux.toast.show({
          text: '支付成功',
          type: "success"
        });
        setTimeout(function(){
          that.$router.push({
            name: "orderList"
          })
        },1000);
      }else if(status=="completed"){
        let that = this;
        this.$vux.confirm.show({
          title: "请确认微信支付是否已完成",
          cancelText:"未完成支付",
          confirmText:"已完成支付",
          onCancel () {

          },
          onConfirm () {
            that.$router.push({
              name: "orderList"
            })
          }
        })
      }
      if(is_weixin()){
        this.jssdk();
      }else{
        this.disabled = false;
      }
      this.initData();
    },
    computed: {
      pay(){
        return (this.order.orderPrice<=this.order.useStore) ? 0 : (this.order.orderPrice-this.order.useStore-this.order.pointDeduction).toFixed(2) ;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .block {
    background: #ffffff;
    padding: 20px 0;
    .title {
      color: #000;
      font-size: 14px;
      font-weight: bold;
      line-height: 30px;
      padding: 0 10px;
      border-bottom: 1px dotted #c8c7cc;
    }

    .line {
      width:100%;
      padding: 1rem 20px;
      line-height: 1.5rem;
      font-size: 1rem;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-between;
      flex-flow: wrap;
      border-bottom: 1px dotted #c8c7cc;

      .left {
        width: 70%;
      }

      .right {
        text-align: right;
      }

      .fee {
        color: #007aff;
      }

      .cash {
        color: orangered;
      }
    }

    .radio-icon {
      height:30px;
      width:auto;
      vertical-align: middle;
    }
    .btn {
      background: #007aff;
    }
  }
</style>
