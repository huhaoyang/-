<template>
  <div class="area">
    <ul v-if="type===0" class="btn-area" :class="{tiny:tiny}">
      <li v-for="item in items[status]" :key="item.id" @click="item.click()" :class="{active:item.active}">{{item.name}}</li>
    </ul>
    <ul class="btn-area" :class="{tiny:tiny}" v-else>
      <li v-for="item in secItems[status]" :key="item.id" @click="item.click()" :class="{active:item.active}">{{item.name}}</li>
    </ul>
    <div v-transfer-dom>
      <alert v-model="cancel" title="我不想要商品了怎么办" >
        <div slot="default" class="text">
          <p>如果您已付款，但又后悔不想要商品的话，请直接拒收商品。</p>
          <p>拒收商品后，支付的款项会在5个工作日内返回您购买的账户余额。</p>
          <p>如您有疑问请电话咨询宝养汇客服：</p>
          <p>400-6060-827</p>
        </div>
      </alert>
    </div>
  </div>
</template>

<script>
  import {Alert,TransferDomDirective as TransferDom} from "vux"
  export default {
    name: 'btnArea',
    directives: {
      TransferDom
    },
    components: {
      Alert
    },
    props: ['status','id','tiny','type'],
    data(){
    	let _this = this;
    	return {
        cancel:false,
        secItems: {
          paying: [
            {
            	id:1,
              name:"取消订单",
              active: false,
              click:function(){
                _this.$vux.confirm.show({
                  content: "请确认取消订单",
                  onCancel () {

                  },
                  onConfirm () {
                    _this.$emit("cancel",_this.id)
                  }
                })
              }
            },
            {
              id:2,
              name: "去付款",
              active: true,
              click:function(){
                _this.$router.push({
                  name: "pay",
                  params: { id: _this.id }
                })
              }
            }
          ],
          payed: [

          ],
          completed: [
            {
              id:2,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
          confirmed: [
            {
              id:1,
              name:"确认收货",
              active: false,
              click:function(){
                _this.$emit("confirm",_this.id)
              }
            },
          	{
              id:2,
              name:"物流信息",
              active: false,
              click:function(){
                _this.$router.push({
                  name: "track",
                  params: { id: _this.id },
                  query: {type: 1}
                })
              }
            }
          ],
          canceled: [
            {
              id:1,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
          refunded: [
            {
              id:1,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
        },
    		items: {
          paying: [
            {
              id:1,
              name:"取消订单",
              active: false,
              click:function(){
                _this.$vux.confirm.show({
                  content: "请确认取消订单",
                  onCancel () {

                  },
                  onConfirm () {
                    _this.$emit("cancel",_this.id)
                  }
                })
              }
            },
            {
              id:2,
            	name: "去付款",
              active: true,
              click:function(){
                _this.$router.push({
                  name: "pay",
                  params: { id: _this.id }
                })
              }
            }
          ],
          payed: [
            {
              id:1,
              name:"取消订单",
              active: false,
              click:function(){
              	_this.cancel=true;
              }
            },
            {
              id:2,
              name:"物流信息",
              active: false,
              click:function(){
                _this.$router.push({
                  name: "track",
                  params: { id: _this.id }
                })
              }
            }
          ],
          completed: [
            {
              id:1,
              name:"申请售后",
              active: false,
              click:function(){
                _this.$router.push({
                  name: "backList",
                  params: { id: _this.id }
                })
              }
            },
            {
              id:2,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
          canceled: [
            {
              id:1,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
          refunded: [
            {
              id:1,
              name:"再次购买",
              active: false,
              click:function(){
                _this.$emit("again",_this.id)
              }
            }
          ],
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .area {
    height:100%;
  }

  .btn-area {
    width:100%;
    margin: 5px 0;
    list-style: none;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    flex-flow: wrap;
    li {

      background: #fff;
      border: 1px solid #ccc;
      text-align: center;
      color: #000;
      font-size: 14px;
      line-height: 30px;
      height:30px;
      border-radius: 10px;
      width: 40%;

      &.active{
        color: #eb0c0c;
        border: 1px solid #eb0c0c;
      }
    }
  }

  .text {
    text-align: left;
    p {
      margin: 10px 0;
    }

  }

  .tiny {
    justify-content: flex-end;

    li {
      margin-left: 5%;
    }
  }
</style>
