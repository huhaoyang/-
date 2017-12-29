<template>
  <div class="container">
    <x-header class="header" :title="title" :right-options="rightOptions" :left-options ="leftOptions" @on-click-back="goBack"></x-header>
    <scroller
      :no-data-text="noDataText"
      :on-refresh="refresh"
      :on-infinite="infinite" ref="scroller">
      <list v-on:fresh="initData" v-bind="orders"></list>
    </scroller>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast } from 'vux'
  import list from '@/components/orders/list'
  import {orderApi} from '@/service/getData'

  export default {
    components: {
      XHeader,
      list,
      Toast,
    },
    data () {
      return {
        title: "订单管理",
        loading: false,
        rightOptions: {
          showMore: false
        },
        leftOptions: {
          preventGoBack: true
        },
        orders: {
          items:[]
        },
        params: {
        	page: 1,
          rows: 5
        },
        error: {
          code: false,
          message: ""
        }, //错误信息
        empty: false,
        noDataText: "暂无数据",
      }
    },
    mounted(){
      this.initData();
    },
    methods: {
      goBack(){
        this.$router.push({
          name: "home"
        })
      },
      refresh(){
        this.initData();
      },
      infinite(done){
        this.addData(done)
      },
      async initData(){
        this.params.page=1;

        let res = await orderApi({...this.params});
        if(res.code === 0){
          if(res.resultData.items.length===0){
          	this.noDataText = "请点击右上角的购买按钮去商城购物";
            this.$refs.scroller.finishInfinite(2);
            this.empty = true;
          }else{
            this.orders = res.resultData;
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
        this.params.page=this.params.page+1;

        let res = await orderApi({...this.params});
        if(res.code === 0){
        	if(res.resultData.items.length===0){
        		if(!this.empty){
              this.noDataText = "没有更多数据";
            }
            this.$refs.scroller.finishInfinite(2);
          }else{
            this.orders.items = res.resultData.items.reduce( function(coll,item){
              coll.push( item );
              return coll;
            }, this.orders.items );
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
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
    padding-bottom: 20px;
    ._v-container {
      top:4rem;
      position: fixed;
    }
  }

</style>
